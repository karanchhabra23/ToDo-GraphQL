import { ToDo } from "./Todo";
import React from "react";
import { useQuery, gql } from "@apollo/client";
const GET_LIST = gql`
  query toDo {
    toDo {
      id
      title
    }
  }
`;
const GET_FILTERED_LIST = gql`
  query filteredToDo($searchQuery: String) {
    filteredToDo(searchQuery: $searchQuery) {
      id
      title
    }
  }
`;
export function List({ searchQuery }) {
  const { loading, error, data } = useQuery(GET_FILTERED_LIST, {
    variables: { searchQuery: searchQuery },
    fetchPolicy: "cache-first",
  });
  if (loading) return <h1>loading...</h1>;
  return (
    <ul>
      {data.filteredToDo.map((x) => (
        <ToDo key={x.id} id={x.id}>
          {x.title}
        </ToDo>
      ))}
    </ul>
  );
}
