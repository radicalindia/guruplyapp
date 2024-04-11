import { View, Text, TextInput } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../utils/GlobalStyles';

const Search = ({Search , setSearch,width,text}) => {
  return (
    <View style={[globalStyles.rowflex, globalStyles.searchBox,{width:width}]}>
    <MaterialIcons name="search" color="#35383F" size={20} />
    <TextInput
      style={{ width: '90%' }}
      placeholder={text}
      value={Search}
      onChangeText={(e) => setSearch(e)}
      placeholderTextColor={'#35383F'}
    />
  </View>
  )
}

export default Search