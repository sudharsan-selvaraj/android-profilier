import React from "react";
import styled from "styled-components";
import Loader, { Size } from "../UI/atoms/loader";
import FlexContainer from "../UI/layouts/flex-container";

const Container = styled(FlexContainer)`
  height: 100%;
  width: 100%;
`;

export default function AppLoader() {
  return (
    <Container>
      <Loader size={Size.L} />
    </Container>
  );
}
