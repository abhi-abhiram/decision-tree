import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UpdateStatus } from '../schema/common';
import {
  CreateWorkspace,
  UpdateWorkspace,
  Workspace,
  WorkspaceModel,
} from '../schema/workspace.schema';

@Resolver(Workspace)
export default class WorkspaceResolver {
  @Query(() => Workspace)
  async Workspace(@Arg('id') id: string) {
    const Workspace = await WorkspaceModel.findById(id)
      .lean()
      .populate('forms');
    return Workspace;
  }

  @Query(() => [Workspace])
  async Workspaces() {
    const Workspaces = await WorkspaceModel.find({}).lean();

    return Workspaces;
  }

  @Mutation(() => Workspace)
  async createWorkspace(@Arg('data') input: CreateWorkspace) {
    const Workspace = await WorkspaceModel.create(input);

    return Workspace;
  }

  @Mutation(() => UpdateStatus)
  async updateWorkspace(
    @Arg('data') input: UpdateWorkspace
  ): Promise<UpdateStatus> {
    const { forms } = input;
    delete input.forms;

    const form = await WorkspaceModel.updateOne(
      { _id: input._id },
      {
        ...input,
        [`$${forms?.op}`]: {
          forms: forms?.formIds,
        },
      }
    );

    return {
      message: 'success',
      success: true,
    };
  }

  @Mutation(() => UpdateStatus)
  async deleteWorkspace(@Arg('id') id: string): Promise<UpdateStatus> {
    const result = await WorkspaceModel.deleteOne({ _id: id });

    return {
      message: 'Success',
      success: true,
    };
  }
}
