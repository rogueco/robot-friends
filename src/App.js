import React, { useEffect, useState } from "react";
import CardList from "./features/CardList";
import SearchBox from "./features/SearchBox";
import "./app.css";

const App = () => {
  const [initialRobots, setInitialRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((response) => setInitialRobots(response));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };
  const filteredRobots = initialRobots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  if (filteredRobots.length <= 0) {
    return (
      <div className="tc">
        <h1 className="f1">Loading</h1>
      </div>
    );
  }

  return (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <CardList robots={filteredRobots} />
    </div>
  );
};

export default App;
