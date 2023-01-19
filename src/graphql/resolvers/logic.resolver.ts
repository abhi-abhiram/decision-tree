import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateLogic,
  FormModel,
  Logic,
  LogicModel,
} from '../schema/form.schema';

@Resolver(Logic)
export default class LogicResolver {
  @Query(() => Logic)
  async Logic(@Arg('id') id: string) {
    const Logic = await LogicModel.findById(id)
      .lean()
      .populate(['ref', 'conditions.to']);

    return Logic;
  }

  @Mutation(() => Logic)
  async createLogic(
    @Arg('data') input: CreateLogic,
    @Arg('formId') id: string
  ) {
    const Logic = await (
      await LogicModel.create(input)
    ).populate(['ref', 'conditions.to']);
    await FormModel.findByIdAndUpdate(id, {
      $addToSet: {
        logic: [Logic._id],
      },
    });

    return Logic.toObject();
  }
}
