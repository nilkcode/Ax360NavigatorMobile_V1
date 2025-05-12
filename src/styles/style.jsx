
import { StyleSheet, Platform, StatusBar } from "react-native";

export const screenLayout = StyleSheet.create({
      padding: 16,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex: 1,
      // backgroundColor:colors.white1,
  })





