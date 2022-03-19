import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getReceipientEmail from "../utils/getReceipientEmail";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/dist/client/router";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [receipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getReceipientEmail(users, user))
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const receipient = receipientSnapshot?.docs?.[0]?.data();
  const receipientEmail = getReceipientEmail(users, user);
  console.log(receipient);
  return (
    <Container onClick={enterChat}>
      {receipient ? (
        <UserAvatar src={receipient?.photoURL} />
      ) : (
        <UserAvatar>{receipientEmail[0]}</UserAvatar>
      )}
      <p>{receipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  transition: all 200ms;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
