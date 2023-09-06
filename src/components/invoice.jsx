import React, { useState, useEffect } from "react";
import axios from "axios";
import "./invoice.css";
import ToWords from "number-to-words";
function Invoice() {
  const [item, setItem] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/invoice")
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setCurrentDate(new Date().toLocaleString());
  }, []);
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="container">
        {item.map((post) => (
          <div key={post._id} className="card">
            <div className="card-body">
              <h3
                className="card-title"
                style={{ textAlign: "center", color: "purple" }}
              >
                Tamil Nadu Electricity Board
              </h3>
              <h4 style={{ textAlign: "center", color: "blue" }}>
                Payment Receipt
              </h4>
              <div className="card-text">
                <p>
                  <strong>Consumer No: &nbsp;</strong> {post.consumerId}
                </p>
                <p>
                  <strong>Consumer Name: </strong>
                  {post.consumerName}
                </p>
                <p>
                  <strong style={{ paddingLeft: "35px" }}>Date: </strong>
                  {currentDate}
                </p>
              </div>
              <div className="ct2">
                <p>
                  <strong>Bank Name: </strong>
                  {post.Bankname}
                </p>
                <p>
                  <strong>Units Consumed: </strong>
                  {post.unit}
                </p>
                <p>
                  <strong>Amount: &#8377;</strong>
                  {post.amount}
                </p>
              </div>
              <div style={{ float: "left" }}>
                <p
                  style={{
                    marginLeft: "35px",
                    textAlign: "center",
                    color: "blue",
                  }}
                >
                  <b> Rupees {ToWords.toWords(post.amount)} only</b>
                </p>
                <strong style={{ textAlign: "center" }}>Paid Through: </strong>
                <img src={post.image} width="80px" height="80px" alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button id="btn" onClick={handlePrint}>
        print
      </button>
    </div>
  );
}

export default Invoice;
