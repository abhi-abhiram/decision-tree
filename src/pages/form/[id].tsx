import {
  ActionIcon,
  Center,
  createStyles,
  Divider,
  Group,
  Loader,
  Menu,
  ScrollArea,
  Text,
} from '@mantine/core';
import {
  IconAlignRight,
  IconCalendar,
  IconCaretDown,
  IconForms,
  IconListSearch,
  IconPlus,
} from '@tabler/icons';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { useState, useMemo, useContext, useCallback, useRef } from 'react';
import type { Edge, NodeProps, NodeTypes, Node } from 'reactflow';
import { MiniMap, ReactFlowProvider } from 'reactflow';
import { useReactFlow } from 'reactflow';
import ReactFlow, { Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import getLayout, { FieldToNodes } from '@/utils/lr';
import { graphql } from '@/gql';
import { useMutation, useQuery } from 'urql';
import { ConditionType } from '@/gql/graphql';
import type { FormField, FieldsLogicsQuery } from '@/gql/graphql';
import { InputFieldType } from '@/gql/graphql';
import { useRouter } from 'next/router';
import { FormContext } from '@/context/formContext';
import ContextMenu from '@/components/ContextMenu';
import NodeItem from '@/components/NodeItem';
import Toolbar from '@/components/Toolbar';
import Truncate from '@/components/Truncate';

const setLayout = (nodes: Node<FormField>[], edges: Edge<unknown>[]) =>
  getLayout(nodes, edges, NodeDimentions.height, NodeDimentions.width);

const NodeDimentions = {
  height: 50,
  width: 150,
};

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },

  navleft: {
    width: 250,
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark : theme.white,
  },

  navright: {
    width: 250,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  reactflow: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
  },

  customeNode: {
    height: NodeDimentions.height,
    width: NodeDimentions.width,
    borderRadius: theme.radius.sm,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : 'white',
    textAlign: 'center',
    boxShadow: theme.shadows.sm,
    border: `2px solid transparent`,
    '&:hover': {
      border: `2px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.blue[8]
          : theme.colors.blue[7]
      }`,
    },
  },

  content: {
    height: '100%',
    flex: 1,
  },

  nodeWrapper: {
    position: 'relative',
    '& .closeBtn': {
      transition: 'opacity 0.2s ease-in-out',
      opacity: 0,
    },
    '&:hover': {
      '& .closeBtn': {
        opacity: 1,
        transition: 'opacity 0.2s ease-in-out',
      },
    },
  },

  head: {
    border: `2px solid ${theme.colors.blue[9]}`,
  },

  nodeItem: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.gray[9]
          : theme.colors.gray[2],
    },
  },
}));

const DefaultNode: ComponentType<NodeProps<FormField>> = ({ ...props }) => {
  const { classes, cx } = useStyles();
  const { state } = useContext(FormContext);

  return (
    <div className={classes.nodeWrapper}>
      <Handle
        type='target'
        position={Position.Left}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          width: '24px',
          height: '24px',
          top: '50%',
        }}
      />
      <div
        className={cx(classes.customeNode, {
          [classes.head]: props.id === state.head?.id,
        })}
      >
        <div
          style={{
            padding: '0 10px',
          }}
        >
          <Truncate
            text={props.data.question || '...'}
            maxLength={34}
            textProps={{
              size: 'sm',
              align: 'center',
            }}
          />
        </div>
      </div>
      <Handle
        type='source'
        position={Position.Right}
        style={{
          width: '20px',
          height: '20px',
          right: '-8px',
          top: '50%',
        }}
      />
    </div>
  );
};

const nodeTypes: NodeTypes = { custom: DefaultNode };

const CreateField = graphql(`
  mutation CreateField($data: FormFieldInput!, $id: String!) {
    createFormField(data: $data, formId: $id) {
      id
      question
      type
      required
    }
  }
`);

const CreateLogic = graphql(`
  mutation CreateLogic($data: LogicInput!, $id: String!) {
    createLogic(data: $data, formId: $id) {
      id
      ref {
        id
      }
      type
      value
      to {
        id
      }
    }
  }
`);

const DeleteFieldGql = graphql(`
  mutation DeleteField($id: String!) {
    deleteFormField(id: $id)
  }
`);

const Editor = ({
  initialfields,
  initiallogics,
}: {
  initialfields: FormField[];
  initiallogics: FieldsLogicsQuery['getForm']['logic'];
}) => {
  const { classes, theme } = useStyles();
  const flow = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  const [result, createFieldMutation] = useMutation(CreateField);
  const [resultLogic, createLogicMutation] = useMutation(CreateLogic);
  const [resultDeleteField, deleteFieldMutation] = useMutation(DeleteFieldGql);
  const { query } = useRouter();
  const { state, dispatch } = useContext(FormContext);
  const [fields, setFields] = useState(initialfields);
  const [logics, setLogics] = useState(initiallogics);
  const [openContextMenu, setOpenContextMenu] = useState({
    open: false,
    x: 0,
    y: 0,
  });
  const [openToolbar, setOpenToolbar] = useState(false);

  const edges = useMemo(() => {
    return getEdges(logics);
  }, [logics]);

  const nodes = useMemo(() => {
    const nodesNoposition = fields.map((field) => FieldToNodes(field));
    return setLayout(nodesNoposition, edges);
  }, [edges, fields]);

  const updateField = useCallback(
    (field: FormField) => {
      const newFields = fields.map((f) => {
        if (f.id === field.id) {
          return field;
        }
        return f;
      });
      setFields(newFields);
    },
    [fields]
  );

  useEffect(() => {
    const node = nodes.find((node) => node.id === state.head?.id);
    const timer = setTimeout(() => {
      if (node) {
        reactFlowInstance.fitBounds(
          {
            ...NodeDimentions,
            x: node.position.x,
            y: node.position.y,
          },
          {
            duration: 800,
            padding: 4,
          }
        );
      }
      clearTimeout(timer);
    }, 10);

    if (!state.head?.id) {
      setOpenToolbar(false);
    }
  }, [openToolbar, state.head?.id]);

  const createField = useCallback(
    (type: InputFieldType) => {
      return createFieldMutation({
        id: query.id as string,
        data: {
          question: '',
          type: type,
          form: '',
        },
      });
    },
    [createFieldMutation, query.id]
  );

  const createLogic = useCallback(
    (ref: string, to: string) => {
      return createLogicMutation({
        data: {
          ref: ref,
          to: to,
          type: ConditionType.Always,
        },
        id: query.id as string,
      });
    },
    [createLogicMutation, query.id]
  );

  const addNewField = useCallback(
    async (type: InputFieldType) => {
      const newField = await createField(type);
      if (state.head && newField.data?.createFormField) {
        const newlogic = await createLogic(
          state.head.id,
          newField.data.createFormField.id
        );

        if (newlogic.data) {
          logics.push(newlogic.data.createLogic);
          fields.push(newField.data.createFormField);
          setLogics([...logics]);
          setFields([...fields]);
        }
      }
    },
    [createField, createLogic, fields, logics, state.head]
  );

  return (
    <div className={classes.root}>
      <div className={classes.navleft}>
        <div>
          <Group
            style={{
              padding: theme.spacing.md,
            }}
            position='apart'
          >
            <Text style={{ fontWeight: 500 }}>Node</Text>
            <Menu
              shadow='md'
              width={200}
              position='right-start'
              closeOnClickOutside={true}
            >
              <Menu.Target>
                <ActionIcon
                  variant='filled'
                  color={'blue'}
                  loading={result.fetching || resultLogic.fetching}
                >
                  <IconPlus size={16} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label style={{ fontSize: theme.fontSizes.md }}>
                  Question Types
                </Menu.Label>
                <Menu.Item
                  icon={<IconForms size={18} stroke={1.5} />}
                  color={theme.colors.blue[4]}
                  onClick={async () => {
                    await addNewField(InputFieldType.Textinput);
                  }}
                >
                  Input Box
                </Menu.Item>
                <Menu.Item
                  icon={<IconAlignRight size={18} stroke={1.5} />}
                  color={theme.colors.yellow[4]}
                >
                  Text
                </Menu.Item>
                <Menu.Item
                  icon={<IconListSearch size={18} stroke={1.5} />}
                  color={theme.colors.green[4]}
                >
                  Search
                </Menu.Item>
                <Menu.Item
                  icon={<IconCaretDown size={18} stroke={1.5} />}
                  color={theme.colors.pink[4]}
                >
                  Dropdown
                </Menu.Item>
                <Menu.Item
                  icon={<IconCalendar size={18} stroke={1.5} />}
                  color={theme.colors.lime[4]}
                >
                  Date
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
        <Divider />
        <ScrollArea h='100%' scrollbarSize={5}>
          {fields.map((field) => (
            <NodeItem
              key={field.id}
              node={field}
              onClickMenu={(x: number, y: number) =>
                setOpenContextMenu({
                  open: true,
                  x,
                  y,
                })
              }
              onClick={() => {
                dispatch({
                  type: 'Set_Head',
                  payload: {
                    head: field,
                  },
                });

                setOpenToolbar(true);
              }}
            />
          ))}
        </ScrollArea>
      </div>
      <div className={classes.content}>
        <div style={{ height: '100%' }}>
          <ReactFlow
            ref={flow}
            nodes={nodes}
            nodeTypes={nodeTypes}
            className={classes.reactflow}
            nodesFocusable={true}
            edges={edges}
            onNodeClick={(e, node) => {
              if (openToolbar) {
                reactFlowInstance.fitBounds(
                  {
                    ...NodeDimentions,
                    x: node.position.x,
                    y: node.position.y,
                  },
                  {
                    duration: 800,
                    padding: 4,
                  }
                );
              }
              dispatch({
                type: 'Set_Head',
                payload: {
                  head: {
                    id: node.id,
                    question: node.data.question,
                    type: node.data.type,
                    required: node.data.required,
                    logic: node.data.logic,
                  },
                },
              });
              setOpenToolbar(true);
            }}
            fitView
          >
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
      {openContextMenu.open && (
        <ContextMenu
          close={() =>
            setOpenContextMenu({
              open: false,
              x: 0,
              y: 0,
            })
          }
          x={openContextMenu.x}
          y={openContextMenu.y}
          onDelete={() => {
            if (state.head) {
              deleteFieldMutation({
                id: state.head.id,
              }).then((res) => {
                setOpenContextMenu({
                  open: false,
                  x: 0,
                  y: 0,
                });

                setFields(
                  fields.filter((field) => field.id !== state.head?.id)
                );
                dispatch({
                  type: 'Set_Head',
                  payload: {
                    head: undefined,
                  },
                });
              });
            }
          }}
        />
      )}
      {openToolbar && (
        <Toolbar
          onClose={() => setOpenToolbar(false)}
          onUpdate={updateField}
          fields={fields}
          logics={logics}
        />
      )}
    </div>
  );
};

const Form = graphql(`
  query FieldsLogics($id: String!) {
    getForm(id: $id) {
      fields {
        id
        question
        type
        placeholder
        required
        options {
          id
          name
          value
        }
        attachment
      }
      logic {
        id
        ref {
          id
        }
        type
        value
        to {
          id
        }
      }
    }
  }
`);

const Wrapper = () => {
  const { query } = useRouter();
  const [result] = useQuery({
    query: Form,
    variables: {
      id: query.id as string,
    },
  });

  if (result.fetching) {
    return (
      <Center h='100%'>
        <Loader size={'md'} />
      </Center>
    );
  }

  return (
    <>
      <ReactFlowProvider>
        <Editor
          initialfields={result.data?.getForm.fields || []}
          initiallogics={result.data?.getForm.logic || []}
        />
      </ReactFlowProvider>
    </>
  );
};

export default Wrapper;

function getEdges(logic: FieldsLogicsQuery['getForm']['logic']): Edge[] {
  return logic.map((val) => ({
    id: `${val.ref.id}-${val.id}`,
    source: val.ref.id,
    target: val.to.id,
  }));
}
