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
const Input = styled.input`
  width:100%;
  @media (min-width: 475px) {
    width: 350px;
  }
  @media (max-width: 290px) {
    width: 120px;
  }
`
const InnerBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:2px;
  padding: 5px;
`

const TitleStyle = styled.div`
  font-size:18px;
  margin:10px;
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
                <Input type="text" name="email" onChange={e=>{props.onEmailChange(e.target.value)}} required/>
                
              
                <label>Password</label>
                <Input type="password" name="password" onChange={e=>{props.onPasswordChange(e.target.value)}} required/>
              </InnerBox>
              <InnerBox>
                <Center>
                  <MainButton type={MainButtonType.Plain} text="login" onClick={handleLogin} scale = {0.75} width = {67}></MainButton>
                </Center> 
                <Center> 
                  <span>New here? Join Beat Root!</span>
                </Center>
                <Center>
                  <MainButton type={MainButtonType.Plain} text="create a new account" onClick={handleCreate} scale = {0.75} width = {234} ></MainButton>
                </Center>
             </InnerBox>
            </form>
       
          <div>{props.welcomeMessage? "heloo":props.errorMessage}</div>
          </Center>
        </OuterBox> );
}