import { useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { authMain } from "../redux/slices/auth";
import { IAuthForm } from "../types/auth.types";
import Button from "../components/shared/Button";

const Auth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => Boolean(state.auth.user));
  const [isLoginForm, setIsLoginForm] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: IAuthForm = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (!isLoginForm) {
      data.name = formData.get("name") as string;
    }

    await dispatch(authMain({ type: isLoginForm ? "login" : "register", data }));
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        {!isLoginForm && (
          <FormItem>
            <Label>Name</Label>
            <Input name="name" required placeholder="Please input your name!" />
          </FormItem>
        )}

        <FormItem>
          <Label>Email</Label>
          <Input name="email" type="email" required placeholder="Please input your email!" />
        </FormItem>

        <FormItem>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Min length 6"
          />
        </FormItem>
        <Button type="submit" custom="primary" text="Submit" style={{ marginRight: "10px" }} />
        <Button
          custom="primary"
          click={() => setIsLoginForm(!isLoginForm)}
          text={`Swap to ${!isLoginForm ? "login" : "register"}`}
          style={{ marginRight: "10px" }}
        />
      </Form>
    </Container>
  );
};

export default Auth;

const Container = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.content};
`;

const FormItem = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: calc(100% - 16px);
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.content};
  color: ${({ theme }) => theme.text};
  &:focus {
    border-color: #40a9ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;
