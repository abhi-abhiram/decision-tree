import type { FieldProperties, InputFieldType } from '@/gql/graphql';
import getLayout from '@/utils/lr';
import React, { createContext, useEffect, useReducer } from 'react';
import type { Edge, Node } from 'reactflow';

const NodeDimentions = {
  height: 40,
  width: 150,
};

const setLayout = (
  nodes: Node<
    FieldProperties & {
      type: InputFieldType;
    }
  >[],
  edges: Edge<unknown>[]
) => getLayout(nodes, edges, NodeDimentions.height, NodeDimentions.width);

interface State {
  head: Node<FieldProperties & { type: InputFieldType }> | undefined;
  deleteHead: boolean;
  newLayout: boolean;
}

const initialState: State = {
  head: undefined,
  deleteHead: false,
  newLayout: false,
};

interface BaseAction {
  type: string;
  payload: unknown;
}

interface SetHeadAction extends BaseAction {
  type: 'setHead';
  payload: { head: State['head'] };
}

interface AddNodeAction extends BaseAction {
  type: 'addNode';
  payload: { node: Node<FieldProperties & { type: InputFieldType }> };
}

interface DeleteNodeAction extends BaseAction {
  type: 'deleteNode';
  payload: { nodeId: string };
}

interface SetDeleteHead {
  type: 'setDeleteHead';
  payload: { deleteHead: State['deleteHead'] };
}

interface SetNewLayout {
  type: 'setLayout';
  payload: { newLayout: State['newLayout'] };
}

type NodeActions = AddNodeAction | DeleteNodeAction | SetDeleteHead;

type Action = SetHeadAction | NodeActions | SetNewLayout;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setHead':
      return {
        ...state,
        head: action.payload.head,
      };

    case 'setDeleteHead':
      return {
        ...state,
        deleteHead: action.payload.deleteHead,
      };

    case 'setLayout':
      return {
        ...state,
        newLayout: action.payload.newLayout,
      };

    default:
      return state;
  }
};

export const FormContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const FormProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
