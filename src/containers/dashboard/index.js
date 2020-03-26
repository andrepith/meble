import React, { useEffect, useState } from "react";
import { mebleService } from "services";

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
      return data.products.map((item, key) => <div key={key}>{item.name}</div>);
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Oops There is something wrong</div>;
  }
};

export default Dashboard;
