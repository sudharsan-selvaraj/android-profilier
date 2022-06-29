import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSelectedThemeName } from "../../../store/selectors/ui/theme-selector";
import {
  getErrorToastMessages,
  getSuccessToastMessages,
} from "../../../store/selectors/ui/toast-selector";
import { toast, ToastOptions, ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

const Container = styled(ToastContainer)``;

export default function Toast() {
  const errorToasts = useSelector(getErrorToastMessages);
  const successToasts = useSelector(getSuccessToastMessages);
  const selectedTheme = useSelector(getSelectedThemeName);
  const toastConfig: ToastOptions = {
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
  };

  useEffect(() => {
    toast(errorToasts[errorToasts.length - 1], {
      ...toastConfig,
      theme: selectedTheme == "dark" ? "dark" : "light",
      type: "error",
    });
  }, [errorToasts]);

  useEffect(() => {
    toast(successToasts[successToasts.length - 1], {
      ...toastConfig,
      theme: selectedTheme == "dark" ? "dark" : "light",
      type: "success",
    });
  }, [successToasts]);

  return <Container />;
}
