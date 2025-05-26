// components/InputsTextBox/SearchInputBox.js
import React, { useCallback,useRef, useMemo, useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import debounce from 'lodash.debounce';
import Icon from 'react-native-vector-icons/Ionicons'

const SearchInputBox = ({ placeholder = 'Search...', onSearch, delay = 300, style, inputStyle }) => {

 const [searchText, setSearchText]  = useState('')
 const inputRef =  useRef(null)

  const debouncedSearch = useMemo(
    () => debounce((text) => onSearch?.(text), delay),
    [onSearch, delay]
  );

  const handleChange = useCallback((text) => {
    setSearchText(text)
    debouncedSearch(text);
  }, [debouncedSearch]);

  const handleClearText = () => {
     setSearchText('');
     onSearch('')
  }
    const focusInput = () => {
     Alert.alert("focuse")
    inputRef.current?.focus();
     setSearchText(text)
  };

  return (
    <View className="pl-2 pr-5 m-4 flex-row justify-between items-center  bg-[#f0f0f0] py-1 rounded-full  border-neutral-800">
      <TextInput
        ref={inputRef}
        className="text-lg text-nau"
        placeholder={placeholder}
        onChangeText={handleChange}
        style={[inputStyle]}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        value={searchText}
      /> 
      <View className="flex-row justify-center ">
         {searchText.length > 0  ?   
         <TouchableOpacity> <Icon name='close' size={23}  color={'#f87171'} onPress={handleClearText} /> </TouchableOpacity>
        : <TouchableOpacity onPress={focusInput}><Icon name='search' size={23}  color={'#a3a3a3'} /></TouchableOpacity> }
      </View>
      
      
    </View>
  );
};



export default SearchInputBox;

