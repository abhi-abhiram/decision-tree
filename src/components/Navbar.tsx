import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  ScrollArea,
} from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  workSpace: {
    padding: theme.spacing.xs,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  workSpaceHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  workspaceLink: {
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 400,
  },
}));

const workspace = [
  {
    label: 'Outlook',
  },
  {
    label: 'Gmail',
  },
];

export default function NavBar() {
  const { classes } = useStyles();

  const workspaceLinks = workspace.map((workspace) => (
    <div className={classes.workSpace} key={workspace.label}>
      <Link href='/' className={classes.workspaceLink}>
        {workspace.label}
      </Link>
    </div>
  ));

  return (
    <Navbar
      style={{ width: '100%', height: '100%' }}
      p='md'
      className={classes.navbar}
    >
      <TextInput
        placeholder='Search'
        size='sm'
        icon={<IconSearch size={14} stroke={1.6} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        mb='sm'
      />

      <Navbar.Section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
        className={classes.section}
      >
        <Group className={classes.workSpaceHeader} position='apart'>
          <Text size='sm' weight={500} color='dimmed'>
            Workspaces
          </Text>
          <Tooltip label='Create Workspace' withArrow position='right'>
            <ActionIcon variant='default' size={24}>
              <IconPlus size={14} stroke={1.6} />
            </ActionIcon>
          </Tooltip>
        </Group>

        <ScrollArea scrollbarSize={5}>
          <div>{workspaceLinks}</div>
        </ScrollArea>
      </Navbar.Section>
    </Navbar>
  );
}
