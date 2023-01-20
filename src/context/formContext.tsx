import type { FormField } from '@/gql/graphql';
import React, { createContext, useReducer } from 'react';

interface State {
  head: FormField | undefined;
}

const initialState: State = {
  head: undefined,
};

type SetHead = {
  type: 'Set_Head';
  payload: {
    head: FormField | undefined;
  };
};

type Action = SetHead;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Set_Head':
      return {
        ...state,
        head: action.payload.head,
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
