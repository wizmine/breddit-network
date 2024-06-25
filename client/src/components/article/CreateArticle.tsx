import { useState } from "react";
import styled from "styled-components";
import Button from "../shared/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { createArticle } from "../../redux/slices/articles";

type Props = {
  isCreated: boolean;
  setCreated: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateArticle = ({ isCreated, setCreated }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [newArticle, setNewArticle] = useState("");

  const handleSave = async () => {
    if (newArticle === "") return;

    dispatch(createArticle({ content: newArticle }));
    setNewArticle("");
    setCreated(!isCreated);
  };

  if (!user) return <></>;

  return (
    <Space>
      <Input
        placeholder="Create article..."
        value={newArticle}
        onChange={(e) => setNewArticle(e.target.value)}
      />
      <Button click={handleSave} text="Create" custom="primary" />
    </Space>
  );
};

export default CreateArticle;

const Space = styled.div`
  display: flex;
  width: 700px;
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
