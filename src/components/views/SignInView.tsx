import {FormEvent} from "react";

interface SignInViewProp{
  onEmailChange:(emailEvent: string)=>void,
  email: string|undefined
  onPasswordChange: (password:string)=>void,
  password: string|undefined,
  onLogInAttempt:() =>void,
  onCreateAccountAttempt:()=> void
  errorMessage: string|undefined
  welcomeMessage: boolean
}

export default function SignInView(props:SignInViewProp){
  function handleLogin(event: FormEvent){
    event.preventDefault();
    props.onLogInAttempt()
  }

  function handleCreate(event: FormEvent){
    event.preventDefault();
    props.onCreateAccountAttempt()
  }

  return (
    <div>
      <span>Welcome to Beat Root</span>

          <form onSubmit={props.onLogInAttempt}>
            <div>
              <label>E-mail</label>
              <input type="text" name="email" onChange={e=>{props.onEmailChange(e.target.value)}} required/>
              
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" onChange={e=>{props.onPasswordChange(e.target.value)}} required/>
            </div>
            <button type="submit" onClick={handleLogin}>login</button>
            <span>New here? Join beat root</span>
            <button type="submit" onClick={handleCreate}>create a new account</button>
          </form>
          <div>{props.welcomeMessage? "heloo":props.errorMessage}</div>
        </div> );
}