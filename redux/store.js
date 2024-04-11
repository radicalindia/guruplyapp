import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer';
import Videos from './reducers/Videos';




const reducer={
    user:userReducer,
    video:Videos

}
export const store = configureStore({
 reducer:reducer,
  devTools:true
})
export default store;