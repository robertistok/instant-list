/* eslint-disable import/prefer-default-export */
import { useState } from "react";
import { useMutation as useHookMutation } from "react-apollo-hooks";

// rewrite with TS to gain advantage of autoomeplete
export const useMutation = (mutation, { onCompleted, onError, ...options } = {}) => {
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useHookMutation(mutation, options);

  const handler = async (...args) => {
    setLoading(true);
    setCalled(true);
    setError(null);
    setData(null);

    try {
      const { data } = await mutate(...args);

      setData(data);

      setLoading(false);

      if (onCompleted) {
        onCompleted(data);
      }

      return { data };
    } catch (e) {
      setLoading(false);
      setError(e);

      if (onError) {
        onError(e);
      }
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
