import { redirect } from "common";
import CreateAccountView from "components/views/CreateAccountView";
import { createEmailPasswordAccount } from "model/firebase/firebaseAuthenticationModel";
import { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

function CreateAccountPresenter(props:RouteComponentProps){
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();

    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();

    const [accountErrorMessage, setAccountErrorMessage] = useState<string>()
    const [welcomeMessage, setWelcomeMessage] = useState<boolean>(false)

    function handlePasswordChange(password:any){
        setPassword(password)
    }
    
    function handleEmailChange(email:string){
        setEmail(email)
    }
    
    function handleUsernameChange(username:string){
        setUsername(username)
    }

    function handlePasswordCheckChange(usernameCheck: any){
        setPasswordCheck(usernameCheck)
    }

    async function createAccountAttempt(){
        if (email && password && username && passwordCheck){
            if(passwordCheck !== password){
                setAccountErrorMessage("Not matching passwords")
                setWelcomeMessage(false)

            }else{
            try{ 
            let error = await createEmailPasswordAccount(email, username, password)
            if(error){
            setAccountErrorMessage(error.errorMessage)
            setWelcomeMessage(false)
            }else{
            setAccountErrorMessage("Welcome to beat root!")
            setWelcomeMessage(true)
            redirect(props,'/play/explore',1000);
            }
        }catch(e){
            console.log(e)
            }
        }
        }else{
            setAccountErrorMessage("Missing field")
        }
    }

    return(
        <div>
            <CreateAccountView
                onEmailChange={handleEmailChange}
                email={email}

                onPasswordChange={handlePasswordChange}
                password={password}

                onPasswordCheckChange={handlePasswordCheckChange}
                passwordCheck ={passwordCheck}

                username={username}
                onUsernameChange= {handleUsernameChange}



                onCreateAccountAttempt={createAccountAttempt}


                errorMessage ={accountErrorMessage}
                welcomeMessage = {welcomeMessage}
            />
        </div>
    );
}
export default withRouter(CreateAccountPresenter)