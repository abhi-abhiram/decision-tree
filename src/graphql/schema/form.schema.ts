import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import * as typegoose from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import { GraphQLID } from 'graphql';
import { FormField, FieldChoice } from './field.schema';

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
  public id: string;

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
}

@ObjectType()
export class Logic {
  @Field(() => GraphQLID)
  public id: string;

  @Field(() => FormField)
  @prop({ ref: () => FormField })
  public ref?: typegoose.Ref<FormField>;

  @Field(() => [Condition])
  @prop({ type: () => [Condition] })
  public conditions?: Condition[];
}

@ObjectType()
export class Condition {
  @Field(() => ConditionType)
  @prop({ enum: ConditionType })
  public type!: ConditionType;

  @Field(() => FieldChoice)
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

  @Field(() => [GraphQLID])
  fields?: string[];

  @Field(() => [GraphQLID])
  logic?: string[];
}
