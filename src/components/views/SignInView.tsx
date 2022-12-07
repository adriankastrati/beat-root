import { LegacyRef, useRef } from "react";
import styled from "styled-components";

interface SignInViewProp{
  onEmailChange:(email:string)=>void,
  email: string|undefined
  onPasswordChange: (password:string)=>void,
  password: string|undefined,
  onLogInAttempt:() =>void,
  onCreateAccountAttempt:()=> void
}
export default function SignInView(props:SignInViewProp){

  const SignInContainer = styled.div``

  return (
    <SignInContainer> 
    <span>Welcome to Beat Root</span>
    
        <div>
          <div>e-mail</div>
          <input  id="email"
           type="text" 

          defaultValue={props.email}
          onChange={e=>{props.onEmailChange(e.currentTarget.value)}}/>
        </div>
  
     
        <div>
          <div>password</div>
          <input id="password" 
          defaultValue={props.password}
          type="text" 
          onChange={e=>props.onPasswordChange(e.currentTarget.value)}
          />
        </div>
      
        <button onClick={props.onLogInAttempt}>
          <input type="submit" value="Sign in"/>
        </button>
        <button onClick={props.onCreateAccountAttempt}>
          <input type="submit" value="create account"/>
    
        </button>
    </SignInContainer>
  );
  }