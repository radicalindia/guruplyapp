const initialState = {
    data: null,
    submitloading:false,
    error:null,
    loading:false,
    language:null
    

  };
  
  const Videos= (state = initialState, action) => {
    switch (action.type) {
      case "GET_VIDEOS":
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };


     
      default:
        
        return state;
    }
  };
  
  export default Videos;
  