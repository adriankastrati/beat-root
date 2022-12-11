import { useState } from "react";
import { createEmailPasswordAccount, loginEmailPasswordAccount } from "../../model/firebase/firebaseAuthenticationModel";
import SignInView from "../views/SignInView";

export default function AccountPresenter(){

  const [password, setPassword] = useState();
  const [email, setEmail] = useState<string>();
  const [accountErrorMessage, setAccountErrorMessage] = useState<string>()
  const [welcomeMessage, setWelcomeMessage] = useState<boolean>(false)

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
        }else{
          setWelcomeMessage(true)
        }

      }catch(e){
        console.log(e)
      }
    }
  }

  async function createAccountAttempt(){
    console.log(email,password)
    if (email && password){
     try{ 
      let error = await createEmailPasswordAccount(email,"", password)
      if(error){
        setAccountErrorMessage(error.errorMessage)
        setWelcomeMessage(false)
      }else{
        setAccountErrorMessage("Welcome to beat root!")
        setWelcomeMessage(true)
      }
    }catch(e){
        console.log(e)
      }
    }
  }

  //signinView currently in presenter since there is a issue with focus during rerendering
  return(
  <div>
    <SignInView
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