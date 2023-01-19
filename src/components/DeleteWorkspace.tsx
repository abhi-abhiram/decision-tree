import { graphql } from '@/gql';
import type { ModalProps } from '@mantine/core';
import {
  Modal,
  TextInput,
  Group,
  Button,
  createStyles,
  Text,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'urql';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {},

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

const UpdateWorkspace = graphql(`
  mutation Delete($data: String!) {
    deleteWorkspace(id: $data) {
      success
    }
  }
`);

const DeleteWorkspace = ({
  modalProps,
  id,
  workspaceName,
}: {
  modalProps: ModalProps;
  id: string;
  workspaceName: string;
}) => {
  const { classes } = useStyles();
  const [result, deleteWorkspace] = useMutation(UpdateWorkspace);
  const [name, setName] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    return () => {
      setName('');
    };
  }, [modalProps.opened]);

  return (
    <Modal
      {...modalProps}
      overlayOpacity={0.55}
      overlayBlur={3}
      title='Delete this workspace?'
      onClose={() => {
        if (!result.fetching) {
          modalProps.onClose();
        }
      }}
      centered
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteWorkspace({
            data: id,
          }).then((result) => {
            if (result.error) {
              return console.log('Opps! Error');
            }
            modalProps.onClose();
            push('/');
          });
        }}
      >
        <Text mt='md' mb='md'>
          Enter the name of the workspace to continue deletion
        </Text>

        <Text m='md' style={{ fontWeight: 600 }}>
          {workspaceName}
        </Text>

        <TextInput
          placeholder='Enter Name of workspace'
          withAsterisk
          autoComplete='off'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Group mt='lg' position='right' className={classes.controls}>
          <Button
            className={classes.control}
            color='gray'
            disabled={result.fetching}
            onClick={() => modalProps.onClose()}
          >
            Cancel
          </Button>
          <Button
            className={classes.control}
            type='submit'
            disabled={!Boolean(name === workspaceName)}
            loading={result.fetching}
            color='red'
          >
            Delete the workspace
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default DeleteWorkspace;
