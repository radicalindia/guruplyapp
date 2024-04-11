import React, { useEffect, useState } from 'react';
import {StyleSheet, Dimensions, View, Platform, ActivityIndicator, FlatList,Text, TouchableOpacity, Modal} from 'react-native';
import Pdf from 'react-native-pdf';
import { http } from '../utils/AxiosInstance';
import theme from '../utils/theme';
import { globalStyles } from '../utils/GlobalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const source = {
  uri: 'https://www.sellpe.in/gurudevply/images/pdf/Transformable-Furniture.pdf',
  cache: true,
};
const PdfPage = () => {
    const [ link,setLink]=useState();
    const [ loading,setLoading]=useState();
    const [ modalvisible,setModalvisible]=useState(false)

    useEffect(() => {
        const call= async () => {
          setLoading(true); // Set loading to true before making the API request
    
    
          try {
            const response = await http.get('/', {
              params: {
                method: 'pdf',
              },
            });
    
            // Handle the response as needed
            console.log('API Response:', response.data.package);
            setLink(response.data?.package)
          } catch (error) {
            // Handle errors
            console.error('API Error:', error);
          } finally {
            setLoading(false); // Set loading to false after the API request is complete
          }
        };
    
        // Call the function to make the API request
        call();
      }, []);
      const renderItem=({item})=>{
        return (
            <TouchableOpacity onPress={()=>{setModalvisible(true); setLink(item.pdf)}} style={[styles.box,{borderColor:item=='n'?theme.colors.magenta:theme.colors.cyan}]}>
            <FontAwesome name="file-pdf" color={"white"} size={30}/>
              <View style={{marginLeft:10}}>
              <Text style={[globalStyles.text,{fontSize:20}]}>{item.name}</Text>
              {/* <Text style={[globalStyles.text2]}>{item.description}</Text> */}
            
             {/* <CustomButton loading={loading} onPressfuntion={()=>{}} text={"Sign In"} marginTop={"20%"} /> */}
                    
              </View>
            </TouchableOpacity>
        )
    }
 

  return (
    <View style={[globalStyles.container2,{paddingVertical:20}]}>

{loading?<ActivityIndicator size={"large"} color={"black"} style={{marginTop:50,marginLeft:"auto",marginRight:"auto"}}/>:
        <FlatList
        contentContainerStyle={{paddingBottom:60}}
        data={link}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        // numColumns={2}
      />}

      <Modal visible={modalvisible} onRequestClose={()=>setModalvisible(false)} transparent={true}>
      {link&&      
     <Pdf
        source={{uri:link}}
        trustAllCerts={Platform.OS === 'ios'}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />}
      </Modal>
    </View>
  );
};

export default PdfPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  box:{
    height:55,
    width:"99%",
    borderRadius:10,
    backgroundColor:"rgba(255,255,255,.3)",
    marginLeft:2,
    elevation:2,
    borderLeftWidth:5,
    borderColor:theme.colors.cyan,
    marginVertical:7,
    flexDirection:"row",
    paddingHorizontal:20,
    alignItems:"center"

},
});
