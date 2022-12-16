
import { wait } from '@testing-library/user-event/dist/utils';
import { User } from 'firebase/auth';
import {Timestamp } from 'firebase/firestore';
import React from 'react';
import { Beat, Rhythm, Sample, Track } from '../common';
import {createEmailPasswordAccount,loginEmailPasswordAccount, getCurrentUserID, logOutAccount, getUserInformation,getProfilePictures} from '../model/firebase/firebaseAuthenticationModel'

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

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


  
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
    for(let i = 0; i<15; i++){
    

    await sleep(4000).then(()=>{
      createBeat({
        firestoreBeatID: "",
        title: i.toString(10),
        description:"description",
        composerID: "", //user ID
        likes:0, //user IDs
        tracks: [t1,t2], //track IDs
        theme: ["#000000", "#f01000"],
        bpm:    120
      } as Beat)
    })
  }
  }

  async function getUserInfo(){
    console.log(getUserInformation("AjOtxWR7GTYJafSDw91R9pGYoX32"))
  }
  async function getUserPic(){
    getProfilePictures()
  }

  async function getUserTest(){
    //console.log(await queryBeatsByUser("aFSQRyxBjxgyY0knbHdhg3Ck2d83",3))
  }

  function getTestData(){
    getBeatByID("qbkuwuGUYvCufsWtW4jO").then(data=>console.log(data))
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
      <br />
      <br />
      <button onClick={getUserInfo}>log userinfomration</button>
      <button onClick={getUserPic}>get pictures</button>
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
