// Package imports:
import {StyleSheet} from "react-native";
import Constants from "expo-constants";

// Stylesheet:
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  action: {
    alignItems: "center",
    backgroundColor: "#E02041",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    width: "48%"
  },

  actionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
  },

  contactBox: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
    padding: 24
  },

  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  heroDescription: {
    color: "#737380",
    fontSize: 16,
    marginTop: 16
  },

  heroTitle: {
    color: "#13131A",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30
  },

  incident: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 30,
    padding: 24
  },

  incidentProperty: {
    color: "#41414D",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 24,
  },

  incidentValue: {
    color: "#737380",
    fontSize: 16,
    marginTop: 4
  }
});
