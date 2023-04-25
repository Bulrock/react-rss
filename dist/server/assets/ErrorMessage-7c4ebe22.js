import { j as jsxs, a as jsx } from "../entry-server.js";
import "react/jsx-runtime";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-redux";
import "react-router-dom";
import "react";
import "@reduxjs/toolkit";
import "react-hook-form";
import "@reduxjs/toolkit/query/react";
const characterNotFound = "/assets/character-not-found-ca0c0547.png";
function ErrorMessage() {
  return /* @__PURE__ */ jsxs("div", { "data-testid": "error-message-container", className: "error-message-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "error-message", children: [
      /* @__PURE__ */ jsx("div", { children: "Character with this name" }),
      /* @__PURE__ */ jsx("div", { children: "was not found!" }),
      /* @__PURE__ */ jsx("div", { children: "Try another one" })
    ] }),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "giant-head-img",
        src: characterNotFound,
        alt: "giant yellow head",
        loading: "lazy"
      }
    )
  ] });
}
export {
  ErrorMessage as default
};
