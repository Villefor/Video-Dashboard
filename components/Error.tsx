import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ErrorComponentProps = {
  message: string;
  onRetry: () => void;
};

export const ErrorComponent = ({ message, onRetry }: ErrorComponentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{message}</Text>
      <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontSize: 18,
  },
});
