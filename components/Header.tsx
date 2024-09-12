// components/Header.tsx
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { ExternalLink } from './ExternalLink';  // Import the ExternalLink component

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/images/netshowme-logo.jpeg')} style={styles.logo} />
      <ExternalLink href="https://netshow.me">
        <Text style={styles.aboutText}>About</Text>
      </ExternalLink>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  aboutText: {
    fontSize: 18,
    color: '#007BFF',
  },
});

export default Header;
