import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import App from "./pages/app1.page";
import { BrowserRouter as Router } from 'react-router-dom';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: () => (
    <Router>
      <App />
    </Router>
  ),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
