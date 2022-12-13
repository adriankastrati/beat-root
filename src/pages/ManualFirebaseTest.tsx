
import { User } from 'firebase/auth';
import {Timestamp } from 'firebase/firestore';
import React from 'react';
import { Beat, Rhythm, Sample, Track } from '../common';
import {createEmailPasswordAccount,loginEmailPasswordAccount, getCurrentUserID, logOutAccount} from '../model/firebase/firebaseAuthenticationModel'

import {getBeatByID, createBeat, isBeatLikedByCurrentUser, getQueryBeats, getSamples, queryBeatsByUser} from "../model/firebase/firebaseBeat"
import { SortBy } from '../model/firebase/firebaseBeat';
export default function ManualFirebaseTest(){

  const [user, setUser] = React.useState<string|null>(null)
  
  function createDummy(){
    createEmailPasswordAccount("dummys@hej.se", "pastawithrice", "pastaPasta").then(()=>{
      getCurrentUserID().then(user=>{
        if(user){
          setUser(user)
        }else{
          setUser(null)
        }
      })})
   
  }
   
  function loginDummy(){
    loginEmailPasswordAccount("dummys@hej.se", "pastaPasta" )
  }
  
  async function logOut(){
    logOutAccount()
    setUser(null)
  }
  function logSamples(){
    console.log(getSamples())
  }
  
  async function addTestData(){
    let r1 = new Rhythm(5)
    let r2 = new Rhythm(3)

    let samples = await getSamples()

    let s: Sample = samples![0].name

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
      title: "2",
      description:"description",
      composerID: "", //user ID
      likes:0, //user IDs
      tracks: [t1,t2], //track IDs
      theme: ["#000000", "#f01000"],
      bpm:    120
    } 

    createBeat(b)
  }

  async function getUserTest(){
    console.log(await queryBeatsByUser(2,"aFSQRyxBjxgyY0knbHdhg3Ck2d83"))
  }

  function getTestData(){
    getBeatByID("2AvtSLJxulacApUXRHHA").then(data=>console.log(data))
  }

  function getQueryBeat(){
    getQueryBeats(3, Timestamp.fromDate(new Date()),SortBy.likes).then(beats=>{console.log(beats)})
  }
  
  function beatLikedByCurrentUser(){
    isBeatLikedByCurrentUser("WCOBSZJP33ctZSWHey8P").then(bool=>{console.log(bool)})
  }

  
  function getUser(){
    getCurrentUserID().then(user=>{
      setUser(user)
    })
  }
  
  return (
    <div className="App">
      <button onClick={getUserTest}>get Userbeats</button>
      <button onClick={createDummy}> create</button>
      <button onClick={loginDummy}> login</button>
      <button onClick={logSamples}> log samples</button>
      <button onClick={logOut}>LogOut</button>
      <button onClick={getUser}>getuser</button>
      <button onClick={addTestData}>Test data</button> 
      <button onClick={getTestData}>get beat</button>
      <button onClick={getQueryBeat}>get queryBeats</button>
      <button onClick={beatLikedByCurrentUser}>beatLikedByCurrentUser</button>
      <div> {user ||"no user"}</div>
    </div>
  );
}
