import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#212529',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  playerText: {
    color: '#f8f9fa',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modeBadge: {
    color: '#ffc107',
    fontSize: 14,
    fontWeight: '600',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreLabel: {
    color: '#adb5bd',
    fontSize: 18,
    marginRight: 8,
  },
  scoreValue: {
    color: '#28a745',
    fontSize: 32,
    fontWeight: 'bold',
  },
  negativeScore: {
    color: '#dc3545',
  },
  feedbackText: {
    marginTop: 6,
    color: '#17a2b8',
    fontSize: 14,
    fontWeight: '600',
  },
});