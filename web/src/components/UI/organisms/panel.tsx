import _ from "lodash";
import React from "react";
import styled from "styled-components";
import CreateNewButton from "../atoms/circular-new-button";
import FlexContainer from "../layouts/flex-container";

type PropsType = {
  heading: string;
  height: string;
  width: string;
  children: JSX.Element | JSX.Element[];
  allowCreation?: boolean;
  creationTooltip?: string;
  onCreate?: () => any;
};

const HEADING_HEIGHT = 60;

const Container = styled.div<Pick<PropsType, "height" | "width">>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const Header = styled(FlexContainer)`
  height: ${HEADING_HEIGHT}px;
  width: 100%;
  justify-content: flex-start;
  background: ${(props) => props.theme.colors.bg_secondary};
`;

const Heading = styled(FlexContainer)`
  font-weight: 700;
  font-size: 16px;
  width: 100%;
  justify-content: flex-start;
  padding-left: 20px;
  width: calc(100% - 60px);
`;

const Body = styled(FlexContainer)`
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ChildContainer = styled.div`
  height: calc(100% - ${HEADING_HEIGHT}px);
  width: 100%;
`;

export default function Panel(props: PropsType) {
  const {
    height,
    width,
    heading,
    children,
    allowCreation = false,
    creationTooltip = "",
    onCreate,
  } = props;

  return (
    <Container {...{ height, width }} className="panel-container">
      <Body>
        <Header>
          <Heading>{heading}</Heading>
          {allowCreation && (
            <CreateNewButton
              tooltip={creationTooltip}
              onClick={() => _.isFunction(onCreate) && onCreate()}
            />
          )}
        </Header>
        <ChildContainer>{children}</ChildContainer>
      </Body>
    </Container>
  );
}
