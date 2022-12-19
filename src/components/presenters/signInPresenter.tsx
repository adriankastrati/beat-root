import { useRef, useState } from "react";
import { connectSeries } from "tone";
import { createEmailPasswordAccount, loginEmailPasswordAccount } from "../../model/firebase/firebaseAuthenticationModel";
import SignInView from "../views/SignInView";

export default function SignInPresenter(){

    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();

    function handlePasswordChange(password:any){
        setPassword(password)
        passwordRef.current?.focus()

    }

    
    function handleEmailChange(email:any){
        setEmail(email)
        emailRef.current?.focus()
    }

    

    function logInAttempt(){   
        if (email && password)

        loginEmailPasswordAccount(email,password)
    }

    function createAccountAttempt(){
        if (email && password)
        createEmailPasswordAccount(email,"test",password)
    }
    
    //signinView currently in presenter since there is a issue with focus during rerendering
    return(
    // <div><SignInView
    //     onEmailChange={handleEmailChange}
    //     email={email}
    //     onPasswordChange={handlePasswordChange}
    //     password={password}
    //     onLogInAttempt={logInAttempt}
    //     onCreateAccountAttempt={createAccountAttempt}
    //     />
        <div> 
      <span>Welcome to Beat Root</span>
      
          <div>
            <div>e-mail</div>
            <input  id="email"
             type="text" 

            defaultValue={email}
            onChange={e=>{handleEmailChange(e.currentTarget.value)}}/>
          </div>
    
       
          <div>
            <div>password</div>
            <input id="password" 
            defaultValue={password}
            type="password" 
            onChange={e=>handlePasswordChange(e.currentTarget.value)}
            />
          </div>
        
          <button onClick={logInAttempt}>
            <input type="submit" value="Sign in"/>
          </button>
          <button onClick={createAccountAttempt}>
            <input type="submit" value="create account"/>
      
          </button>
    
    </div>
    );
}