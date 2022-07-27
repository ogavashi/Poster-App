import React from "react";

const Filters = () => {
  return (
    <section className="posts-filter">
      <h2 className="visually-hidden">Posts filter</h2>
      <form className="posts-filter__form" autoComplete="off">
        <label className="posts-filter__search input">
          <input name="search" type="search" placeholder="search by text" />
        </label>
        <label className="select">
          <select name="likes">
            <option value="">Likes</option>
            <option value="ASC">Most liked</option>
            <option value="DESC">Most disliked</option>
          </select>
        </label>
        <label className="select">
          <select name="date">
            <option value="">Date</option>
            <option value="ASC">Newer</option>
            <option value="DESC">Older</option>
          </select>
        </label>
      </form>
    </section>
  );
};

export default Filters;
