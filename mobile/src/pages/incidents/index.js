// Package imports:
import React, {useEffect, useState} from "react";
import {Feather} from "@expo/vector-icons";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

// Module imports:
import api from "../../services/api";

// Style imports:
import styles from "./styles";

// Asset imports:
import logoImg from "../../assets/logo.png";

// Component:
export default function Incidents() {
  // Navigation.
  const navigation = useNavigation();

  // State variables.
  const [incidents, setIncidents] = useState([]);
  const [incidentCount, setIncidentCount] = useState(0);
  const [incidentPage, setIncidentPage] = useState(1);
  const [loadingIncidentPage, setLoadingIncidentPage] = useState(false);

  // Functions.
  async function loadIncidents() {
    // Don't try to load more incidents if there are no more incidents to load
    // OR if a loading request was already sent
    if((incidentCount > 0 && incidents.length === incidentCount) ||
       loadingIncidentPage) {
      return;
    }

    // Request received. Begin loading.
    setLoadingIncidentPage(true);

    const response = await api.get("incidents", {
      params: {
        page: incidentPage
      }
    });

    setIncidents([...incidents, ...response.data]);
    setIncidentCount(response.headers["x-total-count"]);

    // Request finished. Adjust variables.
    setIncidentPage(incidentPage + 1);
    setLoadingIncidentPage(false);
  }

  function navigateToDetail(incident) {
    navigation.navigate("Detail", {incident});
  }

  // Page effects.
  useEffect(() => {
    loadIncidents();
  }, []);

  // JSX returned.
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{incidentCount} cases</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.description}>Choose one of the cases below and save the day!</Text>
      <FlatList
        style={styles.incidentList}
        showsVerticalScrollIndicator={false}
        data={incidents}
        keyExtractor={incident => String(incident.ID)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>NGO:</Text>
            <Text style={styles.incidentValue}>{incident.NGO_NAME}</Text>
            <Text style={styles.incidentProperty}>Case:</Text>
            <Text style={styles.incidentValue}>{incident.TITLE}</Text>
            <Text style={styles.incidentProperty}>Value:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
                .format(incident.VALUE)}
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => (navigateToDetail(incident))}
            >
              <Text style={styles.detailsButtonText}>More details</Text>
              <Feather name="arrow-right" size={16} color="#E02041"></Feather>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
