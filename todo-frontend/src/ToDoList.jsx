import React from "react";
import { useQuery, gql } from "@apollo/client";
import { List } from "react-virtualized";
import { ToDo } from "./Todo";
import "./ToDoList.css";

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

export function ToDoList({ searchQuery }) {
  const { loading, error, data } = useQuery(GET_FILTERED_LIST, {
    variables: { searchQuery: searchQuery },
    fetchPolicy: "cache-first",
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading data</h1>;

  const rowRenderer = ({ key, index, style }) => {
    const item = data.filteredToDo[index];
    return (
      <div key={key} style={style} className="virtualized-list-item">
        <ToDo key={item.id} id={item.id}>
          {item.title}
        </ToDo>
      </div>
    );
  };

  return (
    <List
      className="virtualized-list"
      width={800}
      height={300}
      rowCount={data.filteredToDo.length}
      rowHeight={50}
      rowRenderer={rowRenderer}
    />
  );
}
