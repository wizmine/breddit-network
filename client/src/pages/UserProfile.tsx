import styled from "styled-components";
import { useParams } from "react-router-dom";
import { axiosClassic } from "../api/interceptors";
import { useEffect, useState, useCallback } from "react";
import { IAuthor } from "../types/auth.types";
import ArticleScreen from "../components/article/ArticleScreen";
import Spinner from "../components/shared/Spinner";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IAuthor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axiosClassic.get<IAuthor>(`/users/${id}`);
      setUser(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    );
  if (error) return <ErrorContainer>Error: {error}</ErrorContainer>;

  return (
    <Container>
      <UserInfo>
        <Title>{user?.name}</Title>
        <Paragraph>Email: {user?.email}</Paragraph>
        <Subtitle>Articles: {user?.articles.length}</Subtitle>
      </UserInfo>
      <List>
        {user?.articles.map((item, i) => (
          <ArticleScreen
            key={i}
            id={item.id}
            content={item.content}
            name={item.author.name}
            authorId={item.authorId}
            comments={item.comments}
            likes={item.likes}
          />
        ))}
      </List>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const ErrorContainer = styled(Container)`
  color: red;
`;

const UserInfo = styled.div`
  margin-right: 140px;
`;

const Title = styled.h2``;

const Subtitle = styled.h4`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const List = styled.ul`
  width: 700px;
  list-style: none;
  padding: 0;
`;
