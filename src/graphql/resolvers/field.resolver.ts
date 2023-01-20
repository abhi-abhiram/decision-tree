import { flattenObject } from '@/utils/getKeys';
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { UpdateStatus } from '../schema/common';
import {
  CreateFormField,
  FormField,
  FieldChoice,
  CreateFieldChoice,
  FormSearchOptions,
  CreateFormSearchOptions,
  FieldChoiceModel,
  FormFieldModel,
  FormSearchOptionsModel,
  FieldProperties,
  UpdateFormField,
  UpdateResponse,
} from '../schema/field.schema';
import { FormModel } from '../schema/form.schema';

@Resolver((of) => FieldProperties)
export class FieldPropertiesResolver {
  // @FieldResolver(() => [FieldChoice])
  // async choices(@Root() fieldProps: FieldProperties): Promise<FieldChoice[]> {
  //   const choices = await FieldChoiceModel.find({
  //     _id: { $in: fieldProps.choices },
  //   });
  //   return choices;
  // }
}

export class SearchOptionsResolver {}

@Resolver((of) => FormField)
export default class FormFieldResolver {
  @Query(() => FormField)
  async FormField(@Arg('id') id: string) {
    const field = await FormFieldModel.findById(id).lean();
    return field;
  }

  @Mutation(() => FormField)
  async createFormField(
    @Arg('data') input: CreateFormField,
    @Arg('formId') formId: string
  ): Promise<FormField> {
    const field = await FormFieldModel.create(input);
    const result = await FormModel.findByIdAndUpdate(formId, {
      $addToSet: {
        fields: [`${field._id}`],
      },
    });

    return field.toObject();
  }

  @Mutation(() => FieldChoice)
  async createFieldChoice(
    @Arg('data') input: CreateFieldChoice
  ): Promise<FieldChoice> {
    const choice = await FieldChoiceModel.create(input);
    await choice.save();
    return choice;
  }

  @Mutation(() => FormSearchOptions)
  async createSearchOptions(
    @Arg('data') input: CreateFormSearchOptions
  ): Promise<FormSearchOptions> {
    const options = await FormSearchOptionsModel.create(input);
    return options;
  }

  @Mutation(() => UpdateResponse)
  async updateFormField(
    @Arg('data') input: UpdateFormField
  ): Promise<UpdateResponse> {
    const obj: Record<string, any> = {};

    flattenObject(input).forEach((val) => {
      const key = Object.keys(val)[0];

      if (typeof key === 'string') {
        obj[key] = val[key];
      }
    });

    delete obj._id;
    delete obj.id;

    await FormFieldModel.findByIdAndUpdate(input._id, {
      $set: obj,
    });

    return {
      status: true,
      message: 'success',
    };
  }

  @Mutation(() => UpdateStatus)
  async deleteField(@Arg('fieldId') id: string): Promise<UpdateStatus> {
    const deleteField = await FormFieldModel.deleteOne({ _id: id });

    await FormModel.updateMany(
      {},
      {
        $pull: {
          fields: {
            $in: [`${id}`],
          },
        },
      }
    );

    return {
      message: 'success',
      success: true,
    };
  }

  @Mutation(() => FieldChoice)
  async updateFieldChoice(
    @Arg('data') input: CreateFieldChoice,
    @Arg('id') id: string
  ) {
    const choice = await FieldChoiceModel.findByIdAndUpdate(id, input);
    return choice;
  }

  @Mutation(() => FormSearchOptions)
  async updateSearchOptions(
    @Arg('data') input: CreateFormSearchOptions,
    @Arg('id') id: string
  ) {
    const search = await FormSearchOptionsModel.findByIdAndUpdate(id, {
      $set: {
        name: input.name,
      },
      $addToSet: {
        options: input.options,
      },
    });

    return search;
  }

  @FieldResolver(() => FieldProperties)
  async properties(@Root() field: FormField): Promise<FieldProperties> {
    if (field.properties.searchOptions) {
      const search = await FormSearchOptionsModel.findById(
        field.properties.searchOptions
      );

      if (search) {
        field.properties.searchOptions = search;
      }
    }

    const choices = await FieldChoiceModel.find({
      _id: { $in: field.properties.choices },
    });

    field.properties.choices = choices;

    return field.properties;
  }
}
