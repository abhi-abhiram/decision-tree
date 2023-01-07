import { Center, Button, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

const Home = () => {
  return (
    <Center h='100%'>
      <div style={{ textAlign: 'center' }}>
        <div>
          <Title order={2} style={{ fontWeight: 600 }}>
            Welcome Back
          </Title>

          <Text size='lg' style={{ fontWeight: 400 }}>
            Create a new workspace or join an existing one
          </Text>
        </div>
        <Button
          leftIcon={<IconPlus size={16} stroke={1.6} />}
          size='xs'
          style={{ marginTop: 20, marginRight: 'auto' }}
        >
          Create WorkSpace
        </Button>
      </div>
    </Center>
  );
};

export default Home;
