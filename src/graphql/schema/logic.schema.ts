import { ObjectType, Field, registerEnumType, InputType } from 'type-graphql';
import { GraphQLID } from 'graphql';
import { Form } from './form.schema';
import * as typeorm from 'typeorm';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { FormField } from './field.schema';

enum ConditionType {
  EQUAL = 'EQUAL',
  ALWAYS = 'ALWAYS',
}

registerEnumType(ConditionType, {
  name: 'ConditionType',
  description: 'Condition type',
});

@Entity()
@ObjectType()
export class Logic {
  @Field(() => GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => FormField)
  @ManyToOne(() => FormField, (field) => field.logic)
  public ref: typeorm.Relation<FormField>;

  @Field(() => ConditionType)
  @Column({ enum: ConditionType })
  public type!: ConditionType;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  public value?: string;

  @Field(() => FormField)
  @OneToOne(() => FormField)
  @JoinColumn()
  public to: typeorm.Relation<FormField>;

  @Field(() => Form)
  @ManyToOne(() => Form, (form) => form.logic, {
    onDelete: 'CASCADE',
  })
  public form: typeorm.Relation<Form>;
}

@InputType()
export class LogicInput {
  @Field(() => GraphQLID)
  public ref!: string;

  @Field(() => ConditionType)
  public type!: ConditionType;

  @Field(() => String, { nullable: true })
  public value?: string;

  @Field(() => GraphQLID)
  public to!: string;
}

@InputType()
export class LogicUpdateInput {
  @Field(() => GraphQLID, { nullable: true })
  public ref!: string;

  @Field(() => ConditionType)
  public type!: ConditionType;

  @Field(() => String, { nullable: true })
  public value?: string;

  @Field(() => GraphQLID, { nullable: true })
  public to!: string;
}
