import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../../hooks/useRedux";
import { updateArticle } from "../../../redux/slices/articles";
import Button from "../../shared/Button";

type Props = {
  id: string;
  newText: string;
  isEditing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
};

const SaveArticleButton = ({ isEditing, setEditing, id, newText }: Props) => {
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    if (newText === "") return setEditing(!isEditing);

    await dispatch(updateArticle({ id: id, data: { content: newText } }));
    setEditing(!isEditing);
  };

  return <Button click={handleSave} custom="primary" text="Save" />;
};

export default SaveArticleButton;
