import React from "react";
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
      dependencyTree: {}
    };
  }

  onSearch = async searchValue => {
    if (!this.isEmptySearchTerm(searchValue)) {
      const response = await this.fetchPackageAsync(searchValue);
      const dependencyTree = _.get(response, "dependencies", {});
      this.setState({
        noResult: _.isEmpty(dependencyTree),
        dependencyTree: dependencyTree
      });
    } else {
      console.log("empty search term");
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
    this.onSearch.cancel();
  }

  getDepTree = npmPackage => {
    if (!_.isEmpty(_.get(npmPackage, "dependencies", {}))) {
      return (
        <ul key={npmPackage.name}>
          {npmPackage.name}
          {_.map(npmPackage.dependencies, item => {
            return this.getDepTree(item);
          })}
        </ul>
      );
    } else if (!_.isEmpty(_.get(npmPackage, "name", {}))) {
      return <li key={npmPackage.name}>{npmPackage.name}</li>;
    }
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
            ? this.getDepTree(this.state.dependencyTree)
            : ""}
        </div>
      </div>
    );
  }
}
