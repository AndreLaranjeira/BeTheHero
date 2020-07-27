// Package imports:
import React, {useState} from "react";
import {FiArrowLeft} from "react-icons/fi";
import {Link, useHistory} from "react-router-dom";

// Module imports:
import api from "../../services/api";

// Style imports:
import "./styles.scss";

// Asset imports:
import logoImg from "../../assets/logo.svg";

// Component:
export default function Register() {
  // History.
  const history = useHistory();

  // State variables.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Handler functions.
  async function handleRegister(e){
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state
    };

    try {
      const response = await api.post("ngos", data);
      alert(`Your access passkey: ${response.data.passkey}`);
      history.push("/");
    } catch (err) {
      alert("Error on registration! Please try again.");
    }

  }

  // JSX returned.
  return(
    <div className="form-container register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Register</h1>
          <p>Register on this platform and help people support cases from your NGO.</p>
          <Link className="icon-link" to="/">
            <FiArrowLeft size="16" color="#E02041"/>
            Logon page
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp contact"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="State code"
              value={state}
              onChange={e => setState(e.target.value)}
              style={{width: 140}}
            />
          </div>
          <button className="button" type="Submit">Register</button>
        </form>
      </div>
    </div>
  );
}
