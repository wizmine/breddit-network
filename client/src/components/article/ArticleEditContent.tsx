import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import SaveArticleButton from "./button/SaveArticleButton";

type Props = {
  id: string;
  isEditing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
};

const ArticleEditContent = ({ id, isEditing, setEditing }: Props) => {
  const [newText, setNewText] = useState("");

  return (
    <Space>
      <Input
        placeholder="Edit article..."
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <SaveArticleButton
        id={id}
        isEditing={isEditing}
        setEditing={setEditing}
        newText={newText}
        key={id}
      />
    </Space>
  );
};

export default ArticleEditContent;

const Space = styled.div`
  display: flex;
  width: 100%;
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
    border-color: #40a9ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;
