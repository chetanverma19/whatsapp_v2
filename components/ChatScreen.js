import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Message from "./Message";
import { useRef, useState } from "react";
import firebase from "firebase";
import getReceipientEmail from "../utils/getReceipientEmail";
import TimeAgo from "timeago-react";
import SendIcon from "@material-ui/icons/SendRounded";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [receipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getReceipientEmail(chat.users, user))
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  var disp1;

  function sendVis() {
    if (input !== "") {
      disp1 = "";
    }
    if (input === "") {
      disp1 = "none";
    }
    console.log(input);
    console.log(disp1);
    return disp1;
  }

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    scrollToBottom();
    setInput("");
  };

  const receipient = receipientSnapshot?.docs?.[0]?.data();

  const receipientEmail = getReceipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {receipient ? (
          <Avatar src={receipient?.photoURL} />
        ) : (
          <Avatar>{receipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{receipientEmail}</h3>
          {receipientSnapshot ? (
            <p>
              Last active:{" "}
              {receipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={receipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            "Loading Last Active"
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            sendVis();
          }}
        />
        <Button
          disabled={!input}
          style={{
            display: sendVis(),
          }}
          type="submit"
          onClick={sendMessage}
        >
          <SendIcon />
        </Button>
        <IconButton>
          <MicIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #27ae60;
  margin: none;
  color: white;
  transition: all 0.2s ease-in;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-top: 15px;
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const EndOfMessage = styled.div`
  height: 50px;
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const InputContainer = styled.form`
  display: flex;

  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 100px;
  background-color: #eeeeee;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
  /* align-items: center;
  padding: 10px;
  position: sticky;
  background-color: whitesmoke; */
`;
