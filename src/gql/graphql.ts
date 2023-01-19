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

export type Attachment = {
  __typename?: 'Attachment';
  name: Scalars['String'];
  type: AttachmentType;
  url: Scalars['String'];
};

/** Attachment type */
export enum AttachmentType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type Condition = {
  __typename?: 'Condition';
  _id: Scalars['ID'];
  choice?: Maybe<FieldChoice>;
  to: FormField;
  type: ConditionType;
};

/** Condition type */
export enum ConditionType {
  Always = 'ALWAYS',
  Equal = 'EQUAL'
}

export type CreateAttachment = {
  name: Scalars['String'];
  type: AttachmentType;
  url: Scalars['String'];
};

export type CreateCondition = {
  choice?: InputMaybe<Scalars['ID']>;
  to: Scalars['ID'];
  type: ConditionType;
};

export type CreateFieldChoice = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CreateFieldProperties = {
  attachment?: InputMaybe<CreateAttachment>;
  choices?: InputMaybe<Array<Scalars['ID']>>;
  description?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  placeholder?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['Boolean']>;
  searchOptions?: InputMaybe<Scalars['ID']>;
};

export type CreateForm = {
  fields?: InputMaybe<Array<Scalars['ID']>>;
  logic?: InputMaybe<Array<Scalars['ID']>>;
  name: Scalars['String'];
};

export type CreateFormField = {
  name: Scalars['String'];
  properties: CreateFieldProperties;
  type: InputFieldType;
};

export type CreateFormSearchOptions = {
  name: Scalars['String'];
  options: Array<CreateOptions>;
};

export type CreateLogic = {
  conditions: Array<CreateCondition>;
  ref: Scalars['ID'];
};

export type CreateOptions = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CreateWorkspace = {
  name: Scalars['String'];
};

export type FieldChoice = {
  __typename?: 'FieldChoice';
  _id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type FieldProperties = {
  __typename?: 'FieldProperties';
  attachment?: Maybe<Attachment>;
  choices?: Maybe<Array<FieldChoice>>;
  description?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  placeholder: Scalars['String'];
  required: Scalars['Boolean'];
  searchOptions?: Maybe<FormSearchOptions>;
};

export type Form = {
  __typename?: 'Form';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  fields: Array<FormField>;
  logic: Array<Logic>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FormField = {
  __typename?: 'FormField';
  _id: Scalars['ID'];
  name: Scalars['String'];
  properties: FieldProperties;
  type: InputFieldType;
};

export type FormSearchOptions = {
  __typename?: 'FormSearchOptions';
  _id: Scalars['ID'];
  name: Scalars['String'];
  options: Array<SearchOption>;
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
  _id: Scalars['ID'];
  conditions: Array<Condition>;
  ref: FormField;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFieldChoice: FieldChoice;
  createForm: Form;
  createFormField: FormField;
  createLogic: Logic;
  createSearchOptions: FormSearchOptions;
  createWorkspace: Workspace;
  deleteField: UpdateStatus;
  deleteWorkspace: UpdateStatus;
  updateFieldChoice: FieldChoice;
  updateForm: UpdateStatus;
  updateFormField: UpdateResponse;
  updateSearchOptions: FormSearchOptions;
  updateWorkspace: UpdateStatus;
};


export type MutationCreateFieldChoiceArgs = {
  data: CreateFieldChoice;
};


export type MutationCreateFormArgs = {
  data: CreateForm;
  workspaceId: Scalars['String'];
};


export type MutationCreateFormFieldArgs = {
  data: CreateFormField;
  formId: Scalars['String'];
};


export type MutationCreateLogicArgs = {
  data: CreateLogic;
  formId: Scalars['String'];
};


export type MutationCreateSearchOptionsArgs = {
  data: CreateFormSearchOptions;
};


export type MutationCreateWorkspaceArgs = {
  data: CreateWorkspace;
};


export type MutationDeleteFieldArgs = {
  fieldId: Scalars['String'];
};


export type MutationDeleteWorkspaceArgs = {
  id: Scalars['String'];
};


export type MutationUpdateFieldChoiceArgs = {
  data: CreateFieldChoice;
  id: Scalars['String'];
};


export type MutationUpdateFormArgs = {
  data: UpdateForm;
};


export type MutationUpdateFormFieldArgs = {
  data: UpdateFormField;
};


export type MutationUpdateSearchOptionsArgs = {
  data: CreateFormSearchOptions;
  id: Scalars['String'];
};


export type MutationUpdateWorkspaceArgs = {
  data: UpdateWorkspace;
};

export type Query = {
  __typename?: 'Query';
  Form: Form;
  FormField: FormField;
  Forms: Array<Form>;
  Logic: Logic;
  Workspace: Workspace;
  Workspaces: Array<Workspace>;
};


export type QueryFormArgs = {
  id: Scalars['String'];
};


export type QueryFormFieldArgs = {
  id: Scalars['String'];
};


export type QueryLogicArgs = {
  id: Scalars['String'];
};


export type QueryWorkspaceArgs = {
  id: Scalars['String'];
};

export type SearchOption = {
  __typename?: 'SearchOption';
  _id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type UpdateAttachment = {
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AttachmentType>;
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateFieldProps = {
  attachment?: InputMaybe<UpdateAttachment>;
  choices?: InputMaybe<Array<Scalars['ID']>>;
  description?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  placeholder?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['Boolean']>;
  searchOptions?: InputMaybe<Scalars['ID']>;
};

export type UpdateFields = {
  fields: Array<Scalars['ID']>;
  op: UpdateOperationType;
};

export type UpdateForm = {
  _id: Scalars['ID'];
  fields?: InputMaybe<UpdateFields>;
  logic?: InputMaybe<UpdateLogics>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateFormField = {
  _id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<UpdateFieldProps>;
  type?: InputMaybe<InputFieldType>;
};

export type UpdateForms = {
  formIds: Array<Scalars['ID']>;
  op: UpdateOperationType;
};

export type UpdateLogics = {
  logic: Array<Scalars['ID']>;
  op: UpdateOperationType;
};

/** Mongodb update operations */
export enum UpdateOperationType {
  AddToSet = 'addToSet',
  Set = 'set'
}

export type UpdateResponse = {
  __typename?: 'UpdateResponse';
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type UpdateStatus = {
  __typename?: 'UpdateStatus';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UpdateWorkspace = {
  _id: Scalars['ID'];
  forms?: InputMaybe<UpdateForms>;
  name?: InputMaybe<Scalars['String']>;
};

export type Workspace = {
  __typename?: 'Workspace';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  forms: Array<Form>;
  name: Scalars['String'];
};

export type CreateFormMutationVariables = Exact<{
  workspaceId: Scalars['String'];
  data: CreateForm;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'Form', _id: string } };

export type MutationMutationVariables = Exact<{
  data: CreateWorkspace;
}>;


export type MutationMutation = { __typename?: 'Mutation', createWorkspace: { __typename?: 'Workspace', _id: string } };

export type DeleteFieldMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type DeleteFieldMutation = { __typename?: 'Mutation', deleteField: { __typename?: 'UpdateStatus', success: boolean } };

export type DeleteMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type DeleteMutation = { __typename?: 'Mutation', deleteWorkspace: { __typename?: 'UpdateStatus', success: boolean } };

export type WorkspaceQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkspaceQuery = { __typename?: 'Query', Workspaces: Array<{ __typename?: 'Workspace', _id: string, name: string }> };

export type RenameMutationVariables = Exact<{
  data: UpdateWorkspace;
}>;


export type RenameMutation = { __typename?: 'Mutation', updateWorkspace: { __typename?: 'UpdateStatus', success: boolean } };

export type CreateFieldMutationVariables = Exact<{
  data: CreateFormField;
  id: Scalars['String'];
}>;


export type CreateFieldMutation = { __typename?: 'Mutation', createFormField: { __typename?: 'FormField', _id: string, name: string, type: InputFieldType, properties: { __typename?: 'FieldProperties', label: string, placeholder: string, required: boolean } } };

export type CreateLogicMutationVariables = Exact<{
  data: CreateLogic;
  formId: Scalars['String'];
}>;


export type CreateLogicMutation = { __typename?: 'Mutation', createLogic: { __typename: 'Logic', _id: string, ref: { __typename: 'FormField', _id: string, name: string }, conditions: Array<{ __typename: 'Condition', _id: string, type: ConditionType, to: { __typename: 'FormField', _id: string, name: string, type: InputFieldType } }> } };

export type FieldsLogicsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FieldsLogicsQuery = { __typename?: 'Query', Form: { __typename?: 'Form', fields: Array<{ __typename?: 'FormField', _id: string, name: string, type: InputFieldType, properties: { __typename?: 'FieldProperties', label: string, placeholder: string, description?: string | null, required: boolean, choices?: Array<{ __typename?: 'FieldChoice', _id: string, name: string, value: string }> | null, attachment?: { __typename?: 'Attachment', name: string, url: string, type: AttachmentType } | null, searchOptions?: { __typename?: 'FormSearchOptions', _id: string, name: string, options: Array<{ __typename?: 'SearchOption', _id: string, name: string, value: string }> } | null } }>, logic: Array<{ __typename?: 'Logic', _id: string, ref: { __typename?: 'FormField', _id: string }, conditions: Array<{ __typename?: 'Condition', _id: string, type: ConditionType, choice?: { __typename?: 'FieldChoice', _id: string, name: string, value: string } | null, to: { __typename?: 'FormField', _id: string } }> }> } };

export type FormsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FormsQuery = { __typename?: 'Query', Workspace: { __typename?: 'Workspace', _id: string, name: string, forms: Array<{ __typename?: 'Form', _id: string, name: string, createdAt: any, updatedAt: any }> } };


export const CreateFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateForm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workspaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateForm"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workspaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workspaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateFormMutation, CreateFormMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkspace"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const DeleteFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fieldId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteFieldMutation, DeleteFieldMutationVariables>;
export const DeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteMutation, DeleteMutationVariables>;
export const WorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Workspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<WorkspaceQuery, WorkspaceQueryVariables>;
export const RenameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Rename"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkspace"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RenameMutation, RenameMutationVariables>;
export const CreateFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFormField"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFormField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"formId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}}]}}]}}]} as unknown as DocumentNode<CreateFieldMutation, CreateFieldMutationVariables>;
export const CreateLogicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLogic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLogic"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"formId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLogic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"formId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"formId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"ref"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<CreateLogicMutation, CreateLogicMutationVariables>;
export const FieldsLogicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FieldsLogics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Form"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"choices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"logic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"ref"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"choice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<FieldsLogicsQuery, FieldsLogicsQueryVariables>;
export const FormsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Forms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Workspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"forms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FormsQuery, FormsQueryVariables>;