/* eslint-disable import/prefer-default-export */
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
    }
  }
`;

export default () => {
  const data = useQuery(CURRENT_USER_QUERY);

  return data;
};
