import styled from "styled-components"
import MainButton, { MainButtonType } from "components/views/common/MainButton"
import { theme } from "common"
import { useHistory } from "react-router-dom"

//<StandardContainer>
//    <h2>FIND YOUR THEME</h2>
//</StandardContainer>
//<RowItems>
//    <ThemeIMG src="https://firebasestorage.googleapis.com/v0/b/beat-root-a8d72.appspot.com/o/about%2FCompleteThemedBeat.png?alt=media&token=5aa1465f-8954-4ac0-94b5-c790ec11bed2"></ThemeIMG>
//    <ThemeIMG src="https://firebasestorage.googleapis.com/v0/b/beat-root-a8d72.appspot.com/o/about%2FCompletethemePicker.png?alt=media&token=b01b5228-cfa5-4753-afcb-b99aaf2cb42f"></ThemeIMG>
//</RowItems>

const AboutPage = () => {
    let history = useHistory()
    return (
        <AboutWrapper>
            <StandardContainer>
                <h1>Euclidean rhythms</h1>
                <Paragraph>
                    <p>
                        *the app* builds on an idea discovered in 2004 by Godfried Toussaint - 
                        using the euclidean algorithm to generate "silences" and "pulses" to 
                        construct rhythms. By defining a number of *steps* to distribute a number
                        of *pulses* over a unique and intresting rhythm can be aquired. In our app you 
                        can combine multiple rhythms into a beat, share it on our platform, and explore the creations of others. 
                    </p>  
                    <p>
                        For those who want to read more about Euclidean Rhythms,
                        check out Godfried's <a href="http://cgm.cs.mcgill.ca/~godfried/rhythm-and-mathematics.html">website</a> 
                    </p>
                    {/* <p>
                       *Account "guide" here or at the bottom?*
                    </p> */}
                </Paragraph>
            </StandardContainer>
            <RowItems></RowItems>
            <h2>CREATING A BEAT</h2>

            To create a beat, you first have to login (or create an account if you don't have one). 
            When logged in "create" will appear in as an option in the app menu (top right) - this is also where
            the login page can be found.

            <div/>
            <br/>
            <RowItemsTwo>
                <Li>1 - set number of silences</Li>
                <Li>2 - set pulses</Li>
            </RowItemsTwo>
            <ImageContainer src="https://firebasestorage.googleapis.com/v0/b/beat-root-a8d72.appspot.com/o/about%2FCompletesamplesStepsPulses.png?alt=media&token=0b0d8171-60fe-43c8-a683-5e7ea9b7229a"></ImageContainer>
            <RowItems>
                <Li>3 - find a sample</Li>
                <Li>4 - shift the phase of the pulses</Li>
            </RowItems>
            <br></br>
            {/* <Li><br></br></Li> */}
            {/* <h2>CREATING AN ACCOUNT</h2> */}
            {/* <RowItems>
                <p>open the side-bar and press "sign-in"</p>
                <AccountIMG src="https://firebasestorage.googleapis.com/v0/b/beat-root-a8d72.appspot.com/o/about%2FCompleteArrow.png?alt=media&token=522fec22-6eab-4651-9cd4-4500ed5ee600"></AccountIMG>
            </RowItems>
            <RowItems>
                <p>create your account</p>
                <AccountIMG src="https://firebasestorage.googleapis.com/v0/b/beat-root-a8d72.appspot.com/o/about%2FCompleteCreateAccount.png?alt=media&token=579826fb-07f8-400d-a59f-af2f735639a4"></AccountIMG>
            </RowItems> */}
            {/* <RowItems>
                <Readytxt>are you ready?</Readytxt>
                <MainButton text="beat creator"type={MainButtonType.Add} width={150}scale={1} onClick={()=>{history.push("/play/create")}}></MainButton>
            </RowItems> */}
        </AboutWrapper>
    )
}
const AboutWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: fit-content;
    @media screen and (min-width: 800px) {
        margin-right: 30%;
        margin-left: 30%;
        transition: all 0.1s ease;
    }
`
const StandardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Li = styled.li`
    display: flex;
    align-items: center;
    margin-right: 10%;
    margin-left: 10%;
`

const Lii = styled.li`
    display: flex;
    align-items: center;
`
const ImageContainer = styled.img`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 95%;
`

const AccountIMG = styled.img`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 60%;
`
const ThemeIMG = styled.img`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`
const PublishIMG = styled.img`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`

const Readytxt= styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    font-size: 20px;
`

const Paragraph = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
`

const RowItems = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    border-bottom:  2px solid ${theme.medium}
`
const RowItemsTwo= styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
`



export default AboutPage