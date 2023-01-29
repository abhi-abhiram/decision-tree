import { AppDataSource } from '@/utils/connectDB';
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { FormField } from '../schema/field.schema';
import { Form } from '../schema/form.schema';
import { Logic } from '../schema/logic.schema';

@Resolver(Form)
export default class FormResolver {
  private formRepository = AppDataSource.getRepository(Form);
  private fieldRepository = AppDataSource.getRepository(FormField);
  private logicRepository = AppDataSource.getRepository(Logic);

  @Query(() => Form)
  async getForm(@Arg('id') id: string) {
    const form = await this.formRepository.findOneBy({
      id,
    });

    return form;
  }

  @Query(() => [Form])
  async Forms(@Arg('workspaceId') workspaceId: string) {
    console.log('workspaceId', workspaceId);
    const form = await this.formRepository.find({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
    });

    return form;
  }

  @FieldResolver()
  async fields(@Root() form: Form) {
    const fields = await this.fieldRepository.find({
      where: {
        form: {
          id: form.id,
        },
      },
    });

    return fields;
  }

  @FieldResolver()
  async logic(@Root() form: Form) {
    const logic = await this.logicRepository.find({
      where: {
        form: {
          id: form.id,
        },
      },
      relations: ['ref', 'to'],
    });

    return logic;
  }

  @FieldResolver()
  async rootField(@Root() form: Form) {
    const field = await this.fieldRepository.findOneBy({
      id: form.rootField.id,
    });

    return field;
  }

  @Mutation(() => Form)
  async createForm(
    @Arg('name') name: string,
    @Arg('workspaceId') workspaceId: string
  ) {
    const form = this.formRepository.create({
      name,
      workspace: {
        id: workspaceId,
      },
    });

    await this.formRepository.save(form);

    return form;
  }
}
