import React from "react";
import { AddToDo } from "./AddToDo";

import "./App.css";
import { ToDoList } from "./ToDoList";

function App() {
  const [search, setSearch] = React.useState("");
  return (
    <div style={{ width: "800px", margin: "auto" }}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search To Do"
      ></input>
      <AddToDo></AddToDo>
      <ToDoList searchQuery={search}></ToDoList>
    </div>
  );
}

export default App;
