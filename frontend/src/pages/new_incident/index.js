// Package imports:
import React, {useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

// Module imports:
import api from '../../services/api';

// Style imports:
import './styles.scss';

// Asset imports:
import logoImg from '../../assets/logo.svg';

// Component:
export default function NewIncident() {
  // History.
  const history = useHistory();

  // Local storage.
  const ngoPasskey = localStorage.getItem('ngoPasskey');

  // State variables.
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  // Handler functions.
  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoPasskey
        }
      });
      history.push('/profile');
    } catch (err) {
      alert('Error on incident creation! Please try again.');
    }

  };

  // JSX returned.
  return(
    <div className="form-container new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Create new case</h1>
          <p>Give a detailed description of the case your NGO needs help with so that a hero may solve it.</p>
          <Link className="icon-link" to="/profile">
            <FiArrowLeft size="16" color="#E02041"/>
            Home page
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Case title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Reward (US dollars)"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="Submit">Create</button>
        </form>
      </div>
    </div>
  );
}
