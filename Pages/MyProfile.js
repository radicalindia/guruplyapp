import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';

const MyProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: 'https://example.com/your-profile-image.jpg', // Add your profile image URL
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>Your Name</Title>
            <Caption style={styles.caption}>@yourusername</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Text style={{ color: '#777777', marginLeft: 20 }}>Mobile</Text>
          <Text style={styles.section}>9479536323</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: '#777777', marginLeft: 20 }}>City</Text>
          <Text style={styles.section}>Bhopal</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: '#777777', marginLeft: 20 }}>Description</Text>
          <Text style={styles.section}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#777777',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});

export default MyProfile;
