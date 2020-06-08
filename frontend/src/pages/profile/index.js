// Package imports:
import React, {useEffect, useState} from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

// Module imports:
import api from '../../services/api';

// Style imports:
import './styles.scss';

// Asset imports:
import logoImg from '../../assets/logo.svg';

// Component:
export default function Profile() {
  // History.
  const history = useHistory();

  // Local storage.
  const ngoPasskey = localStorage.getItem('ngoPasskey');
  const ngoName = localStorage.getItem('ngoName');

  // State variables.
  const [incidents, setIncidents] = useState([]);

  // Handler functions.
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoPasskey
        }
      });

      setIncidents(incidents.filter(incident => incident.ID !== id))
    } catch (err) {
      alert('Error on case deletion! Please try again.');
    }
  };

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  };

  // Page effects.
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ngoPasskey
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ngoPasskey]);

  // JSX returned.
  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Welcome, {ngoName}</span>
        <Link className="button" to="/incidents/new">Register new case</Link>
        <button onClick={handleLogout} type="button">
          <FiPower color="#E02041" size={18}/>
        </button>
      </header>
      <h1>Registered cases</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.ID}>
            <strong>CASE:</strong>
            <p>{incident.TITLE}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.DESCRIPTION}</p>

            <strong>VALUE:</strong>
            <p>
              {Intl.NumberFormat('en-US', {style: "currency", currency: "USD"})
               .format(incident.VALUE)}
            </p>
            <button onClick={() => handleDeleteIncident(incident.ID)} type="button">
              <FiTrash2 color="#A8A8B3" size={20}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
