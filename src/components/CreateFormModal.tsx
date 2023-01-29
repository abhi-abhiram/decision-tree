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

const Form = graphql(`
  mutation CreateForm($workspaceId: String!, $name: String!) {
    createForm(workspaceId: $workspaceId, name: $name) {
      id
    }
  }
`);

const CreateForm = ({ modalProps }: { modalProps: ModalProps }) => {
  const { classes } = useStyles();
  const [result, createForm] = useMutation(Form);
  const [name, setName] = useState('');
  const { push, query } = useRouter();

  return (
    <Modal
      {...modalProps}
      overlayOpacity={0.55}
      overlayBlur={3}
      title='Create a new Form'
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

          createForm({
            workspaceId: query.id as string,
            name,
          }).then((result) => {
            if (result.error) {
              return console.log('Opps! Error');
            }
            modalProps.onClose();
            push(`/form/${result.data?.createForm.id}`);
          });
        }}
      >
        <TextInput
          placeholder='Name Form'
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

export default CreateForm;
