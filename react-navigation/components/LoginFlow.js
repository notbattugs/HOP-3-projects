import { useState } from "react";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
const LoginFlow = () => {
  const [isSignUp,setIsSignUp]=useState(true);
  if(isSignUp)return <SignUpScreen onSignIn={()=>setIsSignUp(false)}/>;
  return <>
  <SignInScreen/>
  </>;
};
export default LoginFlow;
