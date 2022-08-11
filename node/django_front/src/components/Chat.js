import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Detail } from '../function/theme';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../function/Atom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

console.log(styles);
const Chat = () => {
  // paramsでchat相手のユーザIDを受け取る;
  const { partner } = useParams();

  // グローバル変数から操作ユーザのデータを取得
  const status = useRecoilValue(userDataState);

  const [partnerData, setPartnerData] = useState();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [send, setSend] = useState([]);

  // 入力したメッセージをstateに代入
  const [currentMessage, setCurrentMessage] = useState();
  const handleChange = (value) => {
    setCurrentMessage(value);
  };

  useEffect(() => {
    if (status.id != null) {
      axios
        .get(
          'http://192.168.150.201:8000/api/chats/?adopter=' +
            partner +
            '&supporter=' +
            status.id
        )
        .then((res) => {
          setChats(res.data);
        });
    }
  }, [status, send]);

  // 相手ユーザの情報を取得する
  useEffect(() => {
    axios
      .get('http://192.168.150.201:8000/api/users/?id=' + partner)
      .then((res) => {
        setPartnerData(res.data[0]);
      });
  }, [partner]);

  console.log(status);

  // メッセージの表示を制御する
  useEffect(() => {
    console.log(chats);
    let messagelist = [];
    chats.map((chat) => {
      console.log(chat);

      // メッセージの表示位置制御
      let direction, textAlign;

      if (partner == chat.sender) {
        // 操作ユーザの受け取ったメッセージは左手に
        direction = 'incoming';
        textAlign = 'right';
      } else {
        // 操作ユーザの送ったメッセージは右手に
        direction = 'outgoing';
        textAlign = 'left';
      }

      // 申請時のみシステムメッセージを流す
      if (chat.cat != null) {
        messagelist.push({
          message:
            '[これはシステムメッセージです]\n' +
            chat.supporter.username +
            ' さんの家の ' +
            chat.cat.name +
            ' さん宛に\n' +
            chat.adopter.username +
            ' さんから申請が送られました',
          sentTime: chat.created_at,
          sender: chat.adopter.username,
          direction: direction,
          textAlign: textAlign,
        });
      }

      messagelist.push({
        message: chat.messeage,
        sentTime: chat.created_at,
        sender: chat.sender,
        direction: direction,
        textAlign: textAlign,
      });
      console.log(messages);

      if (partner == chat.sender && chat.is_readed == false) {
        axios
          .patch('http://192.168.150.201:8000/api/chatsRUD/' + chat.id + '/', {
            is_readed: true,
          })
          .then((res) => {
            console.log(res);
          });
      }
    });
    console.log(messages);
    setMessages(messagelist);
  }, [chats]);

  // 送信ボタンを押すと、DBにインサートされる
  const handleSend = () => {
    let adopterId, supporterId;
    if (partnerData.user_type == 'Adopter') {
      adopterId = partner;
      supporterId = status.id;
    } else if (partnerData.user_type == 'Supporter') {
      adopterId = status.id;
      supporterId = partner;
    }
    axios
      .post('http://192.168.150.201:8000/api/chats/', {
        sender: status.id,
        adopter_id: adopterId,
        supporter_id: supporterId,
        messeage: currentMessage,
        cat_id: null,
      })
      .then(function (response) {
        console.log(response.data);
        setSend(response.data);
      });
  };

  console.log(currentMessage);
  return (
    <ThemeProvider theme={Detail}>
      <Box
        sx={{ backgroundColor: 'primary.contrastText' }}
        className="min-height-fulldisplay"
        alignitems="center"
        justify="center"
      >
        <div
          style={{
            maxWidth: '500px',
            backgroundColor: '#FFFFFF',
            margin: '0 auto',
          }}
        >
          <MainContainer
            className="min-height-fulldisplay"
            style={{
              maxWidth: '500px',
              border: 'solid 0px',
            }}
          >
            <ChatContainer
              style={{
                maxWidth: '500px',
              }}
            >
              <ConversationHeader
                style={{
                  backgroundColor: '#FFFFFF',
                  marginBottom: '5px',
                  borderRadius: '0 0 10px 10px',
                }}
              >
                <ConversationHeader.Content>
                  <span
                    style={{
                      color: '#675642',
                      alignSelf: 'flex-center',
                      textAlign: 'center',
                    }}
                  >
                    {partnerData && partnerData.username}
                  </span>
                </ConversationHeader.Content>
              </ConversationHeader>
              <MessageList>
                {messages.map((message) => (
                  <Message
                    model={{
                      message: message.message,
                      sentTime: message.sentTime,
                      sender: message.sender,
                      position: message.position,
                      direction: message.direction,
                    }}
                  >
                    <Message.Footer
                      style={{
                        textAlign: message.textAlign,
                        display: 'inline',
                      }}
                    >
                      {message.sentTime}
                    </Message.Footer>
                  </Message>
                ))}
              </MessageList>
              <MessageInput
                style={{
                  position: 'fixed',
                  bottom: 0,
                  width: '100%',
                  maxWidth: '500px',
                  border: 'solid 0px',
                  color: '#efe5cf',
                }}
                placeholder="Type message here"
                attachButton={false}
                onChange={handleChange}
                onSend={handleSend}
                //               value={currentMessage}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;
