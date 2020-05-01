// Package imports:
const cors = require('cors');
const express = require('express');

// Module imports:
const routes = require('./routes');

// Application configuration:
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

// Start app:
app.listen(3333);
