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

const Workspace = graphql(`
  mutation CreateWorkspace($name: String!) {
    createWorkspace(name: $name) {
      id
    }
  }
`);

const CreateWorkspace = ({ modalProps }: { modalProps: ModalProps }) => {
  const { classes } = useStyles();
  const [result, createWorkspace] = useMutation(Workspace);
  const [name, setName] = useState('');
  const { push } = useRouter();

  return (
    <Modal
      {...modalProps}
      overlayOpacity={0.55}
      overlayBlur={3}
      title='Create a new Workspace'
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
          createWorkspace({
            name,
          }).then((result) => {
            if (result.error) {
              return console.log('Opps! Error');
            }
            modalProps.onClose();
            push(`/workspace/${result.data?.createWorkspace.id}`);
          });
        }}
      >
        <TextInput
          placeholder='Name workspace'
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
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreateWorkspace;
