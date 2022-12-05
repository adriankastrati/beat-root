
import { User } from 'firebase/auth';
import {Timestamp } from 'firebase/firestore';
import React from 'react';
import { Beat, Rhythm, Sample, Track } from '../common';
import {createEmailPasswordAccount,loginEmailPasswordAccount, getCurrentUserID, logOutAccount} from '../model/firebase/firebaseAuthenticationModel'

import {getBeatByID, createBeat, getUserById, isBeatLikedByCurrentUser, getQueryBeats} from "../model/firebase/firebaseBeat"

export default function ManualFirebaseTest(){

  const [user, setUser] = React.useState<User|null>(null)
  
  function createDummy(){
    createEmailPasswordAccount("dummys@hej.se", "pastawithrice", "pastaPasta").then(()=>{
      let user = getCurrentUserID()
      // if(user){
      //   setUser(user)
      // }else{
      //   setUser(null)
      // }
    })
   
  }
   
  function loginDummy(){
    loginEmailPasswordAccount("dummys@hej.se", "pastaPasta" )
  }
  
  async function logOut(){
    logOutAccount()
  }

  
  function addTestData(){
    let r1 = new Rhythm([7,2])
    let r2 = new Rhythm([3,5])
    

    let s: Sample ={
      url: "https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3",
      name: "techno-kick",
      firestoreSampleID: "e1nLYau0MQmzEdiojCXX"
    }

    let t1: Track ={
      rhythm: r1,
      sample: s
    }
    let t2: Track ={
      rhythm: r2,
      sample: s
    }
    
    let b: Beat = {
      firestoreBeatID: "",
      title: "litty song",
      description:"description",
      composerID: "", //user ID
      likes:0, //user IDs
      tracks: [t1,t2], //track IDs
      theme: ["italian"],
      cpm:    12
    } 

    createBeat(b)
  }

  function getTestData(){
    getBeatByID("2AvtSLJxulacApUXRHHA").then(data=>console.log(data))
  }

  function addTestDatafirestore(){}

  function getQueryBeat(){
    console.log(getQueryBeats(3, 0, Timestamp.fromDate(new Date())))
  }
  
  function beatLikedByCurrentUser(){
    console.log(isBeatLikedByCurrentUser("WCOBSZJP33ctZSWHey8P"))  
  }

  
  function getUser(){
    console.log(getUserById("gwgjY95D4AyZ0yswWDyR"))
  }
  
  return (
    <div className="App">
      <button onClick={createDummy}> create</button>
      <button onClick={loginDummy}> login</button>
      <button onClick={logOut}>LogOut</button>
      <button onClick={getUser}>getuser</button>
      <button onClick={addTestData}>Test data</button> 
      <button onClick={getTestData}>get beat</button>
      <button onClick={getQueryBeat}>get queryBeats</button>
      <button onClick={beatLikedByCurrentUser}>beatLikedByCurrentUser</button>
      <div> {user?.email||"no user"}</div>
    </div>
  );
}
