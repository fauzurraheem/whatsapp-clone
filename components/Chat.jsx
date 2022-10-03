
import { Avatar } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import getRecipientEmail from '../utils/getRecipientEmail'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'


const Chat = ({id, users}) => {
  const router = useRouter()
  const [user] = useAuthState(auth);

 
  const [RecipientSnap] = useCollection(query(collection(db, "users"), where("email", "==", getRecipientEmail(users,user))));


  const recipient = RecipientSnap?.docs?.[0]?.data();

 



  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  return (
    <Container onClick={enterChat}>
    {recipient ? (<UserAvatar src={recipient?.photoURL} />) :
      (<UserAvatar>{recipientEmail[0]}</UserAvatar>)

      }

      <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;