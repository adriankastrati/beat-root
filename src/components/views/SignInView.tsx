import {FormEvent} from "react";
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { textStyles, theme } from "../../common";

const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:40px;
  border: 1px solid ${theme.medium}
`
const InnerBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:20px;
  padding: 20px;
`
const TitleStyle = styled.div`
  font-size:18px;
  margin:0px;
  text-align: center;
`
const Center = styled.div`
align-items: center;
align-self: center;
margin: 0 auto;
`


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
    <OuterBox>
      <Center>
      <TitleStyle>Welcome to Beat Root</TitleStyle>
          
            <form onSubmit={props.onLogInAttempt}>
              <InnerBox>
                <label>E-mail</label>
                <input type="text" name="email" onChange={e=>{props.onEmailChange(e.target.value)}} required/>
                
              
                <label>Password</label>
                <input type="password" name="password" onChange={e=>{props.onPasswordChange(e.target.value)}} required/>
              
              </InnerBox>
              <MainButton type={MainButtonType.Plain} text="login" onClick={handleLogin} scale = {0.75} width = {67}></MainButton>
              <span>New here? Join beat root</span>
              <MainButton type={MainButtonType.Plain} text="create a new account" onClick={handleCreate} scale = {0.75} width = {234} ></MainButton>
            </form>
       
          <div>{props.welcomeMessage? "heloo":props.errorMessage}</div>
          </Center>
        </OuterBox> );
}