import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import * as typegoose from '@typegoose/typegoose';
import {
  getModelForClass,
  Index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
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
  @Field(() => String, { nullable: true })
  @prop()
  public label?: string;

  @Field(() => String, { nullable: true })
  @prop()
  public placeholder?: string;

  @Field(() => String, { nullable: true })
  @prop()
  public description?: string;

  @Field(() => [FieldChoice], { nullable: true })
  @prop({ ref: () => FieldChoice })
  public choices?: typegoose.Ref<FieldChoice>[];

  @Field(() => FormSearchOptions, { nullable: true })
  @prop({ ref: () => FormSearchOptions })
  public searchOptions?: typegoose.Ref<FormSearchOptions>;

  @Field(() => Boolean)
  @prop({ default: true })
  public required?: boolean;

  @Field(() => Attachment, { nullable: true })
  @prop()
  public attachment?: Attachment;
}

@ObjectType()
export class FormField {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => InputFieldType)
  @prop({ enum: InputFieldType })
  public type!: InputFieldType;

  @Field(() => FieldProperties)
  @prop()
  public properties: FieldProperties;
}

@ObjectType()
export class FieldChoice {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => String)
  @prop()
  public value!: string;
}

@ObjectType()
export class SearchOption {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => String)
  @prop()
  public value!: string;
}

@ObjectType()
@Index({ _id: 1, 'option.value': 1 }, { unique: true })
export class FormSearchOptions {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => String)
  @prop()
  public name!: string;

  @Field(() => [SearchOption])
  @prop({ type: () => [SearchOption] })
  public options!: SearchOption[];
}

export const FormFieldModel = getModelForClass<typeof FormField>(FormField);
export const FieldChoiceModel =
  getModelForClass<typeof FieldChoice>(FieldChoice);
export const FormSearchOptionsModel =
  getModelForClass<typeof FormSearchOptions>(FormSearchOptions);

/* -------- input schema --------- */

@InputType()
export class CreateFormSearchOptions {
  @Field(() => String)
  public name!: string;

  @Field(() => [CreateOptions])
  public options: CreateOptions[];
}

@InputType()
export class CreateOptions {
  @Field(() => String)
  public name: string;

  @Field(() => String)
  public value: string;
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
  @Field(() => String, { nullable: true })
  public label?: string;

  @Field(() => String, { nullable: true })
  public placeholder?: string;

  @Field(() => String, { nullable: true })
  public description?: string;

  @Field(() => [GraphQLID], { nullable: true })
  public choices?: string[];

  @Field(() => GraphQLID, {
    nullable: true,
  })
  public searchOptions?: string;

  @Field(() => Boolean, { nullable: true })
  public required?: boolean;

  @Field(() => CreateAttachment, { nullable: true })
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

/* ----------- update schema ------------ */

@InputType()
export class UpdateAttachment {
  @Field(() => String, { nullable: true })
  public name: string;

  @Field(() => String, { nullable: true })
  public url: string;

  @Field(() => AttachmentType, { nullable: true })
  public type: AttachmentType;
}

@InputType()
export class UpdateFieldProps {
  @Field(() => String, { nullable: true })
  public label: string;

  @Field(() => String, { nullable: true })
  public placeholder: string;

  @Field(() => String, { nullable: true })
  public description: string;

  @Field(() => [GraphQLID], { nullable: true })
  public choices: string[];

  @Field(() => GraphQLID, {
    nullable: true,
  })
  public searchOptions?: string;

  @Field(() => Boolean, { nullable: true })
  public required?: boolean;

  @Field(() => UpdateAttachment, { nullable: true })
  public attachment?: UpdateAttachment;
}

@InputType()
export class UpdateFormField {
  @Field(() => GraphQLID)
  public _id: string;

  @Field(() => String, { nullable: true })
  public name!: string;

  @Field(() => InputFieldType, { nullable: true })
  public type!: InputFieldType;

  @Field(() => UpdateFieldProps, { nullable: true })
  public properties: UpdateFieldProps;
}

@ObjectType()
export class UpdateResponse {
  @Field(() => Boolean)
  public status: boolean;

  @Field(() => String)
  public message: string;
}
