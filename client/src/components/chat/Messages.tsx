import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SocketApi from "../../api/socket-api";
import Button from "../shared/Button";
import { useAppSelector } from "../../hooks/useRedux";
import { IMessage } from "../../types/chat.types";

type Props = {
  messages: IMessage[];
  chatId: string;
};

const Messages = ({ messages: initialMessages, chatId }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNewMessage = (message: IMessage) => {
      if (message.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    SocketApi.socket?.on("client-message", handleNewMessage);

    return () => {
      SocketApi.socket?.off("client-message", handleNewMessage);
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      senderId: user!.id,
      content: newMessage,
      chatId: chatId,
      senderName: user!.name,
      createdAt: Date.now(),
    };

    SocketApi.socket?.emit("server-message", message);
    setNewMessage("");
  };

  const filteredData = messages.map((message) => {
    const isCurrentUser = user?.id === message.senderId;

    return (
      <MessageWrapper
        key={message.id}
        style={{ textAlign: `${isCurrentUser ? "right" : "left"}`, padding: "10px" }}
      >
        <SenderName>{message.senderName}</SenderName>
        <MessageContent>{message.content}</MessageContent>
      </MessageWrapper>
    );
  });

  return (
    <MessagesContainer>
      <MessagesWrapper>
        {filteredData}
        <div ref={messagesEndRef} />
      </MessagesWrapper>
      <MessageInputContainer>
        <Input
          placeholder="Enter new message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button click={handleSendMessage} custom="primary" text="Submit" />
      </MessageInputContainer>
    </MessagesContainer>
  );
};

export default Messages;

const MessagesContainer = styled.div`
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MessagesWrapper = styled.div`
  margin-bottom: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const MessageWrapper = styled.div`
  padding: 10px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MessageContent = styled.p`
  font-size: 18px;
  `;

const SenderName = styled.h5``;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.content};
  color: ${({ theme }) => theme.text};
  &:focus {
    border-color: #bae0ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;
