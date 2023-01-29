import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Workspace } from '../schema/workspace.schema';
import { AppDataSource } from '@/utils/connectDB';
import { Form } from '../schema/form.schema';

@Resolver(Workspace)
export default class WorkspaceResolver {
  private workspaceRepository = AppDataSource.getRepository(Workspace);
  private formRepository = AppDataSource.getRepository(Form);

  @Query(() => [Workspace])
  async Workspaces() {
    const workspaces = await this.workspaceRepository.find();

    return workspaces;
  }

  @Query(() => Workspace)
  async Workspace(@Arg('id') id: string) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id,
      },
    });

    return workspace;
  }

  @FieldResolver()
  async forms(@Root() workspace: Workspace) {
    const forms = await this.formRepository.find({
      where: {
        workspace: {
          id: workspace.id,
        },
      },
    });

    return forms;
  }

  @Mutation(() => Workspace)
  async createWorkspace(@Arg('name') name: string) {
    const workspace = this.workspaceRepository.create({
      name,
    });

    await this.workspaceRepository.save(workspace);

    return workspace;
  }

  @Mutation(() => Workspace)
  async updateWorkspace(@Arg('id') id: string, @Arg('name') name: string) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    workspace.name = name;

    await this.workspaceRepository.save(workspace);

    return workspace;
  }

  @Mutation(() => Boolean)
  async deleteWorkspace(@Arg('id') id: string) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    await this.workspaceRepository.remove(workspace);

    return true;
  }
}
