import theme from "./theme";

export const  globalStyles = {
    rowflex:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
        width:"100%"
    },
    searchBox: {
      backgroundColor:"rgba(255,255,255,.8)",
      
      // opacity:.8,
        height: 40,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 7,
        alignItems: 'center',
        elevation:1,
        marginVertical:10
      },
    rowflex2:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"

    },
    globalFontFamily:{
      fontFamily:"",
    },
    text:{
      color:"white",
      fontFamily:"",
      fontSize:16,
      fontWeight:"bold"
    },
    text2:{
        color:"white",
        fontFamily:"",
        fontSize:13,
        opacity:.8
        // fontWeight:"bold"
      },
    container:{
        width:"100%",
        height:"100%",
        backgroundColor :theme.colors.primary,
        paddingHorizontal:30,
        paddingVertical:30
        
    },
    container2:{
        width:"100%",
        height:"100%",
        backgroundColor:theme.colors.primary,
        paddingHorizontal:15,
        // paddingVertical:10,
        paddingBottom:70,

        
    },
    container3:{
        width:"100%",
        height:"100%",
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:10
        
    }

}