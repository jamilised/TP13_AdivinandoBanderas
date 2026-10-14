import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  resetButton: {
    flex: 0.48,
    backgroundColor: '#ffc107',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  exitButton: {
    flex: 0.48,
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});