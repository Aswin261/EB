import React, { useState } from "react";
import "./calculate.css";
import Payment from "./payment";
function Calc(props) {
  const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const [mno, setMno] = useState("");
  const [prev, setPrev] = useState(0);
  const [curr, setCurr] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const calculateTotal = (e) => {
    e.preventDefault();
    if (prev && curr) {
      const totalReading = parseInt(curr) - parseInt(prev);
      setTotal(totalReading);
      setPrev("");
      setCurr("");
      setPaymentAmount(calculatePaymentAmount(totalReading));
    }
  };
  const calculatePaymentAmount = (totalReading) => {
    if (totalReading <= 100) {
      return 0;
    } else if (totalReading <= 200) {
      return (Math.min(totalReading, 200) - 100) * 3;
    } else if (totalReading <= 300) {
      return 100 * 3 + (Math.min(totalReading, 300) - 200) * 5;
    } else if (totalReading <= 1000) {
      return 100 * 8 + (Math.min(totalReading, 1000) - 300) * 7;
    } else {
      return null;
    }
  };
  // setTotal("");
  const renderTable = () => {
    return (
      <div
        style={{
          display: total > 0 ? "table-row" : "none",
          marginTop: "20px",
        }}
      >
        <p>Slabwise calculation of CC Charges</p>
        <table className="table-sm tablestyle table-striped table-striped-columns  mx-5 table-responsive">
          <tbody style={{ border: "solid" }}>
            <tr>
              <th>From Unit</th>
              <th>To Unit</th>
              <th>Units</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>

            {total > 0 && (
              <>
                <tr>
                  <td>1</td>
                  <td>100</td>
                  <td>{total >= 100 ? 100 : total}</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr
                  style={{
                    display: total >= 101 ? "table-row" : "none",
                  }}
                >
                  <td>101</td>
                  <td>200</td>
                  <td>
                    {total >= 101 && total === 200
                      ? 100
                      : Math.min(total, 200) - 100}
                  </td>
                  <td>3</td>
                  <td>{total >= 101 ? (Math.min(total, 200) - 100) * 3 : 0}</td>
                </tr>
                <tr
                  style={{
                    display: total >= 201 ? "table-row" : "none",
                  }}
                >
                  <td>201</td>
                  <td>300</td>
                  <td>
                    {total >= 201 && total === 300
                      ? 100
                      : Math.min(total, 300) - 200}
                  </td>
                  <td>5</td>
                  <td>{total >= 201 ? (Math.min(total, 300) - 200) * 5 : 0}</td>
                </tr>
                <tr
                  style={{
                    display: total >= 301 ? "table-row" : "none",
                  }}
                >
                  <td>301</td>
                  <td>Any</td>
                  <td>{total >= 301 ? total - 300 : 0}</td>
                  <td>7</td>
                  <td>{total >= 301 ? (total - 300) * 7 : 0}</td>
                </tr>
              </>
            )}

            <tr>
              <td colSpan="4">
                <b>Total:</b>
              </td>
              <td style={{ textAlign: "center" }}>
                <b>
                  {
                    /* {total <= 100
                    ? 0
                    : total <= 200
                    ? ((Math.min(total, 200) - 100) * 3).toFixed(2)
                    : total <= 300
                    ? (100 * 3 + (Math.min(total, 300) - 200) * 5).toFixed(2)
                    : total <= 1000 && total >= 301
                    ? // ((total - 300) * 7).toFixed(2)
                      (100 * 8 + (Math.min(total, 1000) - 300) * 7).toFixed(2)
                    : "null"} */ calculatePaymentAmount(total)
                  }
                </b>
              </td>
            </tr>
          </tbody>
        </table>
        <span>The bill amount to be paid is {paymentAmount}&#8377;</span>
      </div>
    );
  };
  return (
    <div>
      <div className="d-flex justify-content-center">
        <form className="calcform" onSubmit={calculateTotal}>
          <label>Num Of Meters: </label>&nbsp;
          <select
            style={{ width: "100px" }}
            onChange={(e) => setMno(e.target.value)}
          >
            {options.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </select>
          <br />
          <label>Previous Reading: </label>
          <input
            type="number"
            name="previous"
            placeholder="prev"
            value={prev}
            onChange={(e) => setPrev(e.target.value)}
            required
            class="mb-1"
          />
          <br />
          <label>Current Reading: </label>
          <input
            type="number"
            name="current"
            placeholder="curr"
            value={curr}
            onChange={(e) => setCurr(e.target.value)}
            required
            class="mb-1"
          />
          <br />
          <button type="submit">Calculate</button>
          <br />
          <p>
            Total Reading: {mno} Meters {total} Units
          </p>
        </form>
        {renderTable()}
      </div>

      {paymentAmount > 0 && (
        <Payment
          amount={paymentAmount}
          name={props.name}
          id={props.id}
          unit={total}
        />
      )}
    </div>
  );
}

export default Calc;
