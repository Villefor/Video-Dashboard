import { Image, View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { ExternalLink } from './ExternalLink';

const screenWidth = Dimensions.get('window').width; 

export const CustomHeader = () => (
  <View style={styles.headerContainer}>
    {/* Logo */}
    <View style={styles.logoContainer}>
      <Image
        source={require('../assets/images/netshowme-logo.png')}
        style={styles.logo}
      />
      <View style={styles.linkContainer}>
        <ExternalLink href="https://netshow.me/sobre-a-netshowme/">
          <Text style={styles.aboutText}>netshow.me</Text>
        </ExternalLink>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  linkContainer: {
    marginLeft: screenWidth > 320 ? 40 : 20, 
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  aboutText: {
    fontSize: 18,
    color: '#FF3B60',
    marginLeft: 40,
  },
});