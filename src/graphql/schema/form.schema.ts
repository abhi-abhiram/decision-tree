import { Field, InputType, ObjectType } from 'type-graphql';
import { GraphQLID } from 'graphql';
import { Logic } from './logic.schema';
import { FormField } from './field.schema';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import * as typeorm from 'typeorm';
import { Workspace } from './workspace.schema';

@Entity()
@ObjectType()
export class Form {
  @Field(() => GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => String)
  @Column()
  public name!: string;

  @Field(() => FormField)
  @OneToOne(() => FormField)
  public rootField!: typeorm.Relation<FormField>;

  @Field(() => [FormField])
  @OneToMany(() => FormField, (field) => field.form)
  public fields!: FormField[];

  @Field(() => [Logic])
  @OneToMany(() => Logic, (logic) => logic.form)
  public logic!: Logic[];

  @Field(() => Workspace)
  @ManyToOne(() => Workspace, (workspace) => workspace.forms, {
    onDelete: 'CASCADE',
  })
  public workspace!: Workspace;

  @Field(() => Date)
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @Field(() => Date)
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;
}

@InputType()
export class FormInput {
  @Field(() => String)
  public name!: string;
}

@InputType()
export class FormUpdateInput {
  @Field(() => String, { nullable: true })
  public name?: string;
}
