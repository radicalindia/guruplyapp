import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/GlobalStyles';
import Topbar from '../components/Topbar';
import Search from '../components/Search';
import theme from '../utils/theme';
import {http} from '../utils/AxiosInstance';
import {CustomButton} from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanHistory = () => {
  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const scanhistory = async () => {
      const data = await AsyncStorage.getItem('user');
      const json = JSON.parse(data);
      setLoading(true); // Set loading to true before making the API request

      try {
        const response = await http.get('/', {
          params: {
            method: 'scanHistory',
            userId: json?.userId,
          },
        });

        // Handle the response as needed
        console.log('API Response:', response.data);
        setData(response.data.service);
      } catch (error) {
        // Handle errors
        console.error('API Error:', error);
      } finally {
        setLoading(false); // Set loading to false after the API request is complete
      }
    };

    // Call the function to make the API request
    scanhistory();
  }, []);

  const getday = dateObject => {
    const d = dateObject.toLocaleDateString('en-US', {weekday: 'long'});
    const day = dateObject.getDay();
    return {d, day};
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.box,
          {borderColor: item == 'n' ? theme.colors.magenta : theme.colors.cyan},
        ]}>
        <View style={[styles.pointsBox]}>
          {/* <Text style={{fontSize:14,fontWeight:"bold",color:"black"}}>{item.point}</Text> */}
          <Text style={{fontSize: 22, fontWeight: 'bold',         color: "black",
              opacity:.8}}>
            {getday(new Date(item?.date)).day}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: -5,
              color: "black",
              opacity:.8
            }}>
            {getday(new Date(item?.date)).d?.substring(0, 3)}
          </Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={[globalStyles.text]}>Points {item.points}</Text>
          {/* <Text style={[globalStyles.text2]}>{item.description}</Text> */}

          {/* <CustomButton loading={loading} onPressfuntion={()=>{}} text={"Sign In"} marginTop={"20%"} /> */}
        </View>
      </View>
    );
  };

  return (
    <View style={[globalStyles.container2]}>
      <Topbar />
      <Search search={search} setSearch={setSearch} text={'Search'} />
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'black'}
          style={{marginTop: 50, marginLeft: 'auto', marginRight: 'auto'}}
        />
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 60}}
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          // numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 55,
    width: '99%',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.3)',
    marginLeft: 2,
    elevation: 3,
    // borderLeftWidth: 5,
    borderColor: theme.colors.cyan,
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsBox: {
    alignItems: 'center',
    width: 80,
    borderRightWidth: 5,
    borderColor: 'rgba(0,0,0,.1)',
    height: 55,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    justifyContent: 'center',
    backgroundColor: "#E1BD9D",
  },
});

export default ScanHistory;
