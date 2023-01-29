import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
  FormFieldInput,
  FormField,
  FormFieldUpdateInput,
} from '../schema/field.schema';

import { AppDataSource } from '@/utils/connectDB';
import { Form } from '../schema/form.schema';

@Resolver(() => FormField)
export default class FormFieldResolver {
  private fieldRepository = AppDataSource.getRepository(FormField);
  private formRepository = AppDataSource.getRepository(Form);

  @Query(() => FormField)
  async getFormField(@Arg('id') id: string) {
    const field = await this.fieldRepository.findOneBy({
      id,
    });

    return field;
  }

  @Mutation(() => FormField)
  async createFormField(
    @Arg('data') input: FormFieldInput,
    @Arg('formId') id: string
  ) {
    const field = this.fieldRepository.create({
      ...input,
      form: {
        id,
      },
    });

    await this.fieldRepository.save(field);

    const form = await this.formRepository.findOneBy({
      id,
    });

    if (!form?.rootField) {
      await this.formRepository.update(id, {
        rootField: {
          id: field.id,
        },
      });
    }

    return field;
  }

  @Mutation(() => FormField)
  async updateFormField(
    @Arg('id') id: string,
    @Arg('data') input: FormFieldUpdateInput
  ) {
    const field = await this.fieldRepository.findOneBy({
      id,
    });

    if (!field) {
      throw new Error('Field not found');
    }

    const updatedField = this.fieldRepository.merge(field, {
      ...input,
    });

    await this.fieldRepository.save(updatedField).catch((err) => {
      console.log(err);
    });

    return updatedField;
  }

  @Mutation(() => Boolean)
  async deleteFormField(@Arg('id') id: string) {
    await this.fieldRepository.delete(id);
    return true;
  }
}
