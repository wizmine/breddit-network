import { useState } from "react";
import styled from "styled-components";
import CreateArticle from "../components/article/CreateArticle";
import ArticleScreen from "../components/article/ArticleScreen";
import { useAppSelector } from "../hooks/useRedux";

const HomePage = () => {
  const { articles, loading } = useAppSelector((state) => state.articles);
  const [searchArticle, setSearchArticle] = useState("");

  const filteredArticles = articles?.filter((article) =>
    article.content.toLowerCase().includes(searchArticle.toLowerCase())
  );

  return (
    <Container>
      <CreateArticle />
      <Input
        type="text"
        placeholder="Search article..."
        value={searchArticle}
        onChange={(e) => setSearchArticle(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <List>
          {filteredArticles.map((item) => (
            <ArticleScreen
              authorId={item.author.id}
              id={item.id}
              name={item.author.name}
              content={item.content}
              comments={item.comments}
              likes={item.likes}
              key={item.id}
            />
          ))}
        </List>
      )}
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 700px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin: 10px;
  background-color: ${({ theme }) => theme.content};
  color: ${({ theme }) => theme.text};
  &:focus {
    border-color: #bae0ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const List = styled.ul`
  width: 700px;
  list-style: none;
  padding: 0;
`;
