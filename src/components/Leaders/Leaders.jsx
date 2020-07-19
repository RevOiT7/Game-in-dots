import React, { useEffect, useState } from "react";
import * as api from "../../api";

import "./Leaders.scss";

export const Leaders = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    api.fetchWinners().then((res) => setWinners(res.reverse()));
  }, []);

  return (
    <div className="leaders">
      {winners.map((item, index) => (
        <div key={index} className="leaders-item">
          <div className="winner">{item.winner}</div>
          <div className="date">{item.date}</div>
        </div>
      ))}
    </div>
  );
};
