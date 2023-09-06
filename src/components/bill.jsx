import React from "react";
import Navigation from "./navbar";
import { useLocation } from "react-router-dom";
import Calc from "./calculate";

function Bill() {
  const location = useLocation();
  const userName = location.state?.userName;
  const id = location.state?.id;
  console.log(userName, id);
  return (
    <div>
      <Navigation name={userName} />
      <Calc name={userName} id={id} />
    </div>
  );
}

export default Bill;
