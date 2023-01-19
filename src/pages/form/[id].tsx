import {
  ActionIcon,
  Center,
  createStyles,
  Group,
  Loader,
  Menu,
  Text,
} from '@mantine/core';
import {
  IconAlignRight,
  IconCalendar,
  IconCaretDown,
  IconForms,
  IconListSearch,
  IconPlus,
  IconTrash,
} from '@tabler/icons';
import type { ComponentType } from 'react';
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
import type {
  FieldsLogicsQuery,
  FieldProperties,
  FormField,
} from '@/gql/graphql';
import { InputFieldType } from '@/gql/graphql';
import { useRouter } from 'next/router';
import { FormContext } from '@/context/formContext';
import DeleteField from '@/components/DeleteField';

const setLayout = (
  nodes: Node<
    FieldProperties & {
      type: InputFieldType;
    }
  >[],
  edges: Edge<unknown>[]
) => getLayout(nodes, edges, NodeDimentions.height, NodeDimentions.width);

const NodeDimentions = {
  height: 40,
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
      border: `2px solid ${theme.colors.blue[9]}`,
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
}));

const DefaultNode: ComponentType<
  NodeProps<FieldProperties & { type: InputFieldType }>
> = ({ ...props }) => {
  const { classes, cx } = useStyles();
  const { dispatch, state } = useContext(FormContext);

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
        <Text>Node</Text>
      </div>
      <div
        className={`closeBtn`}
        style={{ position: 'absolute', right: -11, top: -11, zIndex: 3 }}
        onClick={() =>
          dispatch({
            type: 'setDeleteHead',
            payload: { deleteHead: true },
          })
        }
      >
        <ActionIcon
          aria-label='Close modal'
          variant='filled'
          radius={'xl'}
          color='red'
          size={'xs'}
        >
          <IconTrash size={14} />
        </ActionIcon>
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
  mutation CreateField($data: CreateFormField!, $id: String!) {
    createFormField(data: $data, formId: $id) {
      _id
      name
      type
      properties {
        label
        placeholder
        required
      }
    }
  }
`);

const CreateLogic = graphql(`
  mutation CreateLogic($data: CreateLogic!, $formId: String!) {
    createLogic(data: $data, formId: $formId) {
      _id
      ref {
        _id
        name
        __typename
      }
      conditions {
        _id
        to {
          _id
          name
          type
          __typename
        }
        type
        __typename
      }
      __typename
    }
  }
`);

const Editor = ({
  initialfields,
  initiallogics,
}: {
  initialfields: FormField[];
  initiallogics: FieldsLogicsQuery['Form']['logic'];
}) => {
  const { classes, theme } = useStyles();
  const flow = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  const [result, createFieldMutation] = useMutation(CreateField);
  const [resultLogic, createLogicMutation] = useMutation(CreateLogic);
  const { query } = useRouter();
  const { state, dispatch } = useContext(FormContext);
  const [fields, setFields] = useState(initialfields);
  const [logics, setLogics] = useState(initiallogics);

  const edges = useMemo(() => {
    return getEdges(logics);
  }, [logics]);

  const nodes = useMemo(() => {
    const nodesNoposition = fields.map((field) => FieldToNodes(field));
    return setLayout(nodesNoposition, edges);
  }, [edges, fields]);

  const createField = useCallback(
    (type: InputFieldType) => {
      return createFieldMutation({
        id: query.id as string,
        data: {
          name: '',
          type: type,
          properties: {},
        },
      });
    },
    [createFieldMutation, query.id]
  );

  const createLogic = useCallback(
    (ref: string, to: string) => {
      return createLogicMutation({
        data: {
          conditions: [
            {
              to,
              type: ConditionType.Always,
            },
          ],
          ref,
        },
        formId: query.id as string,
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
          newField.data.createFormField._id
        );

        if (newlogic.data) {
          logics.push(newlogic.data.createLogic);
          fields.push(newField.data.createFormField);
          setLogics([...logics]);
          setFields([...fields]);
          console.log('fdafjsfsd');
        }
      }
    },
    [createField, createLogic, fields, logics, state.head]
  );

  return (
    <div className={classes.root}>
      <div className={classes.navleft}>
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
              dispatch({
                type: 'setHead',
                payload: {
                  head: node,
                },
              });
            }}
            fitView
          >
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

const Form = graphql(`
  query FieldsLogics($id: String!) {
    Form(id: $id) {
      fields {
        _id
        name
        type
        properties {
          label
          placeholder
          description
          choices {
            _id
            name
            value
          }
          attachment {
            name
            url
            type
          }
          searchOptions {
            _id
            name
            options {
              _id
              name
              value
            }
          }
          required
        }
      }
      logic {
        _id
        ref {
          _id
        }
        conditions {
          _id
          type
          choice {
            _id
            name
            value
          }
          to {
            _id
          }
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
      id: (query.id as string) || '',
    },
  });

  console.log(result.error);

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
          initialfields={result.data?.Form.fields || []}
          initiallogics={result.data?.Form.logic || []}
        />
      </ReactFlowProvider>
      <DeleteField />
    </>
  );
};

export default Wrapper;

function getEdges(logic: FieldsLogicsQuery['Form']['logic']): Edge[] {
  return logic.map((val) => ({
    id: `${val.ref._id}-${val.conditions[0]?._id}`,
    source: val.ref._id,
    target: val.conditions[0]!.to._id,
  }));
}
