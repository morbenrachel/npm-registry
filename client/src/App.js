import React from "react";
import logo from "./logo.svg";
import constants from "./constants";
import "./App.css";
import _ from "lodash";
import SearchInput from "./components/SearchInput";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = _.debounce(this.onSearch, constants.DEBOUNCE_VALUE);
    this.state = {
      noResult: false,
      searchValue: "",
      dependencyTree: []
    };
  }

  onSearch = async searchValue => {
    if (!this.isEmptySearchTerm(searchValue)) {
      const response = await this.fetchPackageAsync(searchValue);
      const dependencyTree = response.dependencies;
      this.setState({
        noResult: dependencyTree.length === 0,
        dependencyTree: dependencyTree
      });
      console.log("dep tree in async onsearch");
      console.log(dependencyTree);
    } else {
      this.setState({ searchValue: "", images: [] });
    }
  };

  fetchPackageAsync = async searchValue => {
    try {
      const response = await fetch(`/package/${searchValue}`);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  isEmptySearchTerm = searchValue => {
    return searchValue.trim().length === 0;
  };

  setSearchValue = valueFromInput => {
    this.setState({ searchValue: valueFromInput });
  };

  componentWillUnmount() {
    this.onSearch.cancel(); //make sure to cancel due to debounce
  }

  getDependencyList = () => {
    const deps = Object.keys(this.state.dependencyTree);
    const items = _.map(deps, (dep, index) => <li key={index}>{dep}</li>);
    return <ul>{items}</ul>;
  };
  render() {
    return (
      <div className="app">
        <div className="top-container">
          <div>
            <h2>NPM Registry Dependencies</h2>
          </div>
          <SearchInput
            value={this.state.searchValue}
            setSearchValue={this.setSearchValue}
            onSearch={this.onSearch}
          />
          {this.state.dependencyTree.length !== 0
            ? this.getDependencyList()
            : ""}
        </div>
      </div>
    );
  }
}
