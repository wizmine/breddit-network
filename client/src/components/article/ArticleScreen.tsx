import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useRedux";
import Button from "../shared/Button";
import ArticleEditContent from "./ArticleEditContent";
import { IComment, ILike } from "../../types/article.types";
import LikeStats from "./like/LikeStats";
import CommentStats from "./comment/CommentStats";
import CreateComment from "./comment/CreateComment";
import CommentScreen from "./comment/CommentScreen";
import DeleteButton from "../shared/DeleteButton";
import { deleteArticle } from "../../redux/slices/articles";

type Props = {
  id: string;
  content: string;
  name: string;
  authorId: string;
  comments: IComment[];
  likes: ILike[];
};

const ArticleScreen = ({ id, content, name, authorId, comments, likes }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const currentUser = user?.id === authorId;
  const filteredName = name === "" ? "Anonymous" : name;

  return (
    <Container>
      <Card>
        <Link to={`/profile/${authorId}`} style={{ marginRight: "10px" }}>
          <CardHeader>br/{filteredName}</CardHeader>
        </Link>
        {!isEditing ? (
          <CardBody>
            <Content>{content}</Content>
            {currentUser && (
              <ButtonGroup>
                <DeleteButton deleteFunction={deleteArticle} id={id} text="article" />
                <Button click={() => setEditing(!isEditing)} custom="primary" text="Edit" />
              </ButtonGroup>
            )}
          </CardBody>
        ) : (
          <ArticleEditContent id={id} isEditing={isEditing} setEditing={setEditing} key={id} />
        )}
        <ArticleStats>
          <LikeStats likes={likes} articleId={id} authorId={authorId} />
          <CommentStats
            comments={comments}
            showComments={showComments}
            setShowComments={setShowComments}
          />
        </ArticleStats>
        {showComments &&
          comments.map((comment) => (
            <CommentScreen
              articleId={id}
              authorId={comment.authorId}
              content={comment.content}
              name={comment.author.name}
              id={comment.id}
              key={comment.id}
            />
          ))}
        <CreateComment
          articleId={id}
          setShowComments={setShowComments}
        />
      </Card>
    </Container>
  );
};

export default ArticleScreen;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Card = styled.div`
  width: 700px;
  margin-bottom: 10px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.content};
`;

const CardHeader = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArticleStats = styled.div`
  padding: 10px 0;
  display: flex;
`;

const Content = styled.p`
  margin: 0;
  font-size: 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
