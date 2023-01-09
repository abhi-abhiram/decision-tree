import type { ReturnModelType } from '@typegoose/typegoose';
import { getModelForClass } from '@typegoose/typegoose';
import * as graphql from 'graphql';
import { Arg, Info, Mutation, Query, Resolver } from 'type-graphql';
import { CreateForm, Form } from '../schema/form.schema';
import graphqlFields from 'graphql-fields';

@Resolver(Form)
export default class FormResolver {
  private FormModel: ReturnModelType<typeof Form>;
  constructor() {
    this.FormModel = getModelForClass(Form);
  }

  @Query(() => [Form])
  async Forms(@Info() info: graphql.GraphQLResolveInfo): Promise<Form[]> {
    const selection = graphqlFields(info);
    let populate = '';
    if (
      selection.nextForm &&
      Object.keys(selection.answers.nextForm).length > 0
    ) {
      populate += 'answers.nextForm';
    }

    if (selection.nextForm && Object.keys(selection.nextForms).length > 0) {
      populate += ' nextForms';
    }

    if (populate) {
      return this.FormModel.find().populate(populate);
    }

    return this.FormModel.find();
  }

  // @Mutation(() => Form)
  // async CreateForm(@Arg('data') input: CreateForm): Promise<Form> {}

  //   @FieldResolver()
  //   async nextNodes(
  //     @Info() info: graphql.GraphQLResolveInfo,
  //     @Root("_doc") node: Node
  //   ) {
  //     const selection = graphqlFields(info);
  //     let populate = "";

  //     if (selection.nextNodes && Object.keys(selection.nextNodes).length > 0) {
  //       populate = "nextNodes";
  //     }

  //     if (populate) {
  //       return this.NodeModel.findById(node.id).populate(populate);
  //     }

  //     return node.nextNodes?.map((node) => ({
  //       id: node.toString(),
  //     }));
  //   }

  //   @Mutation(() => Node)
  //   async createNode(@Arg("node") node: CreateNodeInput): Promise<Node> {
  //     const newNode = new this.NodeModel(node);

  //     return newNode.save();
  //   }
}
