// Package imports:
const express = require("express");

// Controller imports:
const IncidentController = require("./controllers/incident_controller");
const NgoController = require("./controllers/ngo_controller");
const ProfileController = require("./controllers/profile_controller");
const SessionController = require("./controllers/session_controller");

// Validator imports:
const IncidentValidator = require("./validators/incident_validator");
const NgoValidator = require("./validators/ngo_validator");
const ProfileValidator = require("./validators/profile_validator");
const SessionValidator = require("./validators/session_validator");

// Router:
const routes = express.Router();

// Incident routes:
routes.get("/incidents", IncidentValidator.index, IncidentController.index);
routes.post("/incidents", IncidentValidator.create, IncidentController.create);
routes.delete("/incidents/:id", IncidentValidator.delete, IncidentController.delete);

// NGO routes:
routes.get("/ngos", NgoController.index);
routes.post("/ngos", NgoValidator.create, NgoController.create);

// Profile routes:
routes.get("/profile", ProfileValidator.index, ProfileController.index);

// Session routes:
routes.post("/sessions", SessionValidator.create, SessionController.create);

// Export module:
module.exports = routes;
