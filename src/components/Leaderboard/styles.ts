import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212529',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  rank: {
    fontWeight: 'bold',
    width: 30,
    color: '#007AFF',
  },
  name: {
    flex: 1,
    fontSize: 15,
    color: '#343a40',
  },
  mode: {
    fontSize: 12,
    color: '#6c757d',
    marginRight: 8,
  },
  score: {
    fontWeight: 'bold',
    color: '#28a745',
  },
});