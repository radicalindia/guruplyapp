import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { changeLang } from '../redux/actions/userAction'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Topbar = () => {
  const dispatch = useDispatch()
  const lang = useSelector(({user})=>user.language);

  const changeLnaguagefun = ()=>{
      if(lang =="english"){
        AsyncStorage.setItem("language","hindi");
     dispatch(changeLang("hindi"))
      }
      else{
        AsyncStorage.setItem("language","english");
     dispatch(changeLang("english"))
      }
  }


  return (
    <View
    style={{
      // backgroundColor: 'rgba(255,255,255,.3)',
      width: '100%',
      height: 40,
      borderBottomWidth: 0.5,
      borderColor: 'rgba(255,255,255,.7)',
      marginBottom:5,
      flexDirection:"row",
      alignItems:"center"
    }}>
      <TouchableOpacity style={{marginLeft:"auto",marginRight:15}} onPress={()=>changeLnaguagefun()}>
        <Image source={require("./../assets/icons8-language-50.png")} style={{height:30,width:30}}/>
        </TouchableOpacity>
      <TouchableOpacity style={{marginRight:10}}><FontAwesome name="user-circle" size={25} color={"white"}/></TouchableOpacity>

    </View>
  )
}

export default Topbar