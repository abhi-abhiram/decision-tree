import { Field, ObjectType } from 'type-graphql';
import type * as typegoose from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import { GraphQLID } from 'graphql';
import { Form } from './form.schema';

@ObjectType()
export class Workspace {
  @Field(() => GraphQLID)
  public id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => [Form])
  @prop({ ref: () => Form })
  public forms?: typegoose.Ref<Form>[];

  @Field(() => Date)
  @prop({ default: Date.now })
  public createdAt?: Date;
}
