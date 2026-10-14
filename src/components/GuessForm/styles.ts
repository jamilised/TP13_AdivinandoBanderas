import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  formContainer: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 5,
  },
  disabledButton: {
    backgroundColor: '#e9ecef',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#adb5bd',
  },
});