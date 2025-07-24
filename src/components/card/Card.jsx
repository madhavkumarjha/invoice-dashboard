import React from "react";
import { FaFileInvoice } from "react-icons/fa";
import "./card.css";

 

function Card({ type,color }) {

  return (
    <div className="cards">
      <div className={`card ${color} gap-6`}>
        <FaFileInvoice />
        <div className="flex flex-col ">
          <p className="tip">{type}</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
