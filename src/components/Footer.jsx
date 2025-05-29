import { View,Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import  Icon  from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { setLastScreen } from "../redux/slices/navigationSlices";

const Footer = ({ activeRoute = "home" }) => {
  const navigate = useNavigation();

  const dispatch = useDispatch()


  const navigatationHandler = (key) => {
    switch (key) {
      case 0:
         dispatch(setLastScreen('wom-mob-gemba-exercise-add-edit')) 
          navigate.navigate('wom-mob-gemba-exercise-add-edit')
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
     (
          <View
              className="bg-gray-200 shadow-white absolute  w-full bottom-0 py-2">
              <View className="flex-row items-center py-4" style={{justifyContent:'space-around'}}>
                  <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigatationHandler(1)}
                  >
                  <Text><Icon className="relative left-0" name="home" size={30} /></Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigatationHandler(2)}>
                      <Text className=""><Icon className="relative left-0" name="search" size={30} /></Text>

                  </TouchableOpacity>
              </View>

              <View style={{borderRadius:50,top:-42,right:160 , borderColor:'#fff',borderWidth:6}} className="absolute
               w-24 h-24 bg-blue-600 justify-center " >
                  <View className="flex justify-center items-center" >
                      <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => navigatationHandler(0)}>
                          <Text className="text-white"><Icon className="relative left-0" name="plus" size={40} /></Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
    )
  );
};

export default Footer;