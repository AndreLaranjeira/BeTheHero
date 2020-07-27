// Package imports:
import React from "react";
import {Feather} from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import {Image, Linking, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";

// Style imports:
import styles from "./styles";

// Asset imports:
import logoImg from "../../assets/logo.png";

// Component:
export default function Detail() {
  // Navigation.
  const navigation = useNavigation();
  const route = useRoute();

  // Navigation params.
  const incident = route.params.incident;

  // Constants.
  const caseMessage = `Hello, ${incident.NGO_NAME}. I am contacting you ` +
    `because I would like to help you on the case "${incident.TITLE}", which ` +
    "is valued at " +
    `${Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
      .format(incident.VALUE)}.`;

  // Functions.
  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.TITLE}`,
      recipients: [`${incident.NGO_EMAIL}`],
      body: caseMessage
    });
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.NGO_WHATSAPP}&text=${caseMessage}`);
  }

  // JSX returned.
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041"/>
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>NGO:</Text>
        <Text style={styles.incidentValue}>{incident.NGO_NAME} ({incident.NGO_CITY ? incident.NGO_CITY + ", " : ""}{incident.NGO_STATE})</Text>
        <Text style={styles.incidentProperty}>Case:</Text>
        <Text style={styles.incidentValue}>{incident.TITLE}</Text>
        <Text style={styles.incidentProperty}>Value:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
            .format(incident.VALUE)}
        </Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero of this case.</Text>
        <Text style={styles.heroDescription}>Contact us:</Text>
        <View style={styles.actions}>
          {incident.NGO_WHATSAPP
            ?
            <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            : null
          }
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
