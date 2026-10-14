import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#f1f3f5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  loadingText: {
    marginTop: 8,
    color: '#6c757d',
    fontSize: 14,
  },
});