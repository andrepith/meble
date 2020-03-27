import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
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
        {!!get(activeFilter, "delivery", []).length &&
          activeFilter.delivery.map((item, key) => {
            return (
              <span key={key} className="filter-tag">
                {item.name}
              </span>
            );
          })}
        {!!get(activeFilter, "furnitureStyles", []).length &&
          activeFilter.furnitureStyles.map((item, key) => {
            return (
              <span key={key} className="filter-tag">
                {item.name}
              </span>
            );
          })}
        {!!isActive &&
          (activeFilter.name ||
            !!get(activeFilter, "delivery", []).length ||
            !!get(activeFilter, "furnitureStyles", []).length) && (
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
