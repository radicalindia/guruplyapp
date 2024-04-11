import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Pages/HomeScreen';
import Scan from './Pages/Scan';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
import GiftGallery from './Pages/GiftGallery';
import MyProfile from './Pages/MyProfile';
import ScanHistory from './Pages/ScanHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { changeLang } from './redux/actions/userAction';
import Splash from './Pages/Splash';
import Video from './Pages/Video';
import FurnitureIdeas from './Pages/FurnitureIdeas';
import Pdf from './Pages/Pdf';
import FurnitureIdeaimage from './Pages/FurnitureideaImage';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch()
  React.useEffect(()=>{
   const fetch = async()=>{
    const d = await AsyncStorage.getItem("language")
    dispatch(changeLang(d));
   }
   fetch();
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
          name="Splash"
          component={Splash}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
          name="Videos"
          component={Video}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{title: 'Welcome',headerShown:false}}
        />
       <Stack.Screen
          name="Scan"
          component={Scan}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
          name="Gift Gallery"
          component={GiftGallery}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
          name="Scan History"
          component={ScanHistory}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
          name="Furniture Ideas"
          component={FurnitureIdeas}
          options={{title: 'Welcome',headerShown:false}}
        />
                <Stack.Screen
          name="FurnitureImage"
          component={FurnitureIdeaimage}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
          name="Pdf Catalogues"
          component={Pdf}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Welcome', headerShown: false }}
          />
        
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App