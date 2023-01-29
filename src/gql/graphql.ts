/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

/** Condition type */
export enum ConditionType {
  Always = 'ALWAYS',
  Equal = 'EQUAL'
}

export type Form = {
  __typename?: 'Form';
  createdAt: Scalars['DateTime'];
  fields: Array<FormField>;
  id: Scalars['ID'];
  logic: Array<Logic>;
  name: Scalars['String'];
  rootField: FormField;
  updatedAt: Scalars['DateTime'];
  workspace: Workspace;
};

export type FormField = {
  __typename?: 'FormField';
  attachment?: Maybe<Scalars['String']>;
  form?: Maybe<Form>;
  id: Scalars['ID'];
  logic?: Maybe<Array<Logic>>;
  options?: Maybe<SearchOption>;
  placeholder?: Maybe<Scalars['String']>;
  question: Scalars['String'];
  required: Scalars['Boolean'];
  type: InputFieldType;
};

export type FormFieldInput = {
  form: Scalars['ID'];
  question: Scalars['String'];
  type: InputFieldType;
};

export type FormFieldUpdateInput = {
  attachment?: InputMaybe<Scalars['ID']>;
  placeholder?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<InputFieldType>;
};

/** Input field type */
export enum InputFieldType {
  Date = 'DATE',
  Dropdown = 'DROPDOWN',
  Number = 'NUMBER',
  Search = 'SEARCH',
  Textarea = 'TEXTAREA',
  Textinput = 'TEXTINPUT'
}

export type Logic = {
  __typename?: 'Logic';
  form: Form;
  id: Scalars['ID'];
  ref: FormField;
  to: FormField;
  type: ConditionType;
  value?: Maybe<Scalars['String']>;
};

export type LogicInput = {
  ref: Scalars['ID'];
  to: Scalars['ID'];
  type: ConditionType;
  value?: InputMaybe<Scalars['String']>;
};

export type LogicUpdateInput = {
  ref?: InputMaybe<Scalars['ID']>;
  to?: InputMaybe<Scalars['ID']>;
  type: ConditionType;
  value?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  createFormField: FormField;
  createLogic: Logic;
  createWorkspace: Workspace;
  deleteFormField: Scalars['Boolean'];
  deleteLogic: Scalars['Boolean'];
  deleteWorkspace: Scalars['Boolean'];
  updateFormField: FormField;
  updateLogic: Logic;
  updateWorkspace: Workspace;
};


export type MutationCreateFormArgs = {
  name: Scalars['String'];
  workspaceId: Scalars['String'];
};


export type MutationCreateFormFieldArgs = {
  data: FormFieldInput;
  formId: Scalars['String'];
};


export type MutationCreateLogicArgs = {
  data: LogicInput;
  formId: Scalars['String'];
};


export type MutationCreateWorkspaceArgs = {
  name: Scalars['String'];
};


export type MutationDeleteFormFieldArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLogicArgs = {
  id: Scalars['String'];
};


export type MutationDeleteWorkspaceArgs = {
  id: Scalars['String'];
};


export type MutationUpdateFormFieldArgs = {
  data: FormFieldUpdateInput;
  id: Scalars['String'];
};


export type MutationUpdateLogicArgs = {
  data: LogicUpdateInput;
  id: Scalars['String'];
};


export type MutationUpdateWorkspaceArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Forms: Array<Form>;
  Workspace: Workspace;
  Workspaces: Array<Workspace>;
  getForm: Form;
  getFormField: FormField;
};


export type QueryFormsArgs = {
  workspaceId: Scalars['String'];
};


export type QueryWorkspaceArgs = {
  id: Scalars['String'];
};


export type QueryGetFormArgs = {
  id: Scalars['String'];
};


export type QueryGetFormFieldArgs = {
  id: Scalars['String'];
};

export type SearchOption = {
  __typename?: 'SearchOption';
  field?: Maybe<Array<FormField>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Array<Scalars['String']>;
};

export type Workspace = {
  __typename?: 'Workspace';
  forms: Array<Form>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateFormMutationVariables = Exact<{
  workspaceId: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'Form', id: string } };

export type CreateWorkspaceMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateWorkspaceMutation = { __typename?: 'Mutation', createWorkspace: { __typename?: 'Workspace', id: string } };

export type DeleteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMutation = { __typename?: 'Mutation', deleteWorkspace: boolean };

export type WorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkspacesQuery = { __typename?: 'Query', Workspaces: Array<{ __typename?: 'Workspace', id: string, name: string }> };

export type UpdateWorkspaceMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateWorkspaceMutation = { __typename?: 'Mutation', updateWorkspace: { __typename?: 'Workspace', id: string } };

export type UpdateFieldMutationVariables = Exact<{
  id: Scalars['String'];
  input: FormFieldUpdateInput;
}>;


export type UpdateFieldMutation = { __typename?: 'Mutation', updateFormField: { __typename?: 'FormField', id: string, question: string, type: InputFieldType, required: boolean, attachment?: string | null } };

export type UpdateLogicMutationVariables = Exact<{
  id: Scalars['String'];
  input: LogicUpdateInput;
}>;


export type UpdateLogicMutation = { __typename?: 'Mutation', updateLogic: { __typename?: 'Logic', id: string } };

export type GetFormQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetFormQuery = { __typename?: 'Query', getForm: { __typename?: 'Form', id: string, name: string, rootField: { __typename?: 'FormField', id: string, question: string, type: InputFieldType, required: boolean, attachment?: string | null, logic?: Array<{ __typename?: 'Logic', id: string, type: ConditionType, value?: string | null, to: { __typename?: 'FormField', id: string } }> | null } } };

export type CreateFieldMutationVariables = Exact<{
  data: FormFieldInput;
  id: Scalars['String'];
}>;


export type CreateFieldMutation = { __typename?: 'Mutation', createFormField: { __typename?: 'FormField', id: string, question: string, type: InputFieldType, required: boolean } };

export type CreateLogicMutationVariables = Exact<{
  data: LogicInput;
  id: Scalars['String'];
}>;


export type CreateLogicMutation = { __typename?: 'Mutation', createLogic: { __typename?: 'Logic', id: string, type: ConditionType, value?: string | null, ref: { __typename?: 'FormField', id: string }, to: { __typename?: 'FormField', id: string } } };

export type DeleteFieldMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFieldMutation = { __typename?: 'Mutation', deleteFormField: boolean };

export type FieldsLogicsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FieldsLogicsQuery = { __typename?: 'Query', getForm: { __typename?: 'Form', fields: Array<{ __typename?: 'FormField', id: string, question: string, type: InputFieldType, placeholder?: string | null, required: boolean, attachment?: string | null, options?: { __typename?: 'SearchOption', id: string, name: string, value: Array<string> } | null }>, logic: Array<{ __typename?: 'Logic', id: string, type: ConditionType, value?: string | null, ref: { __typename?: 'FormField', id: string }, to: { __typename?: 'FormField', id: string } }> } };

export type WorkspaceQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type WorkspaceQuery = { __typename?: 'Query', Workspace: { __typename?: 'Workspace', id: string, name: string, forms: Array<{ __typename?: 'Form', id: string, name: string, createdAt: any, updatedAt: any }> } };


export const CreateFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateForm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workspaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workspaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workspaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFormMutation, CreateFormMutationVariables>;
export const CreateWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>;
export const DeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteMutation, DeleteMutationVariables>;
export const WorkspacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<WorkspacesQuery, WorkspacesQueryVariables>;
export const UpdateWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>;
export const UpdateFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FormFieldUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFormField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"attachment"}}]}}]}}]} as unknown as DocumentNode<UpdateFieldMutation, UpdateFieldMutationVariables>;
export const UpdateLogicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLogic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogicUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLogic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateLogicMutation, UpdateLogicMutationVariables>;
export const GetFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetForm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootField"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"attachment"}},{"kind":"Field","name":{"kind":"Name","value":"logic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFormQuery, GetFormQueryVariables>;
export const CreateFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FormFieldInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFormField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"formId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}}]}}]} as unknown as DocumentNode<CreateFieldMutation, CreateFieldMutationVariables>;
export const CreateLogicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLogic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogicInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLogic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"formId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ref"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLogicMutation, CreateLogicMutationVariables>;
export const DeleteFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFormField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFieldMutation, DeleteFieldMutationVariables>;
export const FieldsLogicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FieldsLogics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ref"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FieldsLogicsQuery, FieldsLogicsQueryVariables>;
export const WorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Workspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Workspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"forms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<WorkspaceQuery, WorkspaceQueryVariables>;