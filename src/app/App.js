import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CardList from "../features/CardList";
import SearchBox from "../features/SearchBox";
import "../app/styles/app.css";
import Scroll from "../features/Scroll";
import ErrorBoundary from "../features/ErrorBoundary";
import { setSearchField, requestRobots } from "./store/actions";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

const App = (props) => {
  const {
    searchField,
    onSearchChange,
    onRequestRobots,
    robots,
    isPending,
  } = props;

  const filteredRobots = robots.filter((robot) => {
    console.log(robot);
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  useEffect(() => {
    onRequestRobots();
  }, [onRequestRobots]);

  return isPending ? (
    <div className="tc">
      <h1 className="f1">Loading</h1>
    </div>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
