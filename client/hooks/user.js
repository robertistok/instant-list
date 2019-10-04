/* eslint-disable import/prefer-default-export */
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      shoppingList {
        id
        name
        todoistId
      }
    }
  }
`;

const useUser = () => {
  const currentUserQueryRes = useQuery(CURRENT_USER_QUERY);

  return currentUserQueryRes || { data: { me: undefined } };
};

export const queries = { CURRENT_USER_QUERY };
export const mutations = {};
export default useUser;
