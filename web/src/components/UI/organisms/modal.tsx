import React from "react";
import MuiModal from "@mui/material/Modal";
import styled from "styled-components";
import FlexContainer from "../layouts/flex-container";
import Icon, { Sizes } from "../atoms/icon";
import Loader, { Size as LoaderSize } from "../atoms/loader";

const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 50;

/* ------------------------ Loader ---------------------- */

const LoaderContainer = styled(FlexContainer)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.backdrop};
  z-index: 1;
  align-items: center;
  justify-content: center;
`;

const MessageContainer = styled(FlexContainer)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const Message = styled.span`
  color: ${(props) => props.theme.colors.font_primary};
  font-size: 14px;
`;

type ModalLoaderProps = {
  message: string;
};

export function ModalLoader(props: ModalLoaderProps) {
  const { message } = props;
  return (
    <LoaderContainer>
      <MessageContainer>
        <Loader size={LoaderSize.S} />
        <Message>{message}</Message>
      </MessageContainer>
    </LoaderContainer>
  );
}

/* ------------------------ HEADER ---------------------- */

const HeaderContainer = styled(FlexContainer)`
  height: ${HEADER_HEIGHT}px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.bg_secondary};

  & {
    .icon {
      color: ${(props) => props.theme.colors.font_secondary};
      cursor: pointer;
    }
  }
`;

const Title = styled.div`
  width: calc(100% - 40px);
  font-size: 16px;
  font-weight: 700;
`;

type HeaderPropsType = {
  title: string;
  showClose?: boolean;
  onClose?: () => any;
};

export function ModalHeader(props: HeaderPropsType) {
  const { title, showClose, onClose } = props;
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {showClose && <Icon name="close" size={Sizes.XL} onClick={onClose} />}
    </HeaderContainer>
  );
}

/* ------------------------ MODAL BODY ---------------------- */

const BodyContainer = styled.div`
  width: 100%;
  max-height: 600px;
  min-height: 200px;
  overflow: auto;
`;

type BodyPropsType = {
  children: JSX.Element | JSX.Element[];
};

export function ModalBody(props: BodyPropsType) {
  const { children } = props;
  return <BodyContainer>{children}</BodyContainer>;
}

/* ------------------------ FOOTER ---------------------- */

const FooterContainer = styled(FlexContainer)`
  height: ${FOOTER_HEIGHT}px;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.bg_secondary};
  gap: 20px;
  padding: 0 10px 0 0;
`;

type FooterPropsType = {
  children: JSX.Element | JSX.Element[];
};

export function ModalFooter(props: FooterPropsType) {
  const { children } = props;
  return <FooterContainer>{children}</FooterContainer>;
}

/* ------------------------ MODAL ---------------------- */

const ModalContainer = styled(MuiModal)`
  .modal-backdrop {
    background: rgba(0, 0, 0, 0.7) !important;
    transition: opacity 100ms ease-in 0ms !important;
  }
`;

const Child = styled(FlexContainer)`
  position: absolute;
  flex-direction: column;
  width: 500px;
  overflow: auto;
  background: ${(props) => props.theme.colors.bg_primary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0);

  &:focus {
    outline: none !important;
  }
  color: ${(props) => props.theme.colors.font_primary};
`;

type PropsType = {
  open: boolean;
  children: null | JSX.Element | (JSX.Element | null)[];
  onClose: () => any;
  onPrimaryAction?: () => any;
};

export default function Modal(props: PropsType) {
  const { open, onClose, children } = props;

  return (
    <div>
      <ModalContainer
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          className: "modal-backdrop",
          transitionDuration: 1,
        }}
      >
        <Child>{children}</Child>
      </ModalContainer>
    </div>
  );
}
