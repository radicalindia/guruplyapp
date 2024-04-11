import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import theme from '../utils/theme';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import { http } from '../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();
    const [ loading,setLoading]=useState(false);
    useEffect(()=>{
    const check = async()=>{
        const data = await AsyncStorage.getItem("user")
        if(data){
            navigation.replace("Home")
        }
    }
    },[])


    const login = async () => {
        setLoading(true)
        const obj={
            mobile:mobile?.trim(),
            password: password?.trim()
        }
        http.get('/', {
            params: {
                method: 'login',
                ...obj
            }
        })
            .then(response => {
                console.log('Response:', response.data);
                if(response.data.response?.message){
                    setLoading(false)
                    return Alert.alert(response.data.response?.message)
                }
                setLoading(false);
                const obj2= {
                    ...obj,
                    userId:response.data.response?.userId
                }
                AsyncStorage.setItem("user",JSON.stringify(obj2));
                navigation.replace("Home")
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false)
            });
    }

    return (
        <View style={[globalStyles.container]}>
            <Text style={[globalStyles.text, { fontSize: 22, marginTop: 70 }]}>Welcome Back!</Text>
            <Text style={[globalStyles.text2]}>Sign in to continue</Text>
            {/* <View style={[globalStyles.rowflex, { marginTop: 50 }]}>
                <TouchableOpacity style={[styles.googleButton]}>
                    <Image source={require("../assests/images/fb.png")} />
                    <Text style={[styles.buttonText]}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.googleButton]}>
                    <Image source={require("../assests/images/google.png")} />
                    <Text style={[styles.buttonText]}>Google</Text>
                </TouchableOpacity>
            </View> */}
            {/* <CustomTextInput
     label={"Name"}
     value={name}
     setValue={setName}
     placeholder={"Enter Your Name"}
     marginTop={"35%"}
     /> */}
            <CustomTextInput
                label={"Mobile Number"}
                value={mobile}
                numeric={"numeric"}
                setValue={setMobile}
                placeholder={"Enter Your Mobile Number"}
                marginTop={"45%"}
            />
            <CustomTextInput
                label={"Password"}
                value={password}
                setValue={setPassword}
                placeholder={"Enter Password"}
                marginTop={"5%"}
            />
            <TouchableOpacity style={{ marginLeft: "auto", marginTop: 20 }}><Text style={{ color: theme.colors.primaryOpacity }}>Forgot Password?</Text></TouchableOpacity>
            {loading?<ActivityIndicator size={"large"} color={theme.colors.primaryOpacity} style={{marginRight:"auto",marginLeft:"auto",marginTop:"10%"}}/>:
             <CustomButton onPressfuntion={()=>login()} text={"Sign In"} marginTop={"20%"} />
                    }            
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                <Text style={[globalStyles.text2]}>Don't have an account ? </Text>
                <TouchableOpacity>
                    <Text style={{ color: theme.colors.primaryOpacity, fontWeight: "bold" }}> Register now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    googleButton: {
        width: "40%",
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "white",
        height: 40,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonText: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",

    }
})

export default Login