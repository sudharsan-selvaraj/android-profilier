import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDeviceList } from "../../store/selectors/entities/device-selector";
import SummaryPage from "../layouts/sumary-page";
import FlexContainer from "../UI/layouts/flex-container";

const DeviceContainer = styled.div`
  display: flex;
  width: 70%;
  height: 80%;
  margin: auto;
  align-items: center;
  overflow: auto;
  flex-direction: column;
  gap: 30px;
`;

const DeviceCard = styled.div`
  width: 80%;
  height: 180px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  margin-bottom: 10px;
  direction: column;
  padding: 20px;
`;

const DeviceName = styled.div`
  font-weight: 500;
  font-size: 15px;
`;

const DeviceTypeBadge = styled.div`
  font-weight: 500;
  font-size: 11px;
  text-transform: uppercase;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.bg_secondary};
  border-radius: 10px;
  padding: 2px 5px 2px 5px;
`;

const Row = styled(FlexContainer)`
  width: 100%;
  justify-content: flex-start;
  gap: 15px;
`;

const Section = styled(FlexContainer)`
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

const Label = styled(FlexContainer)`
  font-weight: 500;
  font-size: 12px;
  color: ${(props) => props.theme.colors.font_secondary};
`;

const Value = styled(Label)`
  color: ${(props) => props.theme.colors.font_primary};
`;

const useDevies = (devices: any) => {
  return devices.map((device: any) => {
    return (
      <DeviceCard key={device.udid}>
        <Row>
          <DeviceName>{device.name}</DeviceName>
          <DeviceTypeBadge>{device.type}</DeviceTypeBadge>
        </Row>
        <Section>
          <Row>
            <Label>UDID :</Label>
            <Value>{device.udid}</Value>
          </Row>
          <Row>
            <Label>Version :</Label>
            <Value>{device.version}</Value>
          </Row>
          <Row>
            <Label>Total CPU :</Label>
            <Value>{device.total_cpu}</Value>
          </Row>
          <Row>
            <Label>RAM :</Label>
            <Value>{Math.ceil(Number(device.total_ram) / 1024)} MB</Value>
          </Row>
        </Section>
      </DeviceCard>
    );
  });
};

export default function Devices() {
  const devices = useSelector(getDeviceList);

  return (
    <SummaryPage header="Devices">
      <DeviceContainer>{useDevies(devices)}</DeviceContainer>
    </SummaryPage>
  );
}
