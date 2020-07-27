// Package imports:
import axios from "axios";

// Environment variables:
import {HOST_IP_ADDRESS} from "react-native-dotenv";

// API:
const api = axios.create({
  baseURL: "http://" + HOST_IP_ADDRESS + ":3333"
});

// Export module:
export default api;
