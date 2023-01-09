import type { ReturnModelType } from '@typegoose/typegoose';
import { getModelForClass } from '@typegoose/typegoose';
import * as graphql from 'graphql';
import { Arg, Info, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateFormField,
  FormField,
  InputFieldType,
  FieldChoice,
  CreateFieldChoice,
} from '../schema/field.schema';
import graphqlFields from 'graphql-fields';

@Resolver(FormField)
export default class FormFieldResolver {
  private FieldModel: ReturnModelType<typeof FormField>;
  private FieldChoiceModel: ReturnModelType<typeof FieldChoice>;

  constructor() {
    this.FieldModel = getModelForClass(FormField);
    this.FieldChoiceModel = getModelForClass(FieldChoice);
  }

  @Query(() => [FormField])
  async Forms(@Info() info: graphql.GraphQLResolveInfo): Promise<FormField[]> {
    return [
      {
        id: '1',
        name: 'name',
        type: InputFieldType.DATE,
      },
    ];
  }

  @Mutation(() => FormField)
  async createFormField(
    @Arg('data') input: CreateFormField
  ): Promise<FormField> {
    const field = await this.FieldModel.create(input);

    return field;
  }

  @Mutation(() => FieldChoice)
  async createFieldChoice(
    @Arg('data') input: CreateFieldChoice
  ): Promise<FieldChoice> {
    const choice = await this.FieldChoiceModel.create(input);
    await choice.save();
    return choice;
  }
}
