import { CloseButton, createStyles, Group, Tabs } from '@mantine/core';
import { IconMessageCircle, IconAdjustmentsHorizontal } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  toolbar: {
    width: 300,
    padding: theme.spacing.xs,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    height: '100%',
  },
}));

const Toolbar = ({ onClose }: { onClose: () => void }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.toolbar}>
      <Tabs defaultValue='gallery'>
        <Group position='apart'>
          <Tabs.List position='center' style={{ border: 'none' }}>
            <Tabs.Tab
              value='gallery'
              icon={<IconAdjustmentsHorizontal size={14} />}
            >
              Properties
            </Tabs.Tab>
            <Tabs.Tab value='messages' icon={<IconMessageCircle size={14} />}>
              Logic
            </Tabs.Tab>
          </Tabs.List>

          <CloseButton onClick={onClose} />
        </Group>

        <Tabs.Panel value='gallery' pt='xs'>
          Gallery tab content
        </Tabs.Panel>

        <Tabs.Panel value='messages' pt='xs'>
          Messages tab content
        </Tabs.Panel>

        <Tabs.Panel value='settings' pt='xs'>
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Toolbar;
