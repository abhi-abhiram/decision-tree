import { Arg, Mutation, Resolver } from 'type-graphql';
import { Logic, LogicInput, LogicUpdateInput } from '../schema/logic.schema';
import { AppDataSource } from '@/utils/connectDB';
import { FormField } from '../schema/field.schema';

@Resolver(Logic)
export default class LogicResolver {
  private logicRepository = AppDataSource.getRepository(Logic);
  private formRepository = AppDataSource.getRepository(FormField);

  @Mutation(() => Logic)
  async createLogic(@Arg('data') input: LogicInput, @Arg('formId') id: string) {
    const logic = this.logicRepository.create({
      ...input,
      ref: { id: input.ref },
      to: { id: input.to },
      form: { id },
    });

    await this.logicRepository.save(logic);

    return logic;
  }

  @Mutation(() => Logic)
  async updateLogic(
    @Arg('data') input: LogicUpdateInput,
    @Arg('id') id: string
  ) {
    const logic = await this.logicRepository.findOne({
      where: {
        id,
      },
    });

    if (!logic) {
      return {
        error: {
          message: 'Logic not found',
        },
      };
    }

    if (input.ref) logic.ref.id = input.ref;
    if (input.to) logic.to.id = input.to;

    logic.type = input.type;
    logic.value = input.value;

    await this.logicRepository.save(logic);

    return logic;
  }

  @Mutation(() => Boolean)
  async deleteLogic(@Arg('id') id: string) {
    const logic = await this.logicRepository.findOne({
      where: {
        id,
      },
    });

    if (!logic) {
      return {
        error: {
          message: 'Logic not found',
        },
      };
    }

    await this.logicRepository.remove(logic);

    return true;
  }
}
