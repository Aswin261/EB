import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const users = [
  { uid: "Eu123", name: "Aswin", password: "1234" },
  { uid: "Eu345", name: "John", password: "5678" },
  { uid: "Eu789", name: "Jane", password: "9012" },
];

function Login() {
  const navigate = useNavigate();

  const login = (details) => {
    console.log(details);
    const user = users.find(
      (u) => u.uid === details.uid && u.password === details.password
    );
    if (user) {
      // navigate("/home");
      navigate("/home", { state: { userName: user.name, id: user.uid } });
      alert(`Welcome ${user.name}`);
    } else {
      alert("Invalid Login Credentials");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(details);
  };

  const [details, setDetails] = useState({ uid: "", password: "" });
  return (
    <div className="log">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone number, username or email"
            required
            name="username"
            onChange={(e) => setDetails({ ...details, uid: e.target.value })}
            value={details.uid}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
