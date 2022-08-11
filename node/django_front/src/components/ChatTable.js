import {
  ConversationList,
  Conversation,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { ThemeProvider } from '@mui/material/styles';
import { Detail } from '../function/theme';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../function/Atom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatTable = () => {
  // グローバル変数から操作ユーザのデータを取得
  const status = useRecoilValue(userDataState);
  const [chats, setChats] = useState([]);

  const user_type = status.user_type == 'Adopter' ? 'adopter' : 'supporter';
  console.log(user_type);
  useEffect(() => {
    if (status.id != null) {
      axios
        .get(
          'http://192.168.150.201:8000/api/chats/?' +
            user_type +
            '=' +
            status.id
        )
        .then((res) => {
          setChats(res.data);
        });
    }
  }, [status]);
  console.log(chats);

  const [chatTable, setChatTable] = useState([]);
  useEffect(() => {
    let chatlist = [];

    chats.map((chat) => {
      const partnerName =
        user_type == 'adopter'
          ? chat.supporter.username
          : chat.adopter.username;
      const partnerId =
        user_type == 'adopter' ? chat.supporter.id : chat.adopter.id;
      const lastSenderName =
        chat.sender == chat.adopter.id
          ? chat.adopter.username
          : chat.supporter.username;
      const is_unreaded = chat.sender == status.id ? false : !chat.is_readed;

      chatlist.push({
        id: partnerId,
        name: partnerName,
        lastSenderName: lastSenderName,
        info: chat.messeage.replace('<br>', '  '),
        is_unreaded: is_unreaded,
      });
    });
    setChatTable(chatlist);
  }, [chats]);

  const navigate = useNavigate();
  const goChatRoom = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <ThemeProvider theme={Detail}>
      <Box
        sx={{ backgroundColor: 'primary.contrastText' }}
        className="min-height-fulldisplay"
      >
        <Container
          component="main"
          maxWidth="sm"
          alignitems="center"
          justify="center"
          sx={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}
          className="min-height-fulldisplay"
        >
          <ConversationList>
            {chatTable.map((chat) => (
              <Conversation
                name={chat.name}
                lastSenderName={chat.lastSenderName}
                info={chat.info}
                unreadDot={chat.is_unreaded}
                onClick={() => goChatRoom(chat.id)}
              >
                <Avatar
                  style={{ textAlign: 'center', verticalAlign: 'middle' }}
                >
                  <AccountCircleIcon
                    sx={{
                      color: 'button.main',
                    }}
                    fontSize="large"
                  />
                </Avatar>
              </Conversation>
            ))}
          </ConversationList>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default ChatTable;
