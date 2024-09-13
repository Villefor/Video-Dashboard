import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

type DescriptionProps = {
  description: string | null; 
};

export function Description({ description }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasDescription = description && description.trim() !== '';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.descriptionToggle}>
          {isExpanded ? 'Esconder descrição do vídeo' : 'Mostrar descrição do vídeo...'}
        </Text>
      </TouchableOpacity>
      {isExpanded && (
        <Text style={styles.descriptionText}>
          {hasDescription ? description : 'Nenhuma descrição disponível para este vídeo.'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  descriptionToggle: {
    fontSize: 16,
    color: '#1E90FF',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
});
