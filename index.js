import React, { useState } from "react";
import ReactDom from "react-dom";
import Fuse from "fuse.js";

// Courtesy of https://github.com/dariusk/corpora
import dogs from "./dogs.json";

const fuse = new Fuse(dogs);

function searchWithBasicApproach(query) {
  if (!query) {
    return [];
  }

  return dogs.filter((dog) => dog.toLowerCase().includes(query.toLowerCase()));
}

function searchWithFuse(query) {
  if (!query) {
    return [];
  }

  return fuse.search(query).map((result) => result.item);
}

function SearchResults(props) {
  if (!props.results) {
    return null;
  }

  if (!props.results.length) {
    return <p>There are no results for your query.</p>;
  }

  return (
    <ol>
      {props.results.map((result) => (
        <li key={result}>{result}</li>
      ))}
    </ol>
  );
}

function Search() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="center">
      <h1>React With Fuse Demo</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const query = event.target.elements.query.value;
          const useFuse = event.target.elements.fuse.checked;
          setSearchResults(
            useFuse ? searchWithFuse(query) : searchWithBasicApproach(query)
          );
        }}
      >
        <label htmlFor="query">Search for a dog breed:</label>
        <input type="search" id="query" />
        <input type="checkbox" name="fuse" />
        <label htmlFor="fuse">
          {" "}
          Use <a href="https://fusejs.io/">Fuse.js</a>
        </label>
        <button>Search</button>
      </form>

      <SearchResults results={searchResults} />
    </div>
  );
}

ReactDom.render(<Search />, document.getElementById("app"));
