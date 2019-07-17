/* eslint-disable import/prefer-default-export */
import { OperationVariables } from "apollo-client";
import { useState } from "react";
import {
  MutationFn,
  MutationHookOptions,
  useMutation as useHookMutation
} from "react-apollo-hooks";
import { DocumentNode } from "graphql";

interface UseMutationState {
  loading: boolean;
  called: boolean;
  error: any;
  data: any;
}

export const useMutation = <TData, TVariables = OperationVariables, TCache = object>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables, TCache>
): [MutationFn<TData, TVariables>, UseMutationState] => {
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useHookMutation(mutation, options);

  const handler = async (args: MutationHookOptions<TData, TVariables, TCache>) => {
    setLoading(true);
    setCalled(true);
    setError(null);
    setData(null);

    try {
      const { data } = await mutate(args);

      setData(data);
      setLoading(false);

      return { data };
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  return [
    handler,
    {
      loading,
      called,
      error,
      data
    }
  ];
};

// export default "test";
