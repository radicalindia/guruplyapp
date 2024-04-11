import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { http } from '../utils/AxiosInstance'
import { globalStyles } from '../utils/GlobalStyles'

const FurnitureIdeaimage = ({route}) => {
  const id = route?.params?.id
  console.log(id)
  const [ loading,setLoading]=useState(false);
  const [ data,setData]=useState()
  
  useEffect(() => {
    const call = async () => {
      setLoading(true); // Set loading to true before making the API request


      try {
        const response = await http.get('/', {
          params: {
            method: 'furnitureIdeaImage',
            categoryId:id
          },
        });

        // Handle the response as needed
        console.log('API Response2:', response.data?.package);
        setData(response.data?.package)
      } catch (error) {
        // Handle errors
        console.error('API Error:', error);
      } finally {
        setLoading(false); // Set loading to false after the API request is complete
      }
    };

    // Call the function to make the API request
    call();
  }, [id]); 
  
  return (
    <View style={[globalStyles.container2]}>
      {/* <Image spurce={{uri:data[0]?.img}} style={{width:"100%",height:300}}/> */}
    </View>
  )
}

export default FurnitureIdeaimage