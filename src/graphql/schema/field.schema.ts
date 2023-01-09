import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import * as typegoose from '@typegoose/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { GraphQLID } from 'graphql';

export enum InputFieldType {
  TEXTINPUT = 'TEXTINPUT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  DROPDOWN = 'DROPDOWN',
  TEXTAREA = 'TEXTAREA',
  SEARCH = 'SEARCH',
}

export enum AttachmentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

registerEnumType(InputFieldType, {
  name: 'InputFieldType',
  description: 'Input field type',
});

registerEnumType(AttachmentType, {
  name: 'AttachmentType',
  description: 'Attachment type',
});

@ObjectType()
@modelOptions({ schemaOptions: { _id: false } })
export class Attachment {
  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => String)
  @prop()
  public url!: string;

  @Field(() => AttachmentType)
  @prop({ enum: AttachmentType })
  public type!: AttachmentType;
}

@ObjectType()
@modelOptions({ schemaOptions: { _id: false } })
export class FieldProperties {
  @Field(() => String)
  @prop()
  public label?: string;

  @Field(() => String)
  @prop()
  public placeholder?: string;

  @Field(() => String)
  @prop()
  public description?: string;

  @Field(() => [FieldChoice])
  @prop({ ref: () => FieldChoice })
  public choices?: typegoose.Ref<FieldChoice>[];

  @Field(() => FormSearchOptions)
  @prop({ ref: () => FormSearchOptions })
  public searchOptions?: typegoose.Ref<FormSearchOptions>;

  @Field(() => Boolean)
  @prop()
  public required?: boolean;

  @Field(() => Attachment)
  @prop()
  public attachment?: Attachment;
}

@ObjectType()
export class FormField {
  @Field(() => GraphQLID)
  public id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => InputFieldType)
  @prop({ enum: InputFieldType })
  public type!: InputFieldType;

  @Field(() => FieldProperties)
  @prop()
  public properties?: FieldProperties;
}

@ObjectType()
export class FieldChoice {
  @Field(() => GraphQLID)
  public id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => String)
  @prop()
  public value!: string;
}

@ObjectType()
export class FormSearchOptions {
  @Field(() => GraphQLID)
  public id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => [FieldChoice])
  @prop({ ref: () => FieldChoice })
  public options?: typegoose.Ref<FieldChoice>[];
}

@InputType()
export class CreateFormSearchOptions {
  @Field(() => String)
  public name!: string;

  @Field(() => [CreateFieldChoice])
  public options?: CreateFieldChoice[];
}

@InputType()
export class CreateAttachment {
  @Field(() => String)
  public name!: string;

  @Field(() => String)
  public url!: string;

  @Field(() => AttachmentType)
  public type!: AttachmentType;
}

@InputType()
export class CreateFieldProperties {
  @Field(() => String)
  public label?: string;

  @Field(() => String)
  public placeholder?: string;

  @Field(() => String)
  public description?: string;

  @Field(() => [GraphQLID])
  public choices?: string[];

  @Field(() => GraphQLID, {
    nullable: true,
  })
  public searchOptions?: string;

  @Field(() => Boolean)
  public required?: boolean;

  @Field(() => CreateAttachment)
  public attachment?: CreateAttachment;
}

@InputType()
export class CreateFormField {
  @Field(() => String)
  public name!: string;

  @Field(() => InputFieldType)
  public type!: InputFieldType;

  @Field(() => CreateFieldProperties)
  public properties?: CreateFieldProperties;
}

@InputType()
export class CreateFieldChoice {
  @Field(() => String)
  public name!: string;

  @Field(() => String)
  public value!: string;
}
