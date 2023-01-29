/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation CreateForm($workspaceId: String!, $name: String!) {\n    createForm(workspaceId: $workspaceId, name: $name) {\n      id\n    }\n  }\n": types.CreateFormDocument,
    "\n  mutation CreateWorkspace($name: String!) {\n    createWorkspace(name: $name) {\n      id\n    }\n  }\n": types.CreateWorkspaceDocument,
    "\n  mutation Delete($id: String!) {\n    deleteWorkspace(id: $id)\n  }\n": types.DeleteDocument,
    "\n    query Workspaces {\n      Workspaces {\n        id\n        name\n      }\n    }\n  ": types.WorkspacesDocument,
    "\n  mutation UpdateWorkspace($id: String!, $name: String!) {\n    updateWorkspace(id: $id, name: $name) {\n      id\n    }\n  }\n": types.UpdateWorkspaceDocument,
    "\n  mutation UpdateField($id: String!, $input: FormFieldUpdateInput!) {\n    updateFormField(id: $id, data: $input) {\n      id\n      question\n      type\n      required\n      attachment\n    }\n  }\n": types.UpdateFieldDocument,
    "\n  mutation UpdateLogic($id: String!, $input: LogicUpdateInput!) {\n    updateLogic(id: $id, data: $input) {\n      id\n    }\n  }\n": types.UpdateLogicDocument,
    "\n  query GetForm($id: String!) {\n    getForm(id: $id) {\n      id\n      name\n      rootField {\n        id\n        question\n        type\n        required\n        attachment\n        logic {\n          id\n          type\n          value\n          to {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.GetFormDocument,
    "\n  mutation CreateField($data: FormFieldInput!, $id: String!) {\n    createFormField(data: $data, formId: $id) {\n      id\n      question\n      type\n      required\n    }\n  }\n": types.CreateFieldDocument,
    "\n  mutation CreateLogic($data: LogicInput!, $id: String!) {\n    createLogic(data: $data, formId: $id) {\n      id\n      ref {\n        id\n      }\n      type\n      value\n      to {\n        id\n      }\n    }\n  }\n": types.CreateLogicDocument,
    "\n  mutation DeleteField($id: String!) {\n    deleteFormField(id: $id)\n  }\n": types.DeleteFieldDocument,
    "\n  query FieldsLogics($id: String!) {\n    getForm(id: $id) {\n      fields {\n        id\n        question\n        type\n        placeholder\n        required\n        options {\n          id\n          name\n          value\n        }\n        attachment\n      }\n      logic {\n        id\n        ref {\n          id\n        }\n        type\n        value\n        to {\n          id\n        }\n      }\n    }\n  }\n": types.FieldsLogicsDocument,
    "\n  query Workspace($id: String!) {\n    Workspace(id: $id) {\n      id\n      name\n      forms {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.WorkspaceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateForm($workspaceId: String!, $name: String!) {\n    createForm(workspaceId: $workspaceId, name: $name) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateForm($workspaceId: String!, $name: String!) {\n    createForm(workspaceId: $workspaceId, name: $name) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWorkspace($name: String!) {\n    createWorkspace(name: $name) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWorkspace($name: String!) {\n    createWorkspace(name: $name) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Delete($id: String!) {\n    deleteWorkspace(id: $id)\n  }\n"): (typeof documents)["\n  mutation Delete($id: String!) {\n    deleteWorkspace(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Workspaces {\n      Workspaces {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query Workspaces {\n      Workspaces {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWorkspace($id: String!, $name: String!) {\n    updateWorkspace(id: $id, name: $name) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateWorkspace($id: String!, $name: String!) {\n    updateWorkspace(id: $id, name: $name) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateField($id: String!, $input: FormFieldUpdateInput!) {\n    updateFormField(id: $id, data: $input) {\n      id\n      question\n      type\n      required\n      attachment\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateField($id: String!, $input: FormFieldUpdateInput!) {\n    updateFormField(id: $id, data: $input) {\n      id\n      question\n      type\n      required\n      attachment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLogic($id: String!, $input: LogicUpdateInput!) {\n    updateLogic(id: $id, data: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateLogic($id: String!, $input: LogicUpdateInput!) {\n    updateLogic(id: $id, data: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetForm($id: String!) {\n    getForm(id: $id) {\n      id\n      name\n      rootField {\n        id\n        question\n        type\n        required\n        attachment\n        logic {\n          id\n          type\n          value\n          to {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetForm($id: String!) {\n    getForm(id: $id) {\n      id\n      name\n      rootField {\n        id\n        question\n        type\n        required\n        attachment\n        logic {\n          id\n          type\n          value\n          to {\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateField($data: FormFieldInput!, $id: String!) {\n    createFormField(data: $data, formId: $id) {\n      id\n      question\n      type\n      required\n    }\n  }\n"): (typeof documents)["\n  mutation CreateField($data: FormFieldInput!, $id: String!) {\n    createFormField(data: $data, formId: $id) {\n      id\n      question\n      type\n      required\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLogic($data: LogicInput!, $id: String!) {\n    createLogic(data: $data, formId: $id) {\n      id\n      ref {\n        id\n      }\n      type\n      value\n      to {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLogic($data: LogicInput!, $id: String!) {\n    createLogic(data: $data, formId: $id) {\n      id\n      ref {\n        id\n      }\n      type\n      value\n      to {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteField($id: String!) {\n    deleteFormField(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteField($id: String!) {\n    deleteFormField(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FieldsLogics($id: String!) {\n    getForm(id: $id) {\n      fields {\n        id\n        question\n        type\n        placeholder\n        required\n        options {\n          id\n          name\n          value\n        }\n        attachment\n      }\n      logic {\n        id\n        ref {\n          id\n        }\n        type\n        value\n        to {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FieldsLogics($id: String!) {\n    getForm(id: $id) {\n      fields {\n        id\n        question\n        type\n        placeholder\n        required\n        options {\n          id\n          name\n          value\n        }\n        attachment\n      }\n      logic {\n        id\n        ref {\n          id\n        }\n        type\n        value\n        to {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Workspace($id: String!) {\n    Workspace(id: $id) {\n      id\n      name\n      forms {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query Workspace($id: String!) {\n    Workspace(id: $id) {\n      id\n      name\n      forms {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;