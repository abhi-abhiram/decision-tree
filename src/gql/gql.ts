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
    "\n  mutation CreateForm($workspaceId: String!, $data: CreateForm!) {\n    createForm(workspaceId: $workspaceId, data: $data) {\n      _id\n    }\n  }\n": types.CreateFormDocument,
    "\n  mutation Mutation($data: CreateWorkspace!) {\n    createWorkspace(data: $data) {\n      _id\n    }\n  }\n": types.MutationDocument,
    "\n  mutation DeleteField($data: String!) {\n    deleteField(fieldId: $data) {\n      success\n    }\n  }\n": types.DeleteFieldDocument,
    "\n  mutation Delete($data: String!) {\n    deleteWorkspace(id: $data) {\n      success\n    }\n  }\n": types.DeleteDocument,
    "\n    query Workspace {\n      Workspaces {\n        _id\n        name\n      }\n    }\n  ": types.WorkspaceDocument,
    "\n  mutation Rename($data: UpdateWorkspace!) {\n    updateWorkspace(data: $data) {\n      success\n    }\n  }\n": types.RenameDocument,
    "\n  mutation CreateField($data: CreateFormField!, $id: String!) {\n    createFormField(data: $data, formId: $id) {\n      _id\n      name\n      type\n      properties {\n        label\n        placeholder\n        required\n      }\n    }\n  }\n": types.CreateFieldDocument,
    "\n  mutation CreateLogic($data: CreateLogic!, $formId: String!) {\n    createLogic(data: $data, formId: $formId) {\n      _id\n      ref {\n        _id\n        name\n        __typename\n      }\n      conditions {\n        _id\n        to {\n          _id\n          name\n          type\n          __typename\n        }\n        type\n        __typename\n      }\n      __typename\n    }\n  }\n": types.CreateLogicDocument,
    "\n  query FieldsLogics($id: String!) {\n    Form(id: $id) {\n      fields {\n        _id\n        name\n        type\n        properties {\n          label\n          placeholder\n          description\n          choices {\n            _id\n            name\n            value\n          }\n          attachment {\n            name\n            url\n            type\n          }\n          searchOptions {\n            _id\n            name\n            options {\n              _id\n              name\n              value\n            }\n          }\n          required\n        }\n      }\n      logic {\n        _id\n        ref {\n          _id\n        }\n        conditions {\n          _id\n          type\n          choice {\n            _id\n            name\n            value\n          }\n          to {\n            _id\n          }\n        }\n      }\n    }\n  }\n": types.FieldsLogicsDocument,
    "\n  query Forms($id: String!) {\n    Workspace(id: $id) {\n      _id\n      name\n      forms {\n        _id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.FormsDocument,
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
export function graphql(source: "\n  mutation CreateForm($workspaceId: String!, $data: CreateForm!) {\n    createForm(workspaceId: $workspaceId, data: $data) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateForm($workspaceId: String!, $data: CreateForm!) {\n    createForm(workspaceId: $workspaceId, data: $data) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation($data: CreateWorkspace!) {\n    createWorkspace(data: $data) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($data: CreateWorkspace!) {\n    createWorkspace(data: $data) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteField($data: String!) {\n    deleteField(fieldId: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteField($data: String!) {\n    deleteField(fieldId: $data) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Delete($data: String!) {\n    deleteWorkspace(id: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Delete($data: String!) {\n    deleteWorkspace(id: $data) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Workspace {\n      Workspaces {\n        _id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query Workspace {\n      Workspaces {\n        _id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Rename($data: UpdateWorkspace!) {\n    updateWorkspace(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Rename($data: UpdateWorkspace!) {\n    updateWorkspace(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateField($data: CreateFormField!, $id: String!) {\n    createFormField(data: $data, formId: $id) {\n      _id\n      name\n      type\n      properties {\n        label\n        placeholder\n        required\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateField($data: CreateFormField!, $id: String!) {\n    createFormField(data: $data, formId: $id) {\n      _id\n      name\n      type\n      properties {\n        label\n        placeholder\n        required\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLogic($data: CreateLogic!, $formId: String!) {\n    createLogic(data: $data, formId: $formId) {\n      _id\n      ref {\n        _id\n        name\n        __typename\n      }\n      conditions {\n        _id\n        to {\n          _id\n          name\n          type\n          __typename\n        }\n        type\n        __typename\n      }\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLogic($data: CreateLogic!, $formId: String!) {\n    createLogic(data: $data, formId: $formId) {\n      _id\n      ref {\n        _id\n        name\n        __typename\n      }\n      conditions {\n        _id\n        to {\n          _id\n          name\n          type\n          __typename\n        }\n        type\n        __typename\n      }\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FieldsLogics($id: String!) {\n    Form(id: $id) {\n      fields {\n        _id\n        name\n        type\n        properties {\n          label\n          placeholder\n          description\n          choices {\n            _id\n            name\n            value\n          }\n          attachment {\n            name\n            url\n            type\n          }\n          searchOptions {\n            _id\n            name\n            options {\n              _id\n              name\n              value\n            }\n          }\n          required\n        }\n      }\n      logic {\n        _id\n        ref {\n          _id\n        }\n        conditions {\n          _id\n          type\n          choice {\n            _id\n            name\n            value\n          }\n          to {\n            _id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FieldsLogics($id: String!) {\n    Form(id: $id) {\n      fields {\n        _id\n        name\n        type\n        properties {\n          label\n          placeholder\n          description\n          choices {\n            _id\n            name\n            value\n          }\n          attachment {\n            name\n            url\n            type\n          }\n          searchOptions {\n            _id\n            name\n            options {\n              _id\n              name\n              value\n            }\n          }\n          required\n        }\n      }\n      logic {\n        _id\n        ref {\n          _id\n        }\n        conditions {\n          _id\n          type\n          choice {\n            _id\n            name\n            value\n          }\n          to {\n            _id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Forms($id: String!) {\n    Workspace(id: $id) {\n      _id\n      name\n      forms {\n        _id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query Forms($id: String!) {\n    Workspace(id: $id) {\n      _id\n      name\n      forms {\n        _id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;