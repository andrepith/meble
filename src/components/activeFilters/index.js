import React from "react";
import { connect } from "react-redux";
import { setActiveFilter } from "store/actions";

import "./index.css";

const ActiveFilters = ({ activeFilter, setActiveFilter }) => {
  const isActive = Object.keys(activeFilter).length;
  const handleRemove = () => {
    setActiveFilter({});
  };

  if (isActive) {
    return (
      <div className="wrapper-filters">
        {!!activeFilter.name && (
          <span className="filter-tag">name: {activeFilter.name}</span>
        )}
        {!!isActive && (
          <span className="filter-tag filter-remove" onClick={handleRemove}>
            Remove all
          </span>
        )}
      </div>
    );
  }
  return <></>;
};

const mapStateToProps = ({ activeFilter }) => ({ activeFilter });

export default connect(mapStateToProps, { setActiveFilter })(ActiveFilters);
