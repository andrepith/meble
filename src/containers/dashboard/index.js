import React, { useEffect, useState } from "react";
import { mebleService } from "services";

import Cards from "components/cards";

import "./index.css";

const Dashboard = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const res = await mebleService();
      setData(res);
    } catch (error) {
      console.error(error);
    }
  };

  try {
    if (Object.keys(data).length) {
      return (
        <div className="wrapper-card">
          {data.products.map((item, key) => (
            <Cards key={key} data={item} />
          ))}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Oops There is something wrong</div>;
  }
};

export default Dashboard;
