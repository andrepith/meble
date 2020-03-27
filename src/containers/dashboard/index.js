import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mebleService } from "services";

import SearchComponent from "components/searchByName";
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
        item.name.toLowerCase().includes(activeFilter.name.toLowerCase())
      );
      setData(currentData);
    }
    if (!activeFilter.name) {
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

  try {
    if (Object.keys(data).length) {
      return (
        <>
          <SearchComponent />
          <div className="wrapper-card">
            {data.map((item, key) => (
              <Cards key={key} data={item} />
            ))}
          </div>
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Oops There is something wrong</div>;
  }
};

const mapStateToProps = ({ activeFilter }) => ({ activeFilter });

export default connect(mapStateToProps, {})(Dashboard);
