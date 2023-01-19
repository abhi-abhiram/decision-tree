import { Field, InputType, ObjectType } from 'type-graphql';
import * as typegoose from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import { GraphQLID } from 'graphql';
import { Form } from './form.schema';
import { UpdateOpration } from './common';

@ObjectType()
export class Workspace {
  @Field(() => GraphQLID)
  public _id: string;

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

@InputType()
export class CreateWorkspace {
  @Field(() => String)
  name: string;
}

@InputType()
export class UpdateForms extends UpdateOpration {
  @Field(() => [GraphQLID])
  formIds: string[];
}

@InputType()
export class UpdateWorkspace {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => String, { nullable: true })
  public name?: string;

  @Field(() => UpdateForms, { nullable: true })
  public forms?: UpdateForms;
}

export const WorkspaceModel =
  typegoose.getModelForClass<typeof Workspace>(Workspace);
