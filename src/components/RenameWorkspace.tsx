import { graphql } from '@/gql';
import type { ModalProps } from '@mantine/core';
import { Modal, TextInput, Group, Button, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
  mutation Rename($data: UpdateWorkspace!) {
    updateWorkspace(data: $data) {
      success
    }
  }
`);

const RenameWorkspace = ({
  modalProps,
  oldName,
}: {
  modalProps: ModalProps;
  oldName: string;
}) => {
  const { classes } = useStyles();
  const [result, renameWorkspace] = useMutation(UpdateWorkspace);
  const [name, setName] = useState(oldName);
  const { query } = useRouter();
  console.log(result.error);

  return (
    <Modal
      {...modalProps}
      overlayOpacity={0.55}
      overlayBlur={3}
      title='Rename Workspace'
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
          renameWorkspace({
            data: {
              _id: query.id as string,
              name,
            },
          }).then((result) => {
            if (result.error) {
              return console.log('Opps! Error');
            }
            modalProps.onClose();
          });
        }}
      >
        <TextInput
          placeholder='Rename workspace'
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
            disabled={!Boolean(name)}
            loading={result.fetching}
          >
            Rename
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default RenameWorkspace;
