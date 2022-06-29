import React from "react";
import styled from "styled-components";
import FlexContainer from "../UI/layouts/flex-container";

const Container = styled(FlexContainer)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
`;

const ChildContainer = styled(Container)<{ height: string }>`
  height: ${(props) => props.height};
  overflow: auto;
`;

type PropsType = {
  children: JSX.Element;
};

export default function ViewHolder(props: PropsType) {
  const { children } = props;

  return (
    <Container>
      <ChildContainer height={`100vh`}>{children}</ChildContainer>
    </Container>
  );
}
