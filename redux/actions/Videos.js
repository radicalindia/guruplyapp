import AsyncStorage from "@react-native-async-storage/async-storage";
// import { http } from "../../utiles/AxiosInstance";
import { retrieveUser } from "../../utiles/authStorage";
import { http } from "../../utils/AxiosInstance";

export const getVid = (item) => async (dispatch) => {
    try {
        // const data = AsyncStorage.setItem("language",item)
        const {data} = await http.get("/",{params:{method:"vidos"}});
        console.log(data);
      dispatch({
        type: "GET_VIDEOS",
        payload: data?.videos,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_MINE_JOB_POST_FAILED",
        payload: "false",
      });
      console.log('Error retrieving creating:', error);
    }
  };
  
