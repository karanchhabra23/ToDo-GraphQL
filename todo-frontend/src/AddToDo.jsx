import React from "react";
import { useMutation, gql } from "@apollo/client";
const GET_LIST = gql`
  query toDo {
    toDo {
      id
      title
    }
  }
`;
const ADD_TODO = gql`
  mutation addToDo($id: String!, $title: String!) {
    addToDo(id: $id, title: $title) {
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
export const AddToDo = () => {
  const [addToDoMutation] = useMutation(ADD_TODO, {
    update(cache, { data: { addToDo } }) {
      cache.modify({
        fields: {
          toDo(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addToDo,
              fragment: gql`
                fragment NewTodo on ToDo {
                  id
                  title
                }
              `,
            });
            return [newTodoRef, ...existingTodos];
          },
        },
      });
    },
    refetchQueries: ["filteredToDo"],
  });
  const ref = React.useRef();
  return (
    <>
      <input ref={ref} placeholder="To Do title"></input>
      <button
        onClick={(e) => {
          addToDoMutation({
            variables: { id: Date.now().toString(), title: ref.current.value },
          });
          ref.current.value = "";
        }}
      >
        Add To Do
      </button>
    </>
  );
};
