import React from "react";
import styled from "styled-components";

export enum Size {
  S = 30,
  M = 40,
  L = 40,
  XL = 60,
  XXL = 70,
}

type PropsType = {
  size: Size;
};

const LoaderItem = styled.span<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: 5px solid;
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

  &::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

export default function Loader(props: PropsType) {
  const { size } = props;
  return <LoaderItem size={size} />;
}
