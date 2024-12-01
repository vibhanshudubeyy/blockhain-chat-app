import "@/styles/globals.css";
import { Component } from "react";

const MyApp = ({Component, pageProps}) => (
  <div>
    <Component {...pageProps} />
  </div>
);

export default MyApp;
