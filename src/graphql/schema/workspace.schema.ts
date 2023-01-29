import { Field, InputType, ObjectType } from 'type-graphql';
import { GraphQLID } from 'graphql';
import { Form } from './form.schema';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Workspace {
  @Field(() => GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => String)
  @Column()
  public name!: string;

  @Field(() => [Form])
  @OneToMany(() => Form, (form) => form)
  public forms!: Form[];
}

// --------------- input schema ----------------

@InputType()
export class WorkspaceInput {
  @Field(() => String)
  public name!: string;
}

@InputType()
export class UpdateWorkspaceInput {
  @Field(() => String)
  public name!: string;
}
