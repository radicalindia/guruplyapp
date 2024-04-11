import AsyncStorage from "@react-native-async-storage/async-storage";
import { http } from "../../utiles/AxiosInstance";
import { retrieveUser } from "../../utiles/authStorage";

export const changeLang = (item) => async (dispatch) => {
    try {
        // const data = AsyncStorage.setItem("language",item)
      dispatch({
        type: "CHANGE",
        payload: item,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_MINE_JOB_POST_FAILED",
        payload: "false",
      });
      console.log('Error retrieving creating:', error);
    }
  };
  
