import React from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native';
import { View, Modal } from 'react-native';

const Loader = ({ visible = false, size = "60", color = "#ffffff" }) => {
  return (
    visible && <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={size} color={color} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    overlay: {
      position:'absolute',
      width:'100%',
      height:'100%',
      top:0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
  });

export default Loader