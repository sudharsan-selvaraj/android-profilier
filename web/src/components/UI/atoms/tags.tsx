import React from "react";
import styled from "styled-components";
import FlexContainer from "../layouts/flex-container";

type PropsType = {
  labels: Array<string>;
};

const TagContainer = styled(FlexContainer)`
  flex-direction: row;
  overflow: hidden;
  gap: 10px;
  justify-content: flex-start;
`;

const TagLabelWrapper = styled(FlexContainer)`
  flex-direction: column;
  background: ${(props) => props.theme.colors.tags_bg};
  border: 1px solid ${(props) => props.theme.colors.tags_font};
  color: ${(props) => props.theme.colors.tags_font};
  font-size: 12px;
  border-radius: 5px;
  gap: 2px;
  padding: 3px 5px 3px 5px;
`;

export default function Tags(props: PropsType) {
  const { labels } = props;
  return (
    <TagContainer>
      {labels.map((l: string, i: number) => {
        return <TagLabelWrapper key={`tag-label-${i}`}>{l}</TagLabelWrapper>;
      })}
    </TagContainer>
  );
}
