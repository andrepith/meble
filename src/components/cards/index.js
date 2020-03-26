import React from "react";

import "./index.css";

const Cards = ({
  data: { name, price, description, furniture_style, delivery_time }
}) => {
  return (
    <div className="card">
      <div className="card__title">
        <h2>{name}</h2>
        <div className="price">Rp. {price.toLocaleString("id-ID")}</div>
      </div>
      <div className="card__description">{description}</div>
      <div className="card__furniture-style">
        {furniture_style.map((item, key) => (
          <div className="pills" key={key}>
            {item}
          </div>
        ))}
      </div>
      <div className="card__delivery">Delivery Days: {delivery_time}</div>
    </div>
  );
};

export default Cards;
