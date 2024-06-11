import React, { useState } from "react";
import styled from "styled-components";
import Messages from "../components/chat/Messages";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useConnectSocket } from "../hooks/useConnectSocket";
import { createChat } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";

const Chat = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const chats = user?.chats;
  useConnectSocket();

  if (loading) return <ChatContainer>Loading...</ChatContainer>;
  if (!user) return <Navigate to="/" />;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedUser(value);
    const data = {
      firstUser: user.id,
      secondUser: value,
    };
    dispatch(createChat(data));
  };

  const filteredUsers = users?.filter((item) => item.id !== user.id);

  return (
    <ChatContainer>
      <Tabs>
        <TabList>
          <Select value={selectedUser || ""} onChange={onChange}>
            <option value="" disabled>
              Select a user
            </option>
            {filteredUsers?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          {chats?.map((chat) => {
            const secondUser = chat.participants.find((item) => item.id !== user?.id);
            return (
              <Tab
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                isActive={chat.id === activeChat}
              >
                {secondUser?.name}
              </Tab>
            );
          })}
        </TabList>
        <TabContent>
          {activeChat ? (
            chats?.map((chat) => {
              if (chat.id === activeChat) {
                return <Messages messages={chat.messages} chatId={chat.id} key={chat.id} />;
              }
              return null;
            })
          ) : (
            <EmptyChat>Select a chat!</EmptyChat>
          )}
        </TabContent>
      </Tabs>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.content};
  background-color: ${({ theme }) => theme.background};
  &:focus {
    border-color: ${({ theme }) => theme.content};
    outline: none;
  }
`;

const Tabs = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: row;
`;

const TabList = styled.div`
  width: 200px;
  border-right: 1px solid #ddd;
`;

const TabContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ isActive, theme }) => (isActive ? theme.content : "transparent")};
  &:hover {
    background-color: ${({ theme }) => theme.content};
  }
`;

const EmptyChat = styled.div`
  display: flex;
  justify-content: center;
`;
