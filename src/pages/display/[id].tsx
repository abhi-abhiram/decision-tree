import { graphql } from '@/gql';
import { createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';

const GetFrom = graphql(`
  query GetForm($id: String!) {
    getForm(id: $id) {
      id
      name
      rootField {
        id
        question
        type
        required
        attachment
        logic {
          id
          type
          value
          to {
            id
          }
        }
      }
    }
  }
`);

const useStyles = createStyles((theme) => ({
  main: {
    padding: theme.spacing.md,
  },
}));

const DisplayForm = () => {
  const { query } = useRouter();

  const [result] = useQuery({
    query: GetFrom,
    variables: {
      id: query.id as string,
    },
  });
  const { classes } = useStyles();

  if (result.fetching) return <div>Loading...</div>;

  return <div className={classes.main}></div>;
};

export default DisplayForm;
