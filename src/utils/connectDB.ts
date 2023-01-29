import { DataSource } from 'typeorm';
import { Logic } from '@/graphql/schema/logic.schema';
import { FormField, SearchOption } from '@/graphql/schema/field.schema';
import { Form } from '@/graphql/schema/form.schema';
import { Workspace } from '@/graphql/schema/workspace.schema';
import { env } from '@/env/server.mjs';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.DB_URL,
  entities: [FormField, SearchOption, Form, Workspace, Logic],
  synchronize: true,
});

export const getDatabaseConnection = async () => {
  if (!AppDataSource.isInitialized) {
    AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  }
};
