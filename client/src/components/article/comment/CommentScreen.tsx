import styled from "styled-components";
import { deleteComment } from "../../../redux/slices/articles";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";

type Props = {
  authorId: string;
  articleId: string;
  content: string;
  name: string;
  id: string;
};

const CommentScreen = ({ articleId, authorId, content, name, id }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const currentUser = user?.id === authorId;

  const handleRemove = () => {
    const request = {
      id: id,
      articleId: articleId,
    };

    dispatch(deleteComment(request));
  };

  return (
    <CommentBody>
      <AuthorName>br/{name}</AuthorName>
      <CommentInfo>
        <Content>{content}</Content>
        {currentUser && <DeleteCommentButton onClick={handleRemove}>delete</DeleteCommentButton>}
      </CommentInfo>
    </CommentBody>
  );
};

export default CommentScreen;

const CommentBody = styled.div`
  padding-top: 10px;
  border-top: 1px solid #00000030;
`;

const AuthorName = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const CommentInfo = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.p`
  margin: 0;
  font-size: 18px;
`;

const DeleteCommentButton = styled.button`
  cursor: pointer;
  background: none;
  color: gray;
  border: none;
`;
