import React from "react";
import { connect } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import { setActiveFilter } from "store/actions";

const FurnitureStylesFilter = props => {
  const { setActiveFilter, activeFilter, styles } = props;

  const stylesOption = styles.map(name => ({ name }));
  const onSelect = selectedList => {
    setActiveFilter({
      ...activeFilter,
      furnitureStyles: selectedList
    });
  };

  return (
    <Multiselect
      options={stylesOption}
      displayValue="name"
      selectedValues={activeFilter.furnitureStyles || []}
      showCheckbox={true}
      onSelect={onSelect}
      onRemove={onSelect}
      placeholder="Furniture Styles"
      style={{ chips: { display: "none" } }}
    />
  );
};

const mapStateToProps = ({ activeFilter }) => ({ activeFilter });

export default connect(mapStateToProps, { setActiveFilter })(
  FurnitureStylesFilter
);
