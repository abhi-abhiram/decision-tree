import {
  ActionIcon,
  Button,
  createStyles,
  Divider,
  Group,
  ScrollArea,
  Select,
  Title,
  Box,
  Menu,
} from '@mantine/core';
import {
  IconChevronDown,
  IconDots,
  IconLayoutGrid,
  IconList,
  IconPlus,
} from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  workspace: {
    padding: theme.spacing.xl,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  workspaceName: {
    fontWeight: 500,
  },

  workspaceItems: {
    height: '100%',
  },

  workspaceHeader: {
    display: 'flex',
    alignItems: 'center',
  },

  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    borderRadius: theme.radius.md,
    width: '95%',
    marginBottom: theme.spacing.md,
    height: '60',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    cursor: 'pointer',
    fontSize: theme.fontSizes.md,
    transition: 'background-color 150ms ease-out',
    boxShadow: theme.shadows.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },

  listHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.md,
    width: '95%',
  },
}));

const ListItem = () => {
  const { classes, theme } = useStyles();
  return (
    <Box className={classes.listItem}>
      <div
        style={{
          height: 'auto',
          lineHeight: '1',
          flex: 1,
        }}
      >
        Name
      </div>
      <div
        style={{
          height: 'auto',
          lineHeight: '1',
          marginLeft: theme.spacing.sm,
          width: '100px',
          minWidth: '100px',
          textAlign: 'left',
          fontSize: theme.fontSizes.sm,
        }}
      >
        {new Date().toLocaleDateString()}
      </div>
      <div
        style={{
          height: 'auto',
          lineHeight: '1',
          marginLeft: theme.spacing.sm,
          width: '100px',
          minWidth: '100px',
          textAlign: 'left',
          marginRight: theme.spacing.md,
          fontSize: theme.fontSizes.sm,
        }}
      >
        {new Date().toLocaleDateString()}
      </div>
      <div
        style={{
          height: 'auto',
          lineHeight: '1',
          marginLeft: theme.spacing.sm,
          width: '28px',
          minWidth: '28px',
        }}
      >
        <Menu
          shadow='md'
          width={150}
          position={'bottom-end'}
          offset={5}
          transition={'pop'}
        >
          <Menu.Target>
            <ActionIcon color='blue'>
              <IconDots size={16} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Edit</Menu.Item>
            <Menu.Item>Copy Link</Menu.Item>
            <Menu.Divider />
            <Menu.Item>Rename</Menu.Item>
            <Menu.Item color='red'>Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Box>
  );
};

const WorkSpace = () => {
  const { classes, theme } = useStyles();
  return (
    <div className={classes.workspace}>
      <div>
        <Group>
          <div>
            <Title order={3} className={classes.workspaceName}>
              Workspace
            </Title>
          </div>

          <ActionIcon>
            <IconDots size={16} stroke={1.5} />
          </ActionIcon>
        </Group>

        <Group mt={'xl'} position='apart'>
          <Button
            size='xs'
            color='gray'
            leftIcon={<IconPlus size={16} stroke={1.6} />}
          >
            Create new
          </Button>

          <Group>
            <div>
              <Select
                data={['Date created', 'Last updated', 'Alphabetical']}
                placeholder='Pick one'
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                size='xs'
                w={120}
                variant='filled'
              />
            </div>

            <Button.Group>
              <Button
                variant='default'
                size='xs'
                leftIcon={<IconLayoutGrid size={16} />}
              >
                Grid
              </Button>
              <Button
                variant='default'
                size='xs'
                leftIcon={<IconList size={16} />}
              >
                List
              </Button>
            </Button.Group>
          </Group>
        </Group>
      </div>
      <Divider mt='lg' />
      <div className={classes.listHeader}>
        <div
          style={{
            height: 'auto',
            lineHeight: '1',
            flex: 1,
            fontSize: theme.fontSizes.sm,
          }}
        >
          Name
        </div>
        <div
          style={{
            height: 'auto',
            lineHeight: '1',
            marginLeft: theme.spacing.sm,
            width: '100px',
            minWidth: '100px',
            fontSize: theme.fontSizes.sm,
          }}
        >
          Created
        </div>
        <div
          style={{
            height: 'auto',
            lineHeight: '1',
            marginLeft: theme.spacing.sm,
            width: '100px',
            minWidth: '100px',
            fontSize: theme.fontSizes.sm,
            marginRight: theme.spacing.md,
          }}
        >
          Updated
        </div>
        <div
          style={{
            height: 'auto',
            lineHeight: '1',
            marginLeft: theme.spacing.sm,
            width: '28px',
            minWidth: '28px',
          }}
        ></div>
      </div>
      <ScrollArea
        style={{
          height: '100%',
          flex: 1,
          marginTop: theme.spacing.xs,
        }}
        scrollbarSize={8}
        offsetScrollbars
      >
        <div>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </div>
      </ScrollArea>
    </div>
  );
};

export default WorkSpace;
