import React, { useState } from "react";
import ReactDom from "react-dom";
import Fuse from "fuse.js";

// Courtesy of https://github.com/dariusk/corpora
import dogs from "./dogs.json";

const fuse = new Fuse(dogs);

function getSearchResultsWithBasicApproach(query) {
  if (!query) {
    return [];
  }

  return dogs.filter((dog) => dog.toLowerCase().includes(query.toLowerCase()));
}

function getSearchResultsWithFuse(query) {
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
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const query = event.target.elements.dogBreedSearch.value;
          const useFuse = event.target.elements.fuse.checked;
          setSearchResults(
            useFuse
              ? getSearchResultsWithFuse(query)
              : getSearchResultsWithBasicApproach(query)
          );
        }}
      >
        <label htmlFor="dogBreedSearch">Search for a dog dog:</label>
        <input type="search" id="dogBreedSearch" />
        <input type="checkbox" name="fuse" />
        <label htmlFor="fuse"> Use Fuse.js</label>
        <br />
        <button>Search</button>
      </form>

      <SearchResults results={searchResults} />
    </>
  );
}

ReactDom.render(<Search />, document.getElementById("app"));
