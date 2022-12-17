import {FormEvent} from "react";
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { textStyles, theme } from "../../common";

export const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:40px;
  border: 1px solid ${theme.medium};
  align-items: center;
`
export const Input = styled.input`
  width:100%;
  @media (min-width: 475px) {
    width: 350px;
  }
  @media (max-width: 290px) {
    width: 120px;
  }
`
export const InnerBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:2px;
  padding: 5px;
  align-items: center;
`
export const InputBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:2px;
  padding: 5px;
`

export const TitleStyle = styled.div`
  font-size:18px;
  margin:10px;
  text-align: center;
`
export const ResultStyle = styled.div<LoginProps>`
  font-size:16px;
  margin:10px;
  text-align: center;
  color: ${props => props.success ? "green": "red"};
`
// const Center = styled.div`
// align-items: center;
// align-self: center;
// margin: 0 auto;
// `

interface LoginProps{
  success: boolean
}

interface SignInViewProp{
  onEmailChange:(emailEvent: string)=>void,
  email: string|undefined
  onPasswordChange: (password:string)=>void,
  password: string|undefined,
  onLogInAttempt:() =>void,
  onCreateAccountAttempt:()=> void
  errorMessage: string|undefined
  welcomeMessage: boolean
  resetPasswordPrompt: boolean
  onResetPassword: ()=> void
}

function SignInView(props:SignInViewProp){
  function handleLogin(event: FormEvent){
    event.preventDefault();
    props.onLogInAttempt()
  }

  function handleCreate(event: FormEvent){
    event.preventDefault();
    props.onCreateAccountAttempt()
  }


  return (
    <OuterBox>
      <TitleStyle>Welcome to Beat Root</TitleStyle>
          
            <form onSubmit={props.onLogInAttempt}>
              <InnerBox>
              <InputBox>
                <label>E-mail</label>
                <Input type="text" name="email" onChange={e=>{props.onEmailChange(e.target.value)}} required/>
                </InputBox>
              
              <InputBox>
                <label>Password</label>
                <Input type="password" name="password" onChange={e=>{props.onPasswordChange(e.target.value)}} required/>
                </InputBox>
              
              </InnerBox>
              <InnerBox>
                  <MainButton type={MainButtonType.Plain} text="login" onClick={handleLogin} scale = {0.75} width = {67}></MainButton>
                  <span>New here? Join Beat Root!</span>
                  <MainButton type={MainButtonType.Plain} text="create a new account" onClick={handleCreate} scale = {0.75} width = {234} ></MainButton>
             </InnerBox>
            </form>

         
          <ResultStyle success = {props.welcomeMessage}>{props.welcomeMessage? "Login success!":props.errorMessage}</ResultStyle>
          

          {props.resetPasswordPrompt?
          <MainButton type={MainButtonType.Plain} onClick={props.onResetPassword} text="Click to get a password reset mail" scale = {0.75} width = {234}></MainButton>:
          null
          }

        </OuterBox> );
}
export default SignInView;