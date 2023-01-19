import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UpdateStatus } from '../schema/common';
import { CreateForm, Form, FormModel, UpdateForm } from '../schema/form.schema';
import { WorkspaceModel } from '../schema/workspace.schema';

@Resolver(Form)
export default class FormResolver {
  @Query(() => [Form])
  async Forms() {
    const form = await FormModel.find({}).lean();

    return form;
  }

  @Query(() => Form)
  async Form(@Arg('id') id: string) {
    const form = await FormModel.findById(id)
      .lean()
      .populate(['fields', 'logic']);
    return form;
  }

  @Mutation(() => Form)
  async createForm(
    @Arg('data') input: CreateForm,
    @Arg('workspaceId') workspaceId: string
  ) {
    const form = await FormModel.create(input);

    const result = await WorkspaceModel.updateOne(
      { _id: workspaceId },
      {
        $addToSet: {
          forms: [form._id],
        },
      }
    );

    return form;
  }

  @Mutation(() => UpdateStatus)
  async updateForm(@Arg('data') input: UpdateForm): Promise<UpdateStatus> {
    const { fields, logic } = input;

    delete input.fields;
    delete input.logic;

    const form = await FormModel.updateOne(
      { _id: input._id },
      {
        $set: input.name
          ? {
              name: input.name,
            }
          : {},
        [`$${fields?.op}`]: {
          fields: fields?.fields,
        },
        [`$${logic?.op}`]: {
          logic: logic?.logic,
        },
      }
    );

    return {
      message: 'Success',
      success: true,
    };
  }
}
