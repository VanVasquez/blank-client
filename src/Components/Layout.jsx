import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../Theme";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
