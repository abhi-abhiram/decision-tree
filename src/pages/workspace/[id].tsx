import CreateForm from '@/components/CreateFormModal';
import { graphql } from '@/gql';
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
  Text,
  Center,
} from '@mantine/core';
import {
  IconChevronDown,
  IconDots,
  IconLayoutGrid,
  IconList,
  IconPlus,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useQuery } from 'urql';
import dateFormat from 'dateformat';
import RenameWorkspace from '@/components/RenameWorkspace';
import DeleteWorkspace from '@/components/DeleteWorkspace';
import type { FormsQuery } from '@/gql/graphql';

const useStyles = createStyles((theme) => {
  return {
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
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      cursor: 'pointer',
      fontSize: theme.fontSizes.md,
      transition: 'background-color 150ms ease-out',
      boxShadow: theme.shadows.sm,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[1],
      },
    },

    listHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing.md,
      width: '95%',
    },
  };
});

type ListProps = {
  name: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

const ListItem = ({ name, createdAt, updatedAt, id }: ListProps) => {
  const { classes, theme } = useStyles();
  const { push } = useRouter();
  return (
    <Box className={classes.listItem} onClick={() => push(`/form/${id}`)}>
      <div
        style={{
          height: 'auto',
          lineHeight: '1',
          flex: 1,
        }}
      >
        {name}
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
          whiteSpace: 'nowrap',
        }}
      >
        {createdAt}
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
          whiteSpace: 'nowrap',
        }}
      >
        {updatedAt}
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

const Forms = graphql(`
  query Forms($id: String!) {
    Workspace(id: $id) {
      _id
      name
      forms {
        _id
        name
        createdAt
        updatedAt
      }
    }
  }
`);

const sortData = (
  data: FormsQuery,
  sortBy: 'CreatedAt' | 'UpdatedAt' | 'Alpha'
) => {
  const sortedData = data;
  if (sortBy === 'CreatedAt') {
    sortedData.Workspace.forms = data.Workspace.forms.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  } else if (sortBy === 'UpdatedAt') {
    sortedData.Workspace.forms = data.Workspace.forms.sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );
  } else {
    sortedData.Workspace.forms = data.Workspace.forms.sort((a, b) => {
      const nameA = a.name;
      const nameB = b.name;
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  return sortedData;
};

const WorkSpace = () => {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  const { query } = useRouter();
  const [result] = useQuery({
    query: Forms,
    variables: {
      id: query.id as string,
    },
  });
  const [rename, setRename] = useState(false);
  const [deleteWorkspace, setDeleteWorkspace] = useState(false);
  const [sortedBy, setSortedBy] = useState<'CreatedAt' | 'UpdatedAt' | 'Alpha'>(
    'CreatedAt'
  );
  const sortedData = useMemo(() => {
    if (result.data) return sortData(result.data, sortedBy);
  }, [result.data, sortedBy]);

  return (
    <div className={classes.workspace}>
      <div>
        <Group>
          <div>
            <Title order={3} className={classes.workspaceName}>
              {result.data?.Workspace.name}
            </Title>
          </div>

          <Menu
            shadow='md'
            width={150}
            position={'right-start'}
            offset={5}
            transition={'pop'}
          >
            <Menu.Target>
              <ActionIcon color='gray'>
                <IconDots size={16} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Copy Link</Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={() => setRename(true)}>Rename</Menu.Item>
              <Menu.Item color='red' onClick={() => setDeleteWorkspace(true)}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Group mt={'xl'} position='apart'>
          <Button
            size='xs'
            color='gray'
            leftIcon={<IconPlus size={16} stroke={1.6} />}
            onClick={() => setOpened(true)}
          >
            Create Form
          </Button>

          <Group>
            <div>
              <Select
                data={[
                  {
                    label: 'Date created',
                    value: 'CreatedAt',
                  },
                  { label: 'Last updated', value: 'UpdatedAt' },
                  { name: 'Alphabetical', value: 'Alpha' },
                ]}
                placeholder='Pick one'
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                size='xs'
                w={120}
                onChange={(e) => {
                  if (e) setSortedBy(e as 'CreatedAt' | 'UpdatedAt' | 'Alpha');
                }}
                value={sortedBy}
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
          {sortedData?.Workspace.forms.map((val) => {
            return (
              <ListItem
                createdAt={dateFormat(val.createdAt, 'paddedShortDate')}
                name={val.name}
                updatedAt={dateFormat(val.updatedAt, 'paddedShortDate')}
                id={val._id}
                key={val._id}
              />
            );
          })}
        </div>
      </ScrollArea>
      {result.data?.Workspace.forms.length === 0 && (
        <Center h='100%'>
          <div style={{ textAlign: 'center' }}>
            <div>
              <Title order={2} style={{ fontWeight: 600 }}>
                {result.data.Workspace.name}
              </Title>

              <Text size='lg' style={{ fontWeight: 400 }}>
                Create a new form or select an existing one
              </Text>
            </div>
            <Button
              size='xs'
              leftIcon={<IconPlus size={16} stroke={1.6} />}
              style={{ marginTop: 20, marginRight: 'auto' }}
              onClick={() => setOpened(true)}
            >
              Create form
            </Button>
          </div>
        </Center>
      )}
      <CreateForm
        modalProps={{
          onClose: () => setOpened(false),
          opened,
        }}
      />
      <RenameWorkspace
        modalProps={{
          onClose: () => setRename(false),
          opened: rename,
        }}
        oldName={result.data?.Workspace.name || ''}
      />
      <DeleteWorkspace
        id={result.data?.Workspace._id || ''}
        modalProps={{
          opened: deleteWorkspace,
          onClose: () => setDeleteWorkspace(false),
        }}
        workspaceName={result.data?.Workspace.name || ''}
      />
    </div>
  );
};

export default WorkSpace;
