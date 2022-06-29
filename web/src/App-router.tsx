import React from "react";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ViewHolder from "./components/layouts/view-holder";
import AppLoader from "./components/pages/app-loader";
import NavBar from "./components/UI/organisms/nav-bar";
import { ThemeConfig } from "./constants/themes";
import { AppState } from "./store";
import ReduxActionTypes from "./store/redux-action-types";
import { getSelectedTheme } from "./store/selectors/ui/theme-selector";
import AppCss from "./App.css";
import Toast from "./components/UI/organisms/toast";
import SessionPage from "./components/pages/sessions";
import { socket } from "./socket/client";
import { fetchDevicesSuccess } from "./store/actions/device-actions";
import Devices from "./components/pages/devices";
import SessionProfiler from "./components/pages/session-profilier";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: row;
  background: ${(props) => props.theme.colors.bg_primary};
  color: ${(props) => props.theme.colors.font_primary};

  .MuiList-root {
    background: ${(props) => props.theme.colors.bg_secondary};
    color: ${(props) => props.theme.colors.font_primary}!important;
  }
`;

type PropsType = {
  theme: ThemeConfig;
  isAppInitialised: boolean;
};

function AppRouter(props: PropsType) {
  const { theme, isAppInitialised } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("devices", (data) => {
      console.log(data);
      dispatch(fetchDevicesSuccess(data.devices));
    });
    dispatch({
      type: ReduxActionTypes.INIT_APP,
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppCss />
      <Container>
        {isAppInitialised ? (
          <HashRouter>
            <Toast />
            <NavBar />
            <ViewHolder>
              <Switch>
                <Route exact path="/devices" component={Devices} />
                <Route exact path="/sessions" component={SessionPage} />
                <Route
                  exact
                  path="/sessions/:sessionId"
                  component={SessionProfiler}
                />
              </Switch>
            </ViewHolder>
            <Route exact path="/">
              <Redirect to="/sessions" />
            </Route>
          </HashRouter>
        ) : (
          <AppLoader />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default connect((state: AppState) => {
  return {
    theme: getSelectedTheme(state),
    isAppInitialised: state.ui.appInitialised,
  };
})(AppRouter);
