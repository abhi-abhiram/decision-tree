import FormFieldResolver from './field.resolver';
import FormResolver from './form.resolver';

export const resolvers = [FormResolver, FormFieldResolver] as const;
