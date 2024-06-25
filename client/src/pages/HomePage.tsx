import { useState, useMemo, ChangeEvent } from "react";
import { useAppSelector } from "../hooks/useRedux";
import debounce from "lodash/debounce";
import styled from "styled-components";
import Spinner from "../components/shared/Spinner";
import ArticleScreen from "../components/article/ArticleScreen";

const HomePage = () => {
  const { articles, loading } = useAppSelector((state) => state.articles);
  const [searchArticle, setSearchArticle] = useState("");

  const debouncedSetSearchArticle = useMemo(
    () => debounce((value: string) => setSearchArticle(value), 300),
    []
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchArticle(e.target.value);
  };

  const filteredArticles = useMemo(
    () =>
      articles?.filter((article) =>
        article.content.toLowerCase().includes(searchArticle.toLowerCase())
      ),
    [articles, searchArticle]
  );

  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  return (
    <Container>
      <Input type="text" placeholder="Search article..." onChange={handleSearchChange} />
      <List>
        {filteredArticles.length !== 0 ? (
          filteredArticles.map((item) => (
            <ArticleScreen
              authorId={item.author.id}
              id={item.id}
              name={item.author.name}
              content={item.content}
              comments={item.comments}
              likes={item.likes}
              key={item.id}
            />
          ))
        ) : (
          <NothingFound>nothing found</NothingFound>
        )}
      </List>
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

const NothingFound = styled.p`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
