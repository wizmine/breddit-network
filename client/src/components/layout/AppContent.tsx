import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomePage from "../../pages/HomePage";
import Auth from "../../pages/Auth";
import Chat from "../../pages/Chat";
import AddArticle from "../../pages/AddArticle";
import UserProfile from "../../pages/UserProfile";

const AppContent = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/article-create" element={<AddArticle />} />
        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
    </Main>
  );
};

export default AppContent;

const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 100px);
  flex: 1;
`;
