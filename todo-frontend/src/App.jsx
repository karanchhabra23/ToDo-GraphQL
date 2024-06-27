import React from "react";
import { AddToDo } from "./AddToDo";

import "./App.css";
import { List } from "./List";

function App() {
  const [search, setSearch] = React.useState("");
  return (
    <>
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search To Do"
      ></input>
      <AddToDo></AddToDo>
      <List searchQuery={search}></List>
    </>
  );
}

export default App;
