import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Share,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HorizontalPhotoScrollView2 from '../components/HorizontalView';
import Topbar from '../components/Topbar';
import {http} from '../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import { getVid } from '../redux/actions/Videos';

const HomeScreen = ({navigation}) => {
  const lang = useSelector(({user}) => user.language);
  console.log(lang);
  const optionsArray = [
    {
      key: '12',
      value: 'Gift Gallery',
      hindivalue: lang == 'hindi' ? 'उपहार गैलरी' : '',
      url: require('./../assets/gift.png'),
    },
    {
      key: '2',
      value: 'Offers',
      hindivalue: lang == 'hindi' ? 'ऑफर्स' : '',
      url: require('./../assets/email.png'),
    },
    // {
    //   key: '3',
    //   value: 'Notification',
    //   hindivalue: lang == 'hindi' ? 'सूचना' : '',
    //   url:require("./../assets/gift.png")

    // },
    {key: '4', value: 'Scan', hindivalue: lang == 'hindi' ? 'स्कैन' : '',   
       url:require("./../assets/qr-code-scan.png")
  },
    {
      key: '5',
      value: 'Scan History',
      hindivalue: lang == 'hindi' ? 'स्कैन हिस्ट्री' : '',
      url:require("./../assets/web-site.png")

    },
    {
      key: '6',
      value: 'Pdf Catalogues',
      hindivalue: lang == 'hindi' ? 'पीडीएफ कैटलॉग' : '',
      url:require("./../assets/document.png")

    },
    {
      key: '7',
      value: 'Share App',
      hindivalue: lang == 'hindi' ? 'एप्लिकेशन साझा करें' : '',
      url:require("./../assets/sharing.png")

    },
    {
      key: '8',
      value: 'Furniture Ideas',
      hindivalue: lang == 'hindi' ? 'फर्नीचर आइडियाज' : '',
      url:require("./../assets/sofa.png")

    },
    {
      key: '9',
      value: 'Site Pics',
      hindivalue: lang == 'hindi' ? 'साइट तस्वीरें' : '',
      url:require("./../assets/icons8-website-48.png")

    },
    {key: '10', value: 'Videos', hindivalue: lang == 'hindi' ? 'वीडियो' : '',
    url:require("./../assets/video.png")
  },
    {
      key: '11',
      value: 'Contact Us',
      hindivalue: lang == 'hindi' ? 'हमसे संपर्क करें' : '',
      url:require("./../assets/my-profile.png")

    },
  ];

  const [sliderData, setSliderData] = useState();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get('/', {params: {method: 'dashboard'}});
        setSliderData(response?.data?.slider);
        console.log(response?.data?.slider);
        dispatch(getVid());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
        // url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const Renderitem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.value == 'Share App') {
            onShare();
          } else {
            navigation.navigate(item.value);
          }
        }}
        style={[styles.box]}>
        <Image source={item.url} style={{height: 55, width: 55}} />
        <Text style={[styles.Text, {fontSize: lang == 'hindi' ? 14.5 : 13.5,color:"white"}]}>
          {lang == 'hindi' ? item.hindivalue : item.value}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{paddingHorizontal: 5, backgroundColor: '#120732', flex: 1}}>
      <Topbar />
      {loading ? (
        <ActivityIndicator style={{marginLeft: 'auto', marginRight: 'auto'}} />
      ) : (
        sliderData && <HorizontalPhotoScrollView2 slider={sliderData} />
      )}
      <FlatList
        data={optionsArray}
        contentContainerStyle={{paddingVertical: 10}}
        renderItem={Renderitem2}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: 'rgba(255,255,255,.3)',
    elevation: 2,
    margin: 3,
    height: 120,
    width: '32%',
    borderRadius: 5,
    justifyContent: "space-around",
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  Text: {
    fontSize: 13.5,
    fontWeight: 'bold',
  },
});
export default HomeScreen;
