import React from "react";
import { useMutation, gql } from "@apollo/client";

const DELETE_TODO = gql`
  mutation removeToDo($id: String!) {
    removeToDo(id: $id) {
      id
      title
    }
  }
`;

const EDIT_TODO = gql`
  mutation editToDo($id: String!, $title: String!) {
    editToDo(id: $id, title: $title) {
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
export const ToDo = (props) => {
  const [deleteToDoMutation] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeToDo } }) {
      const deletedToDoId = removeToDo.id;
      cache.modify({
        fields: {
          toDo(existingTodos = []) {
            console.log("here delete");
            return existingTodos.filter((x) => x.id !== deletedToDoId);
          },
        },
      });
    },
    refetchQueries: ["filteredToDo"],
  });
  const [editToDoMutation] = useMutation(EDIT_TODO);
  const ref = React.useRef();
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <li>
      <input
        ref={ref}
        defaultValue={props.children}
        disabled={!isEditing}
      ></input>
      {isEditing ? (
        <button
          onClick={(e) => {
            setIsEditing(false);
            editToDoMutation({
              variables: { id: props.id, title: ref.current.value },
            });
          }}
        >
          Save
        </button>
      ) : (
        <button onClick={(e) => setIsEditing(true)}>Edit</button>
      )}
      <button
        onClick={(e) => deleteToDoMutation({ variables: { id: props.id } })}
      >
        Delete
      </button>
    </li>
  );
};
