import type { NextApiRequest, NextApiResponse } from 'next';
import type Dataloader from 'dataloader';
import type { FieldChoice } from '../schema/field.schema';
import { FieldChoiceModel } from '../schema/field.schema';
import DataLoader from 'dataloader';

export interface GrapqhlContext {
  req: NextApiRequest;
  res: NextApiResponse;
  loaders: {
    fieldChoice: Dataloader<string, FieldChoice | undefined>;
  };
}

export const loaders: GrapqhlContext['loaders'] = {
  fieldChoice: new DataLoader<string, FieldChoice | undefined>(async (keys) => {
    const choices = await FieldChoiceModel.find({
      _id: keys,
    });

    const choiceMap: Record<string, FieldChoice> = {};
    choices.forEach((choice) => {
      choiceMap[choice._id] = choice;
    });

    return keys.map((key) => choiceMap[key]);
  }),
};
