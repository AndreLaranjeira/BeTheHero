// Package imports:
import React, {useState} from "react";
import {FiLogIn} from "react-icons/fi";
import {Link, useHistory} from "react-router-dom";

// Module imports:
import api from "../../services/api";

// Style imports:
import "./styles.scss";

// Asset imports:
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

// Component:
export default function Logon() {
  // History.
  const history = useHistory();

  // State variables.
  const[passkey, setPasskey] = useState("");

  // Handler functions.
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", {passkey});

      localStorage.setItem("ngoPasskey", passkey);
      localStorage.setItem("ngoName", response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Error on logon! Please try again.");
    }

  }

  // JSX returned.
  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Logon</h1>
          <input
            placeholder="Your passkey"
            value={passkey}
            onChange={e => setPasskey(e.target.value)}
          />
          <button className="button" type="submit">Submit</button>
          <Link className="icon-link" to="/register">
            <FiLogIn size="16" color="#E02041"/>
            Not registered?
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
