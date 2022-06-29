import React from "react";
import styled from "styled-components";
import SummaryPage from "../../layouts/sumary-page";
import SessionsTable from "./sessions-table";

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
`;

export default function SessionPage() {
  return (
    <Container>
      <SessionsTable />
    </Container>
  );
}
