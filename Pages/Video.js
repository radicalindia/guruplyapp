import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import theme from '../utils/theme';

const Video = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/`;
  const videos= useSelector(({video})=>video?.data)
  console.log(videos);

  return (
    <View style={styles.container}>
   

      <FlatList
        contentContainerStyle={{paddingBottom:60}}
        data={videos}
        renderItem={({item})=>(  
            <View style={{height:250,width:"100%",paddingHorizontal:5,marginVertical:10}}>
                <Text style={{fontSize:18,fontWeight:"bold",marginLeft:10,color:"white"}}>{item.title}</Text>     
        <WebView
            source={{ uri: embedUrl+item.link }}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
                 </View>
)}
        keyExtractor={(_, index) => index.toString()}
        // numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.primary
  },
});

export default Video;
