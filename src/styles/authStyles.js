import { StyleSheet } from 'react-native'


export const authStyles = StyleSheet.create({

    centerAlign:{
        flex: 1,
        alignItems:'center',
        marginTop:50,
    },
      
    emailView:{
        width:'90%',
        padding:10,
        margin:10,
        borderWidth:1
    },

    passwordView:{
        width:'90%',
        padding:10,
        margin:10,
        borderWidth:1
    },

    viewHeader:{
        fontSize:16,
    },

    textInput:{
        fontSize:22,
        width:'100%',
        marginTop:15,
        paddingBottom:10,
        borderBottomWidth:1,
        alignSelf:'center'
    },

    passwordRow:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },

    passwordIcon: {
        position:'absolute',
        right: -5,
       
        padding:10,
    },
    
    signInView:{
        width:'80%',
        backgroundColor:'#DCE5FD',
        alignItems:'center',
        marginTop: 10,
        borderRadius: 10,
    },

    //button start
    signInButton:{
        width:'100%',
        padding:10
    },

    signInText:{
        fontSize:22,
        alignSelf: 'center'
    },

    signUpView:{
        flexDirection: 'row',
        marginTop: 10
    },


    // red link start
    signUpLink:{
        
       color:'red',
       textDecorationLine:'underline',
       paddingHorizontal:5,
       fontSize:22,
    },

    signUpText:{
        fontSize:22,
        alignSelf: 'center'
    }
    // red link end


})