import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#529edd",
  },
  centerAlign: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },

  pageHeader: {
    fontSize:18,
    fontWeight:'bold',
  },

  inputView: {
    width: "90%",
    padding: 10,
    margin: 10,
  },

  passwordView: {
    width: "90%",
    padding: 10,
    margin: 10,
  },

  
  viewHeader: {
    fontSize: 12,
  },

  textInput: {
    fontSize: 14,
    width: "100%",
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    alignSelf: "center",
  },
  

  passwordRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  passwordIcon: {
    position: "absolute",
    right: -5,
    padding: 10,
  },

  submitButtonView: {
    width: "90%",    
    alignItems: "center",
    margin: 10,
    padding: 10,
  },

  //button start
  submitButton: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#DCE5FD",
  },

  submitButtonText: {
    fontSize: 22,
    alignSelf: "center",
  },

   // red link start
  bottomNavView: {
    flexDirection: "row",
    marginTop: 10,
  },

 
  bottomNavLink: {
    color: "red",
    textDecorationLine: "underline",
    paddingHorizontal: 5,
    fontSize: 14,
  },

  bottomNavText: {
    fontSize: 14,
    alignSelf: "center",
  },
 
});
