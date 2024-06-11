import styled from "styled-components";
import { ILike } from "../../../types/article.types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { createLike, deleteLike } from "../../../redux/slices/articles";

type Props = {
  likes: ILike[];
  articleId: string;
  authorId: string;
};

const LikeStats = ({ likes, articleId, authorId }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [buttonColor, setButtonColor] = useState("gray");
  const [userLike, setUserLike] = useState<ILike | null>(null);

  useEffect(() => {
    const like = likes.find((like) => like.authorId === user?.id);

    if (like) {
      setButtonColor("#ff4c4c");
      setUserLike(like);
    } else {
      setButtonColor("gray");
      setUserLike(null);
    }
  }, [likes, authorId, articleId, user]);

  const handleClick = () => {
    if (!user) return;

    const request = {
      authorId: user.id,
      articleId,
    };

    if (userLike) {
      dispatch(deleteLike(userLike));
    } else {
      dispatch(createLike(request));
    }
    setButtonColor((prevColor) => (prevColor === "#ff4c4c" ? "gray" : "#ff4c4c"));
  };

  return (
    <LikeButton colorBtn={buttonColor} onClick={handleClick}>
      {likes.length} ❤
    </LikeButton>
  );
};

export default LikeStats;

const LikeButton = styled.button<{ colorBtn: string }>`
  margin-right: 10px;
  padding: 6px;
  font-size: 16px;
  background-color: ${(props) => props.colorBtn};
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.colorBtn === "#ff4c4c" ? "#ff7b7b" : "darkgray")};
  }
`;
