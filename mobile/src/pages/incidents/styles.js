// Package imports:
import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

// Stylesheet:
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  description: {
    color: '#737380',
    fontSize: 16,
    lineHeight: 24
  },

  detailsButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  detailsButtonText: {
    color: '#E02041',
    fontSize: 16,
    fontWeight: 'bold'
  },

  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  headerText: {
    color: '#737380',
    fontSize: 16
  },

  headerTextBold: {
    fontWeight: 'bold'
  },

  incident: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    padding: 24
  },

  incidentList: {
    marginTop: 32
  },

  incidentProperty: {
    color: '#41414D',
    fontSize: 15,
    fontWeight: 'bold'
  },

  incidentValue: {
    color: '#737380',
    fontSize: 16,
    marginBottom: 24,
    marginTop: 4
  },

  title: {
    color: '#13131A',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30
  }
});
