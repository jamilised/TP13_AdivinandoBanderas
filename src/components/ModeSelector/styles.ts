import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.48,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#ced4da',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#495057',
  },
  activeText: {
    color: '#fff',
  },
});