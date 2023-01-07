import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import * as typegoose from "@typegoose/typegoose";
import { modelOptions } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose";
import { GraphQLID } from "graphql";

export enum InputFieldType {
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
  SELECT = "SELECT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  DATE = "DATE",
  SEARCH = "SEARCH",
}

@ObjectType()
@modelOptions({ schemaOptions: { _id: false } })
export class Answer {
  @Field(() => String)
  @prop()
  public answer!: string;

  @Field(() => Node)
  @prop({ ref: () => Node })
  public nextNode!: typegoose.Ref<Node>;
}

registerEnumType(InputFieldType, {
  name: "InputFieldType",
  description: "Input field type",
});

@ObjectType()
export class Node {
  @Field(() => GraphQLID)
  public id: string;

  @Field(() => String)
  @prop()
  public question!: string;

  @Field(() => InputFieldType)
  @prop()
  public inputFieldType!: InputFieldType;

  @Field(() => [Answer])
  @prop({ type: () => [Answer] })
  public answers?: Answer[];

  @Field(() => [Node])
  @prop({ ref: () => Node })
  public nextNodes?: typegoose.Ref<Node>[];
}

@InputType()
export class CreateAnswerInput {
  @Field(() => String)
  public answer: string;

  @Field(() => GraphQLID)
  public nextNode: string;
}

@InputType()
export class CreateNodeInput {
  @Field(() => String)
  public question!: string;

  @Field(() => InputFieldType)
  public inputFieldType!: InputFieldType;

  @Field(() => [CreateAnswerInput])
  public answers?: CreateAnswerInput[];

  @Field(() => [GraphQLID])
  public nextNodes?: string[];
}
