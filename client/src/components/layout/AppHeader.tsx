import { NavLink } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../header/NavBar";

type Props = {
  theme: string;
  toggleTheme: () => void;
};

const AppHeader = ({ theme, toggleTheme }: Props) => {
  return (
    <Header>
      <NavLink to="/">
        <h2 style={{ color: "#ff4c4c" }}>Breddit</h2>
      </NavLink>
      <NavInfo>
        <NavBar />
        <ThemeButton onClick={toggleTheme}>
          <Image src={theme} alt={theme} />
        </ThemeButton>
      </NavInfo>
    </Header>
  );
};

export default AppHeader;

const Header = styled.header`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.header};
`;

const NavInfo = styled.div`
  display: flex;
`;

const ThemeButton = styled.button`
  margin: 8px;
  margin-left: 16px;
  padding: 0.2rem;
  font-size: 16px;
  border: 1px solid #707070;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
`;

const Image = styled.img`
  width: 16px;
`;
