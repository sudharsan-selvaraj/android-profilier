import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-color: ${(props) => props.theme.colors.primary} transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Spinner() {
  return <Container></Container>;
}
