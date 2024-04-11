import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import Topbar from '../components/Topbar';
import Search from '../components/Search';
import theme from '../utils/theme';
import { http } from '../utils/AxiosInstance';
import { CustomButton } from '../components/CustomButton';

const FurnitureIdeas = ({navigation}) => {
    const [search,setSearch]=useState();
    const [ data ,setData]=useState();
    const [ loading,setLoading]=useState();

    useEffect(() => {
        const callGiftsApi = async () => {
          setLoading(true); // Set loading to true before making the API request
    
    
          try {
            const response = await http.get('/', {
              params: {
                method: 'furnitureIdea',
              },
            });
    
            // Handle the response as needed
            console.log('API Response:', response.data);
            setData(response.data?.package)
          } catch (error) {
            // Handle errors
            console.error('API Error:', error);
          } finally {
            setLoading(false); // Set loading to false after the API request is complete
          }
        };
    
        // Call the function to make the API request
        callGiftsApi();
      }, []); 

    const renderItem=({item})=>{
        return (
            <TouchableOpacity onPress={()=>navigation.navigate("FurnitureImage",{id:item?.ideaCategoryId})} style={[styles.box,{borderColor:item=='n'?theme.colors.magenta:theme.colors.cyan}]}>
            <Image source={{uri:item.thumbnail}} style={{height:150,width:"90%"}} resizeMode='contain'/>
             <Text style={[globalStyles.text,{marginTop:10,fontSize:20}]}>{item.categoryName}</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View style={[globalStyles.container2]}>
        <Topbar/>
        {/* <Search search={search} setSearch={setSearch} text={"Search"}/> */}
        {loading?<ActivityIndicator size={"large"} color={"black"} style={{marginTop:50,marginLeft:"auto",marginRight:"auto"}}/>:
        <FlatList
        contentContainerStyle={{paddingBottom:60}}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        // numColumns={2}
      />}
    </View>
  )
}

const styles = StyleSheet.create({
    box:{
        // height:55,
        width:"99%",
        borderRadius:10,
        backgroundColor:"rgba(255,255,255,.3)",
        marginLeft:2,
        elevation:2,
        borderLeftWidth:5,
        borderColor:theme.colors.cyan,
        marginVertical:7,
        // flexDirection:"row",
        alignItems:"center",justifyContent:"space-between",
        padding:20

    },
    pointsBox:{alignItems:'center',width:80,borderRightWidth:5,borderColor:"rgba(0,0,0,.1)",height:55,justifyContent:"center"}
})

export default FurnitureIdeas