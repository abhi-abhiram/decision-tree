import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import { GraphQLID } from 'graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Form } from './form.schema';
import { Logic } from './logic.schema';

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

@Entity()
@ObjectType()
export class SearchOption {
  @Field(() => GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => String)
  @Column()
  public name!: string;

  @Field(() => [String])
  @Column('simple-array')
  public value!: string[];

  @Field(() => [FormField], { nullable: true })
  @OneToMany(() => FormField, (field) => field)
  public field!: FormField[];
}

@Entity()
@ObjectType()
export class FormField {
  @Field(() => GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => String)
  @Column()
  public question!: string;

  @Field(() => InputFieldType)
  @Column({ enum: InputFieldType })
  public type!: InputFieldType;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  public placeholder?: string;

  @Field(() => Boolean)
  @Column({
    default: true,
  })
  public required!: boolean;

  @Field(() => SearchOption, { nullable: true })
  @ManyToOne(() => SearchOption, (option) => option)
  public options?: SearchOption;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  public attachment?: string;

  @Field(() => Form, { nullable: true })
  @ManyToOne(() => Form, (form) => form.fields, {
    onDelete: 'CASCADE',
  })
  public form: Form;

  @Field(() => [Logic], { nullable: true })
  @OneToMany(() => Logic, (logic) => logic.ref)
  public logic: Logic[];
}

/* -------- input schema --------- */

@InputType()
export class FormFieldInput {
  @Field(() => String)
  public question!: string;

  @Field(() => InputFieldType)
  public type!: InputFieldType;

  @Field(() => GraphQLID)
  public form: string;
}

@InputType()
export class SearchOptionInput {
  @Field(() => String)
  public name!: string;

  @Field(() => String)
  public value!: string;
}

@InputType()
export class AttachmentInput {
  @Field(() => String)
  public name!: string;

  @Field(() => String)
  public url!: string;

  @Field(() => AttachmentType)
  public type!: AttachmentType;
}

/* ----------- update schema ------------ */

@InputType()
export class FormFieldUpdateInput {
  @Field(() => String, { nullable: true })
  public question?: string;

  @Field(() => InputFieldType, { nullable: true })
  public type?: InputFieldType;

  @Field(() => String, { nullable: true })
  public placeholder?: string;

  @Field(() => Boolean, { nullable: true })
  public required?: boolean;

  @Field(() => GraphQLID, { nullable: true })
  public attachment?: string;
}
