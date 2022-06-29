import React from "react";
import styled from "styled-components";
import FlexContainer from "../UI/layouts/flex-container";

const HEADER_HEIGHT = 75;
const PADDING = 10;

const Container = styled(FlexContainer)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  padding: 10px;
  justify-content: flex-start;
`;

const Header = styled(Container)`
  flex-direction: row;
  width: 100%;
  height: ${HEADER_HEIGHT - PADDING}px!important;
  align-items: flex-start;
  gap: 10px;
  top: 0;
  padding-bottom: ${PADDING}px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const HeaderTitle = styled.span`
  color: ${(props) => props.theme.colors.font_primary};
  font-size: 20px;
  font-weight: 600;
`;

const SubContainer = styled(FlexContainer)`
  width: 70%;
  justify-content: center;
  flex-direction: row;
  margin-right: auto;
  margin-left: 30px;
`;

const ChildContainer = styled(FlexContainer)<{ height: string }>`
  height: ${(props) => props.height};
  flex-direction: column;
  width: 100%;
  padding: 0;
  padding: 10px;
  justify-content: flex-start;
`;

type PropsType = {
  children?: JSX.Element | Array<JSX.Element>;
  header: string;
  subHeader?: JSX.Element | Array<JSX.Element>;
};

export default function SummaryPage(props: PropsType) {
  const { header, children, subHeader } = props;

  return (
    <Container>
      <Header>
        <HeaderTitle>{header}</HeaderTitle>
        <SubContainer>{subHeader && subHeader}</SubContainer>
      </Header>
      {children && (
        <ChildContainer height={`calc(100vh - ${HEADER_HEIGHT}px)`}>
          {children}
        </ChildContainer>
      )}
    </Container>
  );
}
