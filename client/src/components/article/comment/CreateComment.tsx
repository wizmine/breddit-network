import { useState } from "react";
import styled from "styled-components";
import Button from "../../shared/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { createComment } from "../../../redux/slices/articles";

type Props = {
  articleId: string;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateComment = ({ articleId, setShowComments }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [newComment, setNewComment] = useState("");

  const handleSave = async () => {
    if (newComment === "") return;

    const request = {
      content: newComment,
      authorId: user!.id,
      articleId: articleId,
    };

    dispatch(createComment(request));
    setShowComments(true);
    setNewComment("");
  };

  if (!user) return <></>;

  return (
    <Space>
      <Input
        placeholder="Create comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button click={handleSave} text="Create" custom="primary" />
    </Space>
  );
};

export default CreateComment;

const Space = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.content};
  color: ${({ theme }) => theme.text};
  &:focus {
    border-color: #bae0ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;
