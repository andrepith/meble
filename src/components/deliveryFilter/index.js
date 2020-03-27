import React from "react";
import { connect } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import { setActiveFilter } from "store/actions";

const optionsDelivery = [
  { name: "1 Week", value: 7 },
  { name: "2 Weeks", value: 14 },
  { name: "1 Months", value: 30 },
  { name: "All", value: Infinity }
];

const DeliveryFilter = ({ setActiveFilter, activeFilter }) => {
  const onSelect = selectedList => {
    setActiveFilter({
      ...activeFilter,
      delivery: selectedList
    });
  };

  return (
    <Multiselect
      options={optionsDelivery}
      displayValue="name"
      selectedValues={activeFilter.delivery || []}
      showCheckbox={true}
      onSelect={onSelect}
      onRemove={onSelect}
      placeholder="Delivery Time"
      style={{ chips: { display: "none" } }}
    />
  );
};

const mapStateToProps = ({ activeFilter }) => ({ activeFilter });

export default connect(mapStateToProps, { setActiveFilter })(DeliveryFilter);
