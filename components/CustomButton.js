import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import theme from '../utils/theme';

export const CustomButton = ({text, marginTop, onPressfuntion,loading,width}) => {
  return (
    <TouchableOpacity
    disabled={loading}
      onPress={onPressfuntion}
      style={{
        backgroundColor: "#E1BD9D",
        opacity: 0.8,
        width: width?width:'100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginTop,
        marginLeft:"auto",
        marginRight:"auto"
      }}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color="white"
          // style={{marginRight: 'auto', marginLeft: 'auto', marginTop: '10%'}}
        />
      ) : (
        <Text style={{fontSize: 15, color: 'black'}}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
