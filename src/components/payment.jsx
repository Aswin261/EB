import React, { useState, useEffect } from "react";
import axios from "axios";
import { banks } from "./banks";
import "./payment.css";
import { useNavigate } from "react-router-dom";

function Payment(props) {
  const [bank, setBank] = useState([]);
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setBank(banks);
  }, []);

  const pay = () => {
    if (clicked) {
      axios
        .post("http://localhost:3002/invoice", {
          amount: props.amount,
          bname: clicked.name,
          image: clicked.image,
          cname: props.name,
          uid: props.id,
          unit: props.unit,
        })
        .then((res) => {
          alert(
            `The Bill Amount of \u20B9 ${props.amount} is paid through ${clicked.name}.`
          );
          navigate("/invoice");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Please choose a payment option.");
    }
  };

  return (
    <div>
      <div className="payment">
        <p>
          <b>Choose the payment options</b>
        </p>
        <div className="container">
          {bank.map((prod, index) => (
            <div className="bank_logo" key={prod.id}>
              <img
                title={prod.name}
                src={prod.image}
                width="80px"
                height="80px"
                alt=""
                onClick={() => {
                  setClicked(prod);
                }}
              />
              {clicked && clicked === prod && (
                <button style={{ width: "200px" }} onClick={pay}>
                  Proceed to pay &#8377;{props.amount}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payment;
