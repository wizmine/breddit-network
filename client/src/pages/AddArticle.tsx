import styled from "styled-components";
import CreateArticle from "../components/article/CreateArticle";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const AddArticle = () => {
  const [isCreated, setCreated] = useState(false);

  if (isCreated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <h2>Create a new article!</h2>
      <CreateArticle isCreated={isCreated} setCreated={setCreated} />
    </Container>
  );
};

export default AddArticle;

const Container = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
