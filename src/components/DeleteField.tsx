import { FormContext } from '@/context/formContext';
import { graphql } from '@/gql';
import type { ModalProps } from '@mantine/core';
import { Modal, Group, Button, createStyles, Text } from '@mantine/core';
import { useContext } from 'react';
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

const DeleteFieldGql = graphql(`
  mutation DeleteField($data: String!) {
    deleteField(fieldId: $data) {
      success
    }
  }
`);

const DeleteField = ({ modalProps }: { modalProps?: ModalProps }) => {
  const { classes } = useStyles();
  const [result, deleteField] = useMutation(DeleteFieldGql);

  const { state, dispatch } = useContext(FormContext);

  const onClose = () =>
    dispatch({
      type: 'setDeleteHead',
      payload: {
        deleteHead: false,
      },
    });

  return (
    <Modal
      {...modalProps}
      overlayOpacity={0.55}
      overlayBlur={3}
      title='Delete this field?'
      onClose={() => {
        if (!result.fetching) {
          onClose();
        }
      }}
      opened={state.deleteHead}
      centered
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (state.head) {
            deleteField({
              data: state.head.id,
            }).then((result) => {
              if (result.error) {
                return console.log('Opps! Error');
              }
              if (state.head) {
                dispatch({
                  type: 'deleteNode',
                  payload: {
                    nodeId: state.head.id,
                  },
                });

                dispatch({
                  type: 'setLayout',
                  payload: {
                    newLayout: true,
                  },
                });
              }
              onClose();
            });
          }
        }}
      >
        <Text mt='md' mb='md'>
          {`Are you sure want delete this ${state.head?.data.type} field?.`}{' '}
        </Text>

        <Group mt='lg' position='right' className={classes.controls}>
          <Button
            className={classes.control}
            color='gray'
            disabled={result.fetching}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className={classes.control}
            type='submit'
            loading={result.fetching}
            color='red'
          >
            Delete the field
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default DeleteField;
