import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import theme from '../utils/theme';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { navigate } from '../App';
// import { addNavREf } from '../redux/actions/navigationREf';
import { useNavigation } from '@react-navigation/native';
import { http } from '../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateAccount = ({}) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [ city , setCity]=useState();
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [phone, setPhone] = useState();
    const genderArray = ["male", "female", "other"];
    const [ loading,setLoading]=useState(false);
    // const dispatch = useDispatch()
    const navigation = useNavigation()


    const createAccount = async() => {
        setLoading(true);
        const obj = {
            name: name?.trim(),
            mobile:phone?.trim(),
            password: password?.trim(),
            city: city?.trim(),
        }

        try {
            const response = await http.get('/', {
              params: {
                method: 'register',
               ...obj
              },
            });
        
            // Handle the response as needed
            console.log('API Response:', response.data);
            if(response.data.response?.message){
                setLoading(false)
                return Alert.alert(response.data.response?.message)
            }
            const obj2= {
                ...obj,
                userId:response.data.response?.userId
            }
            AsyncStorage.setItem("user",JSON.stringify(obj2));
            setLoading(false)
            navigation.replace("Home")

          } catch (error) {
            // Handle errors
            setLoading(false)
            console.error('API Error:', error);
          }
        
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "white",flex:1 }}>
            <Text style={[globalStyles.text, { fontSize: 22, marginTop: 20 }]}>Create Account!</Text>
            <Text style={[globalStyles.text2]}>Sign up to continue</Text>
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
            <CustomTextInput
                label={"Name"}
                value={name}
                setValue={setName}
                placeholder={"Enter Your Name"}
                marginTop={"55%"}
            />
            <CustomTextInput
                label={"City"}
                value={city}
                setValue={setCity}
                placeholder={"Enter Your City"}
                marginTop={"5%"}
            />
     
            {/* <View style={{ height: 70, marginTop: "5%" }} >
                <Text style={{ color: "black", opacity: .3, marginBottom: 15 }}>Gender</Text>
                <ScrollView horizontal>
                    {genderArray.map((item) => (
                        <TouchableOpacity onPress={() => setGender(item)} style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 10, borderRadius: 10, paddingVertical: 3, borderWidth: 1, borderColor: theme.colors.primaryOpacity, marginRight: 30, backgroundColor: item == gender ? theme.colors.primaryOpacity : "white" }}>
                            <Text style={{color:item==gender?"white":"black"}}>{item}</Text></TouchableOpacity>
                    ))}
                </ScrollView>
            </View> */}
            <CustomTextInput
                label={"Phone"}
                value={phone}
                setValue={setPhone}
                placeholder={"Enter phone number"}
                numeric={"numeric"}
                marginTop={"5%"}
            />

            <CustomTextInput
                label={"Password"}
                value={password}
                setValue={setPassword}
                placeholder={"Create Your Password"}
                marginTop={"5%"}
            />
            {loading?<ActivityIndicator size={"large"} color={theme.colors.primaryOpacity} style={{marginRight:"auto",marginLeft:"auto",marginTop:"10%"}}/>:
             <CustomButton onPressfuntion={()=>createAccount()} text={"Sign Up"} marginTop={"10%"} />
                    }
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                <Text style={[styles.text2]}>Already have an account ? </Text>
                <Text style={{ color: theme.colors.primaryOpacity, fontWeight: "bold" }}> Log in now</Text>
            </View>
        </ScrollView>
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

export default CreateAccount