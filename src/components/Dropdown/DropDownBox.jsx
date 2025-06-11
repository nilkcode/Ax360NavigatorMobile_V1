
import { View, Text, TextInput, TouchableOpacity , FlatList, Modal, StyleSheet, Alert} from 'react-native'
import React,{useState} from 'react'
import { useTheme } from '../../contexts/ThemeContext';
import { themes } from '../../contexts/theme';
const DropDownBox = ({data = [], dropdownLabel ,dropDownValue ,placeholder = '', onSelect, selectedValue, }) => {
  const[visible, setVisible] = useState(false);
  const [selectedSiteValue, setSelectedSiteValue] = useState(selectedValue)
  const [search, setSearch] = useState('')
  const {theme} = useTheme()

  // const filteredData = data.filter(item => item[dropdownLabel] ?? '').toLocaleLowerCase().includes(search.toLocaleLowerCase())

  const filteredData = data.filter(item => typeof item[dropdownLabel] === "string" && item[dropdownLabel].toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  
  const handleSelect = (item) => {
     let valueSelected = item[selectedValue]
     setSelectedSiteValue(valueSelected);
     onSelect(valueSelected);
     setVisible(false);
     setSearch('')
  }

  const handlePressDropDown = () => {
      setVisible(true);
  }

  return (
    <>
       <View >
           {/* {label && <Text className="" style={styles.label}>{label}</Text>} */}

           <TouchableOpacity onPress={handlePressDropDown} 
            className={`border border-gray-700 flex flex-col justify-center ${themes[theme].formInput}  ${themes[theme].bgPrimary}
                    px-4 h-[50px] text-lg  rounded-full `}>
               <Text className={`${themes[theme].formInput}`} >
                  {dropDownValue || placeholder}
               </Text>
           </TouchableOpacity>
           <Modal visible={visible} transparent animationType='fade'>
               <TouchableOpacity style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', padding: 12 }} activeOpacity={10} onPressOut={() => setVisible(false)}>
                  <View className={`${themes[theme].bgPrimary} rounded-3xl px-4 py-2 m-2 max-h-[55%] `}>
                       <TextInput placeholder='Search...' value={search} onChangeText={setSearch} className={` border-b text-lg font-normal ${themes[theme].formInput} ${theme === "light" ? 'border-blue-400' : 'border-blue-400'}`}  placeholderTextColor={`${theme === "light" ? '#9ca3af' : '#9ca3af'}`}/>
                       <FlatList data={filteredData} 
                        keyExtractor={(item,index) => item?.Id?.toString() ?? index.toString()} 
                       renderItem={({item}) => (
                        <TouchableOpacity onPress={() => handleSelect(item)}  className={`border-b px-1 p-4 ${theme === "light" ? 'border-neutral-500/20' : 'border-neutral-500/20'}`}>
                            <Text className={`text-lg font-normal ${themes[theme].formLabel}`}>{item[dropdownLabel]}</Text>
                        </TouchableOpacity>
                       )}
                       ListEmptyComponent={<Text className={`py-4 text-lg justify-center text-center font-normal ${themes[theme].formLabel}`}>No results found</Text>}
                       />
                  </View>
               </TouchableOpacity>
           </Modal>
       </View>

    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    
  },
 
});

export default DropDownBox