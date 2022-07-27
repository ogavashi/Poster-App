import React, { ChangeEvent, useContext } from "react";
import { AppContext } from "../context";

const Filters = () => {
  const { searchValue, setSearchValue, setSortBy, setSortOrder, sortOrder, sortBy } =
    useContext(AppContext);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onChangeSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const onChangeSortOrder = () => {
    if (sortOrder === "asc") setSortOrder("desc");
    if (sortOrder === "desc") setSortOrder("asc");
  };

  return (
    <section className="posts-filter">
      <h2 className="visually-hidden">Posts filter</h2>
      <form className="posts-filter__form" autoComplete="off">
        <label className="posts-filter__search input">
          <input
            value={searchValue}
            onChange={onChangeInput}
            name="search"
            type="search"
            placeholder="search by text"
          />
        </label>
        <label className="select">
          <select name="date" value={sortBy} onChange={onChangeSortBy}>
            <option value="">Sort by</option>
            <option value="likes">Likes</option>
            <option value="dislikes">Dislikes</option>
            <option value="createdAt">Date</option>
          </select>
        </label>
        <span onClick={onChangeSortOrder} className="orderBy">
          {sortOrder === "asc" ? "☝️" : "👇"}
        </span>
      </form>
    </section>
  );
};

export default Filters;
