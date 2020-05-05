import React, { Component } from "react";
import PropTypes from "prop-types";
import "./searchbar.css";

export default class Searchbar extends Component {
  static propTypes = {
    // onSubmit: PropTypes.func.isRequired,
    newRequest: PropTypes.func.isRequired,  
  };

  state = {
    query: "",
  };

  handleOnChange = (e) => {
    const query = e.target.value;
    this.setState({
      query,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    this.props.newRequest(query)
  };

  render() {
    const query = this.state.query;
    return (
      <header className="Searchbar">
        <form className="SearchForm" >
          <button type="submit" className="SearchForm-button" newRequest={this.handleSubmit}>
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handleOnChange}
            value={query}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

{/* <form className="SearchForm" onSubmit={this.handleSubmit}> */}

  // this.props.onSubmit(query);