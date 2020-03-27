import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { mebleService } from "services";

import ActiveFilters from "components/activeFilters";
import SearchComponent from "components/searchByName";
import DeliveryFilter from "components/deliveryFilter";
import FurnitureStylesFilter from "components/furnitureStylesFilter";
import Cards from "components/cards";

import "./index.css";

const Dashboard = ({ activeFilter }) => {
  const [defaultData, setDefaultData] = useState({});
  const [data, setData] = useState({});
  const [styles, setStyles] = useState([]);

  const fetchApi = async () => {
    try {
      const res = await mebleService();
      setDefaultData(res.products);
      setData(res.products);
      setStyles(res.furniture_styles);
    } catch (error) {
      console.error(error);
    }
  };

  const filterByName = () => {
    if (Object.keys(data).length) {
      const currentData = data.filter(item =>
        item.name
          .toLowerCase()
          .includes(get(activeFilter, "name", "").toLowerCase())
      );
      setData(currentData);
    }
  };

  const filterByDelivery = () => {
    if (Object.keys(data).length && !!activeFilter.delivery) {
      const deliveryTime = get(activeFilter, "delivery", []).map(
        item => item.value
      );
      const currentData = data.filter(
        item => item.delivery_time <= Math.max(...deliveryTime)
      );
      setData(currentData);
    }
  };

  const filterByFurnitureStyles = () => {
    if (Object.keys(data).length && !!activeFilter.furnitureStyles) {
      const furnitureStyles = get(activeFilter, "furnitureStyles", []).map(
        item => item.name
      );
      const filtered = new Set(furnitureStyles);
      const currentData = data.filter(item =>
        item.furniture_style.some(filter => filtered.has(filter))
      );
      setData(currentData);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    filterByName();
    filterByDelivery();
    filterByFurnitureStyles();
    if (!Object.keys(activeFilter).length) {
      setData(defaultData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  try {
    return (
      <div className="wrapper-app">
        <SearchComponent />
        <div className="wrapper-filter">
          <DeliveryFilter />
          <FurnitureStylesFilter styles={styles} />
        </div>
        <ActiveFilters />
        {!!Object.keys(data).length ? (
          <div className="wrapper-card">
            {data.map((item, key) => (
              <Cards key={key} data={item} />
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Oops There is something wrong</div>;
  }
};

const mapStateToProps = ({ activeFilter }) => ({ activeFilter });

export default connect(mapStateToProps, {})(Dashboard);
