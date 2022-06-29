import React from "react";
import styled from "styled-components";
import FlexContainer from "../../layouts/flex-container";

const Container = styled(FlexContainer)`
  flex-direction: column;
  padding: 20px 25px 20px 25px;
  gap: 25px;
  overflow: scroll;
`;

type PropsType = {
  children: JSX.Element | JSX.Element[];
};
export default function FormGroup(props: PropsType) {
  const { children } = props;
  return <Container>{children}</Container>;
}
