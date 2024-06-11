// import { Button } from "antd";
// import Link from "next/link";
// import { useAuth } from "@/hooks/auth/useAuth";

import { Link } from "react-router-dom";
import Button from "../shared/Button";
import LogoutButton from "../button/LogoutButton";
import { useAppSelector } from "../../hooks/useRedux";
import styled from "styled-components";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Nav>
      {user ? (
        <>
          <Link to={`/chat`} style={{ marginRight: "10px" }}>
            <Button custom="primary" text="Chat" />
          </Link>
          <Link to={`/profile/${user.id}`} style={{ marginRight: "10px" }}>
            <Button custom="primary" text="Profile" />
          </Link>
          <LogoutButton />
        </>
      ) : (
        <Link to="/auth" style={{ marginRight: "10px" }}>
          <Button custom="danger" text="Sign In" />
        </Link>
      )}
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;
