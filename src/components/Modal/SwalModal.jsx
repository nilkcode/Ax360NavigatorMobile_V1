import { View, Text,  StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { themes } from '../../contexts/theme';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../Buttons/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'

const SwalModal = ({ titleCan, titleConf, show, onCancel, onConfirm, children }) => {


  const { theme } = useTheme()

    return (
     

        <Modal isVisible={show}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={500}
            animationOutTiming={500}
            avoidKeyboard
            style={{}}>
            <View >
                <View className={`${themes[theme].bgPrimary} flex-col gap-2 rounded-3xl px-2 py-12 m-4`} >
                    <View>
                        {children}
                    </View>
                    <View className="flex-row justify-center gap-4 mt-4">
                        <Button title={titleCan} size="small" onPress={onCancel} />
                        <Button title={titleConf} size="small" className="bg-red-500" onPress={onConfirm} />
                    </View>

                </View>
            </View>
        </Modal>
           
        
    )
}


export default SwalModal;