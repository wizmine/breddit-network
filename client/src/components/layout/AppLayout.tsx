import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../styles/theme";
import { GlobalStyles } from "../../styles/globalStyles";
import { useAppDispatch } from "../../hooks/useRedux";
import { getFeed } from "../../redux/slices/articles";
import { getAllUsers } from "../../redux/slices/users";
import { getNewTokens } from "../../redux/slices/auth";
import light from "../../assets/theme/light.png";
import dark from "../../assets/theme/dark.png";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    dispatch(getFeed());
    dispatch(getNewTokens());
    dispatch(getAllUsers());
  }, [dispatch]);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  };

  return (
    <ThemeProvider theme={theme === light ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container>
        <AppHeader theme={theme} toggleTheme={toggleTheme} />
        <AppContent />
        <AppFooter />
      </Container>
    </ThemeProvider>
  );
};

export default AppLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
