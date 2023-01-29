import {
  CloseButton,
  createStyles,
  Divider,
  Group,
  Tabs,
  Text,
  Button,
  Select,
  TextInput,
  NativeSelect,
} from '@mantine/core';
import { IconAdjustmentsHorizontal, IconArrowRampRight } from '@tabler/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { FormContext } from '@/context/formContext';
import type { FieldsLogicsQuery, FormField } from '@/gql/graphql';
import { ConditionType } from '@/gql/graphql';
import { InputFieldType } from '@/gql/graphql';
import { z } from 'zod';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import FormInput from './FormikCompo/FormikInput';
import FormikSelect from './FormikCompo/FormikSelect';
import FormikCheck from './FormikCompo/FormikCheckBox';
import Formiktextarea from './FormikCompo/FormikTextarea';
import { graphql } from '@/gql';
import { useMutation } from 'urql';
import { TypeBadge } from './TypeBadge';
import useOnClickOutside from './useOnClickOutside';

const useStyles = createStyles((theme) => ({
  toolbar: {
    position: 'relative',
    width: 300,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    height: '100%',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark : theme.white,
  },

  formActions: {
    position: 'absolute',
    right: 0,
    margin: theme.spacing.md,
  },

  logicBox: {
    padding: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.xs,
  },

  collapseLogicBox: {
    padding: theme.spacing.xs,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.xs,

    ':hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
      cursor: 'pointer',
    },
  },
}));

const inputFieldTypes = Object.entries(InputFieldType);

const UpdateField = graphql(`
  mutation UpdateField($id: String!, $input: FormFieldUpdateInput!) {
    updateFormField(id: $id, data: $input) {
      id
      question
      type
      required
      attachment
    }
  }
`);

const CollapseLogic = ({
  logic,
  to,
  onClick,
}: {
  logic: FieldsLogicsQuery['getForm']['logic'][number];
  to: FormField;
  onClick: () => void;
}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.collapseLogicBox} onClick={onClick}>
      <Group position='apart'>
        <Text size='sm' weight={500}>
          {logic.type === ConditionType.Always
            ? 'Always'
            : `If = ${logic.value}`}
        </Text>
        <Group spacing={'xs'}>
          <Text size='sm' weight={500}>
            Go to
          </Text>
          <TypeBadge type={to.type} />
        </Group>
      </Group>
    </div>
  );
};

const UpdateLogic = graphql(`
  mutation UpdateLogic($id: String!, $input: LogicUpdateInput!) {
    updateLogic(id: $id, data: $input) {
      id
    }
  }
`);

const ExpandLogic = ({
  logic,
  fields,
  onClose,
}: {
  logic: FieldsLogicsQuery['getForm']['logic'][number];
  fields: FormField[];
  onClose: () => void;
}) => {
  const { classes } = useStyles();
  const { state } = useContext(FormContext);
  const ref = useRef<HTMLDivElement>(null);
  const [logicState, setLogicState] = useState(logic);
  const [result, updateLogic] = useMutation(UpdateLogic);

  useOnClickOutside(ref, onClose);

  return (
    <div className={classes.logicBox} ref={ref}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          updateLogic({
            id: logic.id,
            input: {
              type: logicState.type,
              value: logicState.value,
            },
          });
        }}
      >
        <Select
          data={[state.head?.question || '']}
          mb='sm'
          value={state.head?.question}
          readOnly
        />

        <Group spacing={0} mb='sm'>
          <NativeSelect
            data={[
              {
                label: 'Always',
                value: ConditionType.Always,
              },
              {
                label: 'Equal to',
                value: ConditionType.Equal,
              },
            ]}
            style={{ flex: 1 }}
            styles={{
              input: {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
            onChange={(e) => {
              setLogicState({
                ...logicState,
                type: e.target.value as ConditionType,
              });
            }}
            value={logicState.type}
          />
          <TextInput
            placeholder='Value'
            style={{ width: '60%' }}
            value={logicState.value || ''}
            styles={{
              input: {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            }}
            disabled={logicState.type === ConditionType.Always}
            onChange={(e) => {
              setLogicState({
                ...logicState,
                value: e.target.value,
              });
            }}
          />
        </Group>

        <Text size='sm' weight={500} mb='xs'>
          Then
        </Text>

        <Select
          data={['Go to']}
          style={{
            width: '50%',
          }}
          value='Go to'
          mb='sm'
        />
        <Select
          data={fields.map((field) => ({
            label: field.question,
            value: field.id,
          }))}
          value={logic.to.id}
          readOnly
        />

        <Group position='apart' mt={50}>
          <Button variant='subtle' color='red' size='xs'>
            Delete this logic
          </Button>

          <Button
            variant='light'
            size='xs'
            type='submit'
            loading={result.fetching}
          >
            Save
          </Button>
        </Group>
      </form>
    </div>
  );
};

const Toolbar = ({
  onClose,
  onUpdate,
  logics,
  fields,
}: {
  onClose: () => void;
  onUpdate: (field: FormField) => void;
  fields: FormField[];
  logics: FieldsLogicsQuery['getForm']['logic'];
}) => {
  const { classes, theme } = useStyles();
  const { state, dispatch } = useContext(FormContext);
  const [, updateField] = useMutation(UpdateField);
  const resetBttn = useRef<HTMLButtonElement>(null);
  const [expandLogicId, setExpandLogicId] = useState<string>();

  useEffect(() => {
    if (resetBttn.current) {
      resetBttn.current.click();
    }
  }, [state.head]);

  return (
    <div className={classes.toolbar}>
      <Tabs defaultValue='props'>
        <Group position='apart'>
          <Tabs.List
            position='center'
            style={{ border: 'none', padding: theme.spacing.sm }}
          >
            <Tabs.Tab
              value='props'
              icon={<IconAdjustmentsHorizontal size={14} />}
            >
              Properties
            </Tabs.Tab>
            <Tabs.Tab value='logic' icon={<IconArrowRampRight size={14} />}>
              Logic
            </Tabs.Tab>
          </Tabs.List>

          <CloseButton onClick={onClose} />
        </Group>

        <Tabs.Panel value='props'>
          <Formik
            initialValues={{
              question: state.head?.question,
              type: state.head?.type,
              required: state.head?.required,
              image: state.head?.attachment || '',
            }}
            validationSchema={toFormikValidationSchema(
              z.object({
                type: z.string(),
                question: z.string(),
                required: z.boolean(),
                image: z.string().optional(),
              })
            )}
            onSubmit={async (values) => {
              if (state.head) {
                const result = await updateField({
                  id: state.head.id,
                  input: {
                    type: values.type,
                    question: values.question,
                    required: values.required,
                    attachment: values.image,
                  },
                });

                if (result.data) {
                  dispatch({
                    type: 'Set_Head',
                    payload: {
                      head: {
                        id: result.data.updateFormField.id,
                        question: result.data.updateFormField.question,
                        type: result.data.updateFormField.type,
                        required: result.data.updateFormField.required,
                        attachment: result.data.updateFormField.attachment,
                      },
                    },
                  });

                  onUpdate(result.data.updateFormField);
                }
              }
            }}
          >
            {({ isSubmitting, resetForm }) => {
              return (
                <Form>
                  <div
                    style={{
                      padding: theme.spacing.sm,
                    }}
                  >
                    <Text size='sm' weight={500} mb='xs'>
                      Type
                    </Text>
                    <FormikSelect
                      name='type'
                      data={inputFieldTypes.map(([key, value]) => ({
                        label: key,
                        value,
                      }))}
                    />
                  </div>
                  <Divider />
                  <div style={{ padding: theme.spacing.sm }}>
                    <Text size='sm' weight={500} mb='xs'>
                      Question
                    </Text>
                    <FormInput
                      name='question'
                      placeholder='Question text here'
                    />

                    <Text size='sm' weight={500} mt='xs' mb='xs'>
                      Help Text
                    </Text>
                    <Formiktextarea name='helpText' placeholder='Help text' />
                    <FormikCheck
                      name='required'
                      label='Required'
                      mt='sm'
                      mb='sm'
                    />
                  </div>
                  <Divider />
                  <div style={{ padding: theme.spacing.sm }}>
                    <Text size='sm' weight={500} mb='xs'>
                      Image
                    </Text>
                    <FormInput
                      name='image'
                      placeholder='Enter image url here'
                    />
                  </div>
                  <div className={classes.formActions}>
                    <Group position='apart'>
                      <Button variant='outline' color='red' onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        variant='outline'
                        color='blue'
                        type='submit'
                        loading={isSubmitting}
                      >
                        Save
                      </Button>
                    </Group>
                  </div>
                  <button
                    type='reset'
                    style={{ display: 'none' }}
                    ref={resetBttn}
                    onClick={() => {
                      resetForm({
                        values: {
                          question: state.head?.question,
                          type: state.head?.type,
                          required: state.head?.required,
                          image: state.head?.attachment || '',
                        },
                      });
                    }}
                  />
                </Form>
              );
            }}
          </Formik>
        </Tabs.Panel>

        <Tabs.Panel value='logic' p='sm'>
          <Text size='md' weight={500} mb='xs'>
            Edit Logic
          </Text>

          {logics.map((logic, index) => {
            const to = fields.find((field) => field.id === logic.to.id);
            if (logic.ref.id === state.head?.id && to) {
              return expandLogicId === logic.id ? (
                <ExpandLogic
                  fields={fields}
                  logic={logic}
                  key={logic.id}
                  onClose={() => setExpandLogicId(undefined)}
                />
              ) : (
                <CollapseLogic
                  key={index}
                  logic={logic}
                  to={to}
                  onClick={() => setExpandLogicId(logic.id)}
                />
              );
            }
          })}

          <Button color='blue' size='xs'>
            Add Logic
          </Button>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Toolbar;
