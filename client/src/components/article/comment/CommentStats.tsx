import { IComment } from "../../../types/article.types";
import styled from "styled-components";

type Props = {
  comments: IComment[];
  showComments: boolean;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentStats = ({ comments, showComments, setShowComments }: Props) => {
  const handleClick = () => {
    setShowComments(!showComments);
  };

  return <CommentButton onClick={handleClick}>{comments.length} 💬</CommentButton>;
};

export default CommentStats;

const CommentButton = styled.button`
  margin-right: 10px;
  padding: 6px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #a200ff;
  &:hover {
    background-color: #b87aff;
  }
  &:active {
    background-color: #7b09d9;
  }
`;
