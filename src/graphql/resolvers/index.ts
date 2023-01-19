import FormFieldResolver, { FieldPropertiesResolver } from './field.resolver';
import FormResolver from './form.resolver';
import LogicResolver from './logic.resolver';
import WorkspaceResolver from './workspace.resolver';

export const resolvers = [
  FormResolver,
  FormFieldResolver,
  FieldPropertiesResolver,
  LogicResolver,
  WorkspaceResolver,
] as const;
