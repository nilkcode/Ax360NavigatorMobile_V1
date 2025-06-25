import { View,Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import  Icon  from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { setLastScreen } from "../redux/slices/navigationSlices";

const Footer = ({ activeRoute = "home", handlePressCenter , handlePressLeft, handlePressRight}) => {
  const navigate = useNavigation();

  const dispatch = useDispatch()


  const navigatationHandler = (key) => {
    switch (key) {
      case 0:
          // dispatch(setLastScreen('wom-mob-gemba-exercise-add-edit')) 
          // navigate.navigate('wom-mob-gemba-exercise-add-edit', {
          //   IsFormMode: true, // indicate read-only mode
          // })
        break;
      case 1:
        navigate.navigate("home");
        break;
     
      default:
        navigate.navigate("home");
        break;
    }
  };


  return (

    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
      className="bg-gray-200 shadow-white w-full"
    >
      {/* Row with icons */}
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePressLeft} style={{padding:16}} className="">
          <Text>
            <Icon name="home" size={30} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={handlePressRight} style={{padding:16}} className="">
          <Text>
            <Icon name="search" size={30} />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Floating center button */}
      <View
        style={{
          position: 'absolute',
          top: -42,
          left: '50%',
          transform: [{ translateX: -90 / 2 }],
          borderRadius: 50,
          borderColor: '#fff',
          borderWidth: 6,
          zIndex: 20,
        }}
        className="w-24 h-24 bg-blue-600 justify-center"
      >
        <View className="flex justify-center items-center">
          <TouchableOpacity activeOpacity={0.8} onPress={handlePressCenter}>
            <Text className="text-white">
              <Icon name="plus" size={40} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>

    
  );
};

export default Footer;