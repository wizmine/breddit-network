import React, { useState } from "react";
import styled from "styled-components";
import Messages from "../components/chat/Messages";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useConnectSocket } from "../hooks/useConnectSocket";
import { createChat } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { IAuthor } from "../types/auth.types";
import Spinner from "../components/shared/Spinner";

const Chat = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<IAuthor[]>([]);
  const chats = user?.chats;
  useConnectSocket();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/" />;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (users) {
      setSuggestions(
        users.filter(
          (item) => item.id !== user.id && item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const onSelectUser = (userId: string) => {
    setSearchTerm("");
    setSuggestions([]);
    const data = {
      firstUser: user.id,
      secondUser: userId,
    };
    dispatch(createChat(data));
  };

  return (
    <ChatContainer>
      <Tabs>
        <TabList>
          <SearchContainer>
            <Input placeholder="Search for a user..." value={searchTerm} onChange={onChange} />
            {searchTerm && suggestions.length > 0 && (
              <SuggestionsList>
                {suggestions.map((item) => (
                  <SuggestionItem key={item.id} onClick={() => onSelectUser(item.id)}>
                    {item.name}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            )}
          </SearchContainer>
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

const SearchContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.content};
  background-color: ${({ theme }) => theme.background};
  &:focus {
    border-color: ${({ theme }) => theme.content};
    outline: none;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.content};
  max-height: 150px;
  overflow-y: auto;
  z-index: 100;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.content};
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
