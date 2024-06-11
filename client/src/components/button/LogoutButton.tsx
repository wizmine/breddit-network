import { useAppDispatch } from "../../hooks/useRedux";
import { logout } from "../../redux/slices/auth";
import Button from "../shared/Button";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <Button click={handleLogout} custom="danger" text="Go out" />;
};

export default LogoutButton;
