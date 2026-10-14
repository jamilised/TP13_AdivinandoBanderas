import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  hintButton: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#e9ecef',
  },
  hintButtonText: {
    color: '#212529',
    fontWeight: 'bold',
    fontSize: 14,
  },
  revealedText: {
    marginTop: 8,
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#343a40',
  },
});