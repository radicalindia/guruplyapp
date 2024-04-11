const initialState = {
    data: null,
    submitloading:false,
    error:null,
    loading:false,
    language:null
    

  };
  
  const userReducer= (state = initialState, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          language: action.payload,
          loading: false,
          error: null,
        };


     
      default:
        
        return state;
    }
  };
  
  export default userReducer;
  