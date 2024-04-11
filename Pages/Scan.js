import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Dimensions, Alert } from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  Camera,
} from 'react-native-vision-camera';
import Topbar from '../components/Topbar';
import { CustomButton } from '../components/CustomButton';
import { http } from '../utils/AxiosInstance';
import { CustomTextInput } from '../components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../utils/theme';

const Scan = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [ scanStatus ,setScanStatus]=useState(false);
  const [ code ,setCode]=useState()
  const [ loading,setLoading]=useState(false);
  const [ user,setUser]=useState();
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length == 1) {
        scan(codes[0].value);
      }
    },
  });

  useEffect(()=>{
    const get=async()=>{
      const data = await AsyncStorage.getItem("user");
      console.log(data);
      setUser(JSON.parse(data))
    }
    get()
  },[]);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app requires access to your camera.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            requestPermission(true);
          } else {
            requestPermission(false);
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestCameraPermission();
  }, []);

  const scan = async (id) => {
    try {
      setLoading(true); 
      console.log(id)

      const response = await http.get("/", {
        params: {
          method:"scratch",
          code :id,
          userId:user?.userId
        },
      });

      // Handle the response as needed
      console.log('API Response:', response.data);
    Alert.alert(response.data.response.message);
    setScanStatus(false)
    } catch (error) {
      // Handle errors
      console.error('API Error:', error);
      Alert.alert("Network Error")
    } finally {
      setLoading(false); // Set loading to false after the API request is complete
    }  };


  return (
    <View style={{flex:1,backgroundColor:theme.colors.primary,width:Dimensions.get('window').width,height:Dimensions.get('window').height,paddingHorizontal:10}}>
      <Topbar/>
      
      
      {!scanStatus?<CustomButton onPressfuntion={()=>setScanStatus(true)} text="Scan"/>:<CustomButton onPressfuntion={()=>setScanStatus(false)} text="Cancel"/>}

{     !scanStatus&& <CustomTextInput
                label={"Enter Code "}
                value={code}
                numeric={"numeric"}
                setValue={setCode}
                placeholder={"Code"}
                marginTop={"45%"}
            />}
      {hasPermission &&scanStatus&& device !== null && (
        <Camera
          style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,}}
          device={device}
          isActive={true}
          // resizeMode='contain'
          codeScanner={codeScanner}
        />
      )}
      {/* {loading?<ActivityIndicator size={"large"} color={theme.colors.primaryOpacity} style={{marginRight:"auto",marginLeft:"auto",marginTop:"10%"}}/>: */}
             <CustomButton loading={loading} onPressfuntion={()=>{scan(code)}} text={"submit"} marginTop={"20%"} width={120} />
                    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8d98ba',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '20%',
    flex: 1,
    height:"100%",
    width:"100%"
  },
});

export default Scan;
