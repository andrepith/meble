import React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { setActiveFilter } from "store/actions";

const SearchComponent = ({ setActiveFilter, activeFilter }) => {
  const handleChange = e => {
    e.preventDefault();
    setNameToFilter(e.target.value);
  };

  const handleRemove = () => {
    setActiveFilter({ ...activeFilter, name: "" });
  };

  const setNameToFilter = debounce(name => {
    setActiveFilter({ ...activeFilter, name });
  }, 300);

  return (
    <>
      <input onChange={handleChange} />
      <button onClick={handleRemove}>Remove</button>
    </>
  );
};

const mapStateToProps = ({ activeFilter }) => ({ activeFilter });

export default connect(mapStateToProps, { setActiveFilter })(SearchComponent);
