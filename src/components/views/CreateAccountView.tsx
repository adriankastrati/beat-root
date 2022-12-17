import { FormEvent } from "react"
import MainButton, { MainButtonType } from "./common/MainButton"
import { OuterBox, TitleStyle, InnerBox, InputBox, Input, ResultStyle } from "./SignInView"

interface CreateAccountViewProps{
    onEmailChange:(emailEvent: string)=>void,
    email: string|undefined

    onPasswordChange: (password:string)=>void,
    password: string|undefined,

    onPasswordCheckChange:(passwordCheck: string)=>void
    passwordCheck: string|undefined

    username: string|undefined,
    onUsernameChange: (username: string)=>void,

    onCreateAccountAttempt:()=> void,
    
    errorMessage: string|undefined,
    welcomeMessage: boolean
}

export default function CreateAccountView(props: CreateAccountViewProps){
    function handleCreateAccount(event: FormEvent){
        event.preventDefault();
        props.onCreateAccountAttempt()
      }
    
    
      return (
        <OuterBox>
          <TitleStyle>Create a new account at Beat Root</TitleStyle>
              
                <form onSubmit={props.onCreateAccountAttempt}>
                  <InnerBox>
                        <InputBox>
                            <label>E-mail</label>
                            <Input type="text" name="email" onChange={e=>{props.onEmailChange(e.target.value)}} required/>
                        </InputBox>

                        <InputBox>
                            <label>Username</label>
                            <Input type="text" name="Username" onChange={e=>{props.onUsernameChange(e.target.value)}} required/>
                        </InputBox>

                        <InputBox>
                            <label>Password</label>
                            <Input type="password" name="password" onChange={e=>{props.onPasswordChange(e.target.value)}} required/>
                        </InputBox>
                    
                        <InputBox>
                            <label>Re-enter password</label>
                            <Input type="password" name="password" onChange={e=>{props.onPasswordCheckChange(e.target.value)}} required/>
                        </InputBox>
                    
                        <MainButton type={MainButtonType.Plain} text="create a new account" onClick={handleCreateAccount} scale = {0.75} width = {234} ></MainButton>
                    </InnerBox>
                </form>
    
             
              <ResultStyle success = {props.welcomeMessage}>{props.welcomeMessage? "Login success!":props.errorMessage}</ResultStyle>
              
    
            </OuterBox> );
    
} 