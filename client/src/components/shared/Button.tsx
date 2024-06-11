import React from "react";
import styled, { css } from "styled-components";

type Props = {
  text: string;
  custom: "primary" | "danger";
  type?: "button" | "submit" | "reset";
  click?: () => void;
  style?: React.CSSProperties;
};

const Button = ({ text, custom, click, type = "button", style }: Props) => (
  <CustomButton onClick={click} custom={custom} type={type} style={style}>
    {text}
  </CustomButton>
);

export default Button;

const primaryStyles = css`
  background-color: #a200ff;
  &:hover {
    background-color: #b87aff;
  }
  &:active {
    background-color: #7b09d9;
  }
`;

const dangerStyles = css`
  background-color: #ff4c4c;
  &:hover {
    background-color: #ff79a1;
  }
  &:active {
    background-color: #d9363e;
  }
`;

const CustomButton = styled.button<{
  custom?: "primary" | "danger";
  color?: string;
}>`
  color: white;
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  ${(props) =>
    props.custom === "primary"
      ? primaryStyles
      : props.custom === "danger"
      ? dangerStyles
      : css`
          background-color: ${props.color || "gray"};
        `}
`;
