import { useState } from "react";
import { createEmailPasswordAccount, loginEmailPasswordAccount, resetPassword } from "../../model/firebase/firebaseAuthenticationModel";
import SignInView from "../views/SignInView";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { redirect } from "common";

function AccountPresenter(props:RouteComponentProps){

  const [password, setPassword] = useState();
  const [email, setEmail] = useState<string>();
  const [accountErrorMessage, setAccountErrorMessage] = useState<string>()
  const [welcomeMessage, setWelcomeMessage] = useState<boolean>(false)
  const[resetPasswordPrompt, setResetPasswordPrompt] = useState(false)

  function handlePasswordChange(password:any){
      setPassword(password)
  }

  function handleEmailChange(email:string){
      setEmail(email)
  }
  
  async function logInAttempt(){
    if (email && password){
      try{
        let error = await loginEmailPasswordAccount(email,password);
        if (error){
          setAccountErrorMessage(error.errorMessage)
          setWelcomeMessage(false)
          if(error.errorMessage === "Incorrect password"){
            setResetPasswordPrompt(true)
          }
        }else{
          setWelcomeMessage(true)
          redirect(props,'/play/explore',1000);
        }

      }catch(e){
      }
    }
  }

  async function createAccountAttempt(){
    redirect(props,'/create-account',500);
  }

  function sendPasswordResetMail(){
    if (email)
      resetPassword(email)
  }
  
  return(
  <div>
    <SignInView
        onResetPassword = {sendPasswordResetMail}
        resetPasswordPrompt={resetPasswordPrompt}
        onEmailChange={handleEmailChange}
        email={email}
        onPasswordChange={handlePasswordChange}
        password={password}
        onLogInAttempt={logInAttempt}
        onCreateAccountAttempt={createAccountAttempt}
        errorMessage ={accountErrorMessage}
        welcomeMessage = {welcomeMessage}
      />
  </div>
  );
}
export default withRouter(AccountPresenter);