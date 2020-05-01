// Package imports:
const express = require('express');

// Controller imports:
const NgoController = require('./controllers/ngo_controller');
const IncidentController = require('./controllers/incident_controller');
const ProfileController = require('./controllers/profile_controller');
const SessionController = require('./controllers/session_controller');

// Router:
const routes = express.Router();

// Session routes:
routes.post('/sessions', SessionController.create);

// NGO routes:
routes.get('/ngos', NgoController.index);
routes.post('/ngos', NgoController.create);

// Incident routes:
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// Profile routes:
routes.get('/profile', ProfileController.index);

// Export module:
module.exports = routes;
