import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import * as typegoose from '@typegoose/typegoose';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { GraphQLID } from 'graphql';
import { FormField, FieldChoice } from './field.schema';
import { UpdateOpration } from './common';

enum ConditionType {
  EQUAL = 'EQUAL',
  ALWAYS = 'ALWAYS',
}

registerEnumType(ConditionType, {
  name: 'ConditionType',
  description: 'Condition type',
});

@ObjectType()
export class Form {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => [FormField])
  @prop({ ref: () => FormField })
  public fields?: typegoose.Ref<FormField>[];

  @Field(() => [Logic])
  @prop({ ref: () => Logic })
  public logic?: typegoose.Ref<Logic>[];

  @Field(() => Date)
  @prop({ default: Date.now })
  public createdAt: Date;

  @Field(() => Date)
  @prop({ default: Date.now })
  public updatedAt: Date;
}

@ObjectType()
export class Logic {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => FormField)
  @prop({ ref: () => FormField })
  public ref: typegoose.Ref<FormField>;

  @Field(() => [Condition])
  @prop({ type: () => [Condition] })
  public conditions: Condition[];
}

@ObjectType()
export class Condition {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => ConditionType)
  @prop({ enum: ConditionType })
  public type!: ConditionType;

  @Field(() => FieldChoice, { nullable: true })
  @prop({ ref: () => FieldChoice })
  public choice?: typegoose.Ref<FieldChoice>;

  @Field(() => FormField)
  @prop({ ref: () => FormField })
  public to: typegoose.Ref<FormField>;
}

@InputType()
export class CreateForm {
  @Field(() => String)
  name!: string;

  @Field(() => [GraphQLID], { nullable: true })
  fields?: string[];

  @Field(() => [GraphQLID], { nullable: true })
  logic?: string[];
}

@InputType()
export class CreateCondition {
  @Field(() => ConditionType)
  type: ConditionType;

  @Field(() => GraphQLID, { nullable: true })
  choice: string;

  @Field(() => GraphQLID)
  to: string;
}

@InputType()
export class CreateLogic {
  @Field(() => GraphQLID)
  ref: string;

  @Field(() => [CreateCondition])
  conditions: Condition[];
}

@InputType()
export class UpdateFields extends UpdateOpration {
  @Field(() => [GraphQLID])
  fields: string[];
}

@InputType()
export class UpdateLogics extends UpdateOpration {
  @Field(() => [GraphQLID])
  logic: string[];
}

@InputType()
export class UpdateForm {
  @Field(() => GraphQLID)
  _id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => UpdateFields, { nullable: true })
  fields?: UpdateFields;

  @Field(() => UpdateLogics, { nullable: true })
  logic?: UpdateLogics;
}

@InputType()
export class AddFormToWorkspace {
  @Field(() => GraphQLID)
  workspaceId: string;

  @Field(() => [GraphQLID])
  formIds: string[];
}

export const FormModel = getModelForClass<typeof Form>(Form);
export const LogicModel = getModelForClass<typeof Logic>(Logic);
