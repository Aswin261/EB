import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navigation(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home", { state: { userName: props.name } });
  };
  return (
    <nav className="navbar navbar-light bg-secondary py-1 ml-0">
      <div className="navbar ml-0 py-0">
        <span className="navbar-brand py-0">
          <strong style={{ color: "white" }}>
            <span style={{ color: "orangered" }}>TANGEDCO</span>
          </strong>
        </span>
        <button className="btn mr-0 py-md-0 " onClick={handleClick}>
          Home
        </button>
        {/* <Link to="/payment">
          <button className="btn mr-0 py-md-0 ">Payment</button>
        </Link> */}
        <Link to="/invoice">
          <button className="btn mr-0 py-md-0 ">View Invoice</button>
        </Link>
      </div>
      <div>
        <span style={{ paddingRight: "20px", color: "orangered" }}>
          Logged in as {props.name}!
        </span>
        <Link to="/">
          <button className="btn mr-0 py-md-0 mr-0">Logout</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
