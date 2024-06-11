import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../hooks/useRedux";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import Button from "./Button";

type Props = {
  id: string;
  text: string;
  deleteFunction: (arg: string) => AsyncThunkAction<any, string, AsyncThunkConfig>;
};

const DeleteButton = ({ id, text, deleteFunction }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${text}?`)) {
      dispatch(deleteFunction(id));
    }
  };

  return <Button click={handleRemove} custom="danger" text="Delete" />;
};

export default DeleteButton;
