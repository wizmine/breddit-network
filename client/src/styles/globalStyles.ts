import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
