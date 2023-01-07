import { ActionIcon, createStyles, Group, Menu, Text } from '@mantine/core';
import {
  IconAlignRight,
  IconCalendar,
  IconCaretDown,
  IconForms,
  IconListSearch,
  IconPlus,
} from '@tabler/icons';
import type { ComponentType } from 'react';
import type { Node, NodeProps, NodeTypes } from 'reactflow';
import { Handle, Position } from 'reactflow';
import ReactFlow, { Controls } from 'reactflow';
import 'reactflow/dist/style.css';

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
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : 'white',
    boxShadow: theme.shadows.sm,
  },

  content: {
    flex: 1,
  },

  nodeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nodeAddBtn: {
    // position: 'absolute',
    right: -theme.spacing.lg,
    pointerEvents: 'none',
  },
}));

const nodes: Node<any>[] = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
    type: 'custom',
  },
];

const DefaultNode: ComponentType<NodeProps<any>> = ({}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.nodeWrapper}>
      <Handle
        type='source'
        position={Position.Left}
        style={{ backgroundColor: 'transparent', border: 'none' }}
      />
      <div className={classes.customeNode}>
        <Text>Node</Text>
      </div>
      <div className={classes.nodeAddBtn}>
        <Handle
          type='target'
          position={Position.Right}
          style={{ width: '28px', height: '28px', right: '0px' }}
        />
        <ActionIcon variant='filled' color={'blue'} radius={'xl'}>
          <IconPlus size={16} stroke={1.5} />
        </ActionIcon>
      </div>
    </div>
  );
};

const nodeTypes: NodeTypes = { custom: DefaultNode };

const Editor = () => {
  const { classes, theme } = useStyles();

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
              <ActionIcon variant='filled' color={'blue'}>
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
            nodes={nodes}
            nodeTypes={nodeTypes}
            className={classes.reactflow}
            edges={[]}
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
      <div className={classes.navright}>Editor</div>
    </div>
  );
};

export default Editor;
