import type { ReturnModelType } from "@typegoose/typegoose";
import { getModelForClass } from "@typegoose/typegoose";
import * as graphql from "graphql";
import {
  Arg,
  FieldResolver,
  Info,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Node, CreateNodeInput } from "../schema/node.schema";
import graphqlFields from "graphql-fields";

@Resolver((of) => Node)
export default class NodeResolver {
  private NodeModel: ReturnModelType<typeof Node>;
  constructor() {
    this.NodeModel = getModelForClass(Node);
  }

  @Query(() => [Node])
  async nodes(@Info() info: graphql.GraphQLResolveInfo): Promise<Node[]> {
    const selection = graphqlFields(info);
    let populate = "";
    if (
      selection.nextNode &&
      Object.keys(selection.answers.nextNode).length > 0
    ) {
      populate += "answers.nextNode";
    }

    if (selection.nextNode && Object.keys(selection.nextNodes).length > 0) {
      populate += " nextNodes";
    }

    if (populate) {
      return this.NodeModel.find().populate(populate);
    }

    return this.NodeModel.find();
  }

  @FieldResolver()
  async nextNodes(
    @Info() info: graphql.GraphQLResolveInfo,
    @Root("_doc") node: Node
  ) {
    const selection = graphqlFields(info);
    let populate = "";

    if (selection.nextNodes && Object.keys(selection.nextNodes).length > 0) {
      populate = "nextNodes";
    }

    if (populate) {
      return this.NodeModel.findById(node.id).populate(populate);
    }

    return node.nextNodes?.map((node) => ({
      id: node.toString(),
    }));
  }

  @Mutation(() => Node)
  async createNode(@Arg("node") node: CreateNodeInput): Promise<Node> {
    const newNode = new this.NodeModel(node);

    return newNode.save();
  }
}
