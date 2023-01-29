import { ObjectType, Field, registerEnumType, InputType } from 'type-graphql';

@ObjectType()
export class UpdateStatus {
  @Field(() => String)
  message: string;

  @Field(() => Boolean)
  success: boolean;
}

enum UpdateOperationType {
  set = 'set',
  addToSet = 'addToSet',
}

registerEnumType(UpdateOperationType, {
  name: 'UpdateOperationType',
  description: 'Mongodb update operations',
});

@InputType()
export class UpdateOpration {
  @Field(() => UpdateOperationType)
  op: UpdateOperationType;
}

@ObjectType()
export class Error {
  @Field()
  message: string;

  @Field()
  code: number;
}
