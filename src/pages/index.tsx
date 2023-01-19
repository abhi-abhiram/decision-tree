import { Button, Title, Center, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import CreateWorkspace from '@/components/CreateWorkspaceModal';

const Home = () => {
  const [opened, setOpen] = useState(false);
  const onClose = () => setOpen((val) => !val);

  return (
    <Center h='100%'>
      <div style={{ textAlign: 'center' }}>
        <div>
          <Title order={2} style={{ fontWeight: 600 }}>
            Welcome Back
          </Title>

          <Text size='lg' style={{ fontWeight: 400 }}>
            Create a new workspace or select an existing one
          </Text>
        </div>
        <Button
          size='xs'
          leftIcon={<IconPlus size={16} stroke={1.6} />}
          style={{ marginTop: 20, marginRight: 'auto' }}
          onClick={() => setOpen(true)}
        >
          Create workspace
        </Button>
      </div>
      <CreateWorkspace
        modalProps={{
          onClose,
          opened,
        }}
      />
    </Center>
  );
};

export default Home;
