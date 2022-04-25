import React, {useState} from 'react'
import {useContext} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import { useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from 'firebase/compat/app';

const Chat = () => {
  const {auth, firestore} = useContext(Context)
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')
  const [messages, loading] = useCollectionData(
      firestore.collection('messages').orderBy('createAt')
  )

    const sendMasege = async () =>{
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if(loading) {
        return <Loader/>
    }

  return (
      <Container>
        <Grid
            container
            justifyContent={'center'}
            style={{height: window.innerHeight - 50, marginTop: 25}}>
            <div style={{width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto'}}>

                {messages.map(message =>{
                    return(
                        <div
                            style={{
                                margin:'10px',
                                border: user.uid === message.uid ? '1px solid #2196f3' : '2px solid red',
                                borderRadius: '10px',
                                borderBottomRightRadius: user.uid === message.uid ? '0' : '0',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: '10px',

                            }}>
                            <Grid containe
                                  style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      marginBottom: '10px'
                                  }}
                                  r>
                                <Avatar src={message.photoURL}
                                style={{
                                    marginRight: '10px'
                                }}
                                />
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )
                })}

            </div>
            <Grid
                container
                direction={'column'}
                alignItems={'center'}
                style={{width: '80%'}}
            >
                <TextField
                    fullWidth
                    rowMax={2}
                    variant={'outlined'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <Button onClick={sendMasege} variant={'outlined'}>Send</Button>
            </Grid>
        </Grid>
      </Container>
  )
}

export default Chat