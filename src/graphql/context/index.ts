import type { NextApiRequest, NextApiResponse } from 'next';
import type Dataloader from 'dataloader';
import DataLoader from 'dataloader';

export interface GrapqhlContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

// export const loaders: GrapqhlContext['loaders'] = {
//   fieldChoice: new DataLoader<string, FieldChoice | undefined>(async (keys) => {
//     const choices = await FieldChoiceModel.find({
//       _id: keys,
//     });

//     const choiceMap: Record<string, FieldChoice> = {};
//     choices.forEach((choice) => {
//       choiceMap[choice._id] = choice;
//     });

//     return keys.map((key) => choiceMap[key]);
//   }),
// };
