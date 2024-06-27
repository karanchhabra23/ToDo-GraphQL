import { gql } from "graphql-tag";
// import { toDoList } from "./data.js";

let toDoList = [];

export const typeDefs = gql`
  type ToDo {
    id: String!
    title: String!
  }
  type Query {
    toDo: [ToDo!]
    filteredToDo(searchQuery: String): [ToDo!]
  }
  type Mutation {
    addToDo(id: String!, title: String!): ToDo!
    removeToDo(id: String!): ToDo!
    editToDo(id: String!, title: String!): ToDo!
  }
`;
export const resolvers = {
  Query: {
    toDo: () => {
      return toDoList;
    },
    filteredToDo: (_, args) => {
      if (args.searchQuery === "") return toDoList;
      return toDoList.filter((x) => x.title.startsWith(args.searchQuery));
    },
  },
  Mutation: {
    addToDo(_, args) {
      const newToDo = { id: args.id, title: args.title };
      toDoList = [newToDo, ...toDoList];
      return newToDo;
    },
    removeToDo(_, args) {
      const deletedToDo = toDoList.find((x) => x.id === args.id);
      toDoList = toDoList.filter((x) => x.id !== args.id);
      return deletedToDo;
    },
    editToDo(_, args) {
      const editedToDo = { id: args.id, title: args.title };
      toDoList.forEach((x) => {
        if (x.id === args.id) {
          x.title = args.title;
        }
      });
      return editedToDo;
    },
  },
};
