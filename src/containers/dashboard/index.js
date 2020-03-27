import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { mebleService } from "services";

import ActiveFilters from "components/activeFilters";
import SearchComponent from "components/searchByName";
import DeliveryFilter from "components/deliveryFilter";
import Cards from "components/cards";

import "./index.css";

const Dashboard = ({ activeFilter }) => {
  const [data, setData] = useState({});

  const fetchApi = async () => {
    try {
      const res = await mebleService();
      setData(res.products);
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
    if (!activeFilter.name) {
      fetchApi();
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
    if (!activeFilter.delivery) {
      fetchApi();
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    filterByName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter.name]);

  useEffect(() => {
    filterByDelivery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter.delivery]);

  try {
    return (
      <>
        <SearchComponent />
        <DeliveryFilter />
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
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Oops There is something wrong</div>;
  }
};

const mapStateToProps = ({ activeFilter }) => ({ activeFilter });

export default connect(mapStateToProps, {})(Dashboard);
