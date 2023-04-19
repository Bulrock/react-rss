var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import * as jsxRuntime from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { useDispatch, useSelector, Provider } from "react-redux";
import { Link, NavLink, Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState, useCallback, useEffect, Suspense, Fragment as Fragment$1, createElement, useRef } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function AboutPage() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "main", children: [
    /* @__PURE__ */ jsx("h1", { "data-testid": "about-h1", children: "What is this?" }),
    /* @__PURE__ */ jsx("p", { "data-testid": "about-p", children: "Website based on the television show Rick and Morty. You will have access to about hundreds of characters. It filled with information as seen on the TV show from The Rick and Morty API." })
  ] }) });
}
const notFound = "/assets/notFound-53fc2daf.png";
function NotFoundPage() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "main", "data-testid": "main", children: [
    /* @__PURE__ */ jsx("h1", { className: "not-found-title", "data-testid": "not-found-h1", children: "404" }),
    /* @__PURE__ */ jsxs("p", { className: "not-found-p", "data-testid": "not-found-p", children: [
      "This Universe does not exist. Go your home",
      " ",
      /* @__PURE__ */ jsx(Link, { className: "not-found-link", to: "/", "data-testid": "not-found-link", children: "planet" })
    ] }),
    /* @__PURE__ */ jsx("img", { className: "not-found-img", src: notFound })
  ] }) });
}
const github = "/assets/github-c51a0dcf.svg";
const school_logo = "/assets/school_logo-5051c991.svg";
function Footer() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("footer", { className: "footer", "data-testid": "footer-test", children: /* @__PURE__ */ jsxs("div", { className: "container bottom", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        className: "social-link",
        href: "https://github.com/bulrock",
        target: "_blank",
        rel: "noreferrer",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "icon github-icon",
            "data-testid": "github-icon",
            src: github,
            alt: "github icon"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "copyrights", "data-testid": "copyrights", children: "React © 2023" }),
    /* @__PURE__ */ jsx("a", { href: "https://rs.school/js/", className: "social-link", children: /* @__PURE__ */ jsx("img", { className: "logo", "data-testid": "logo", src: school_logo, alt: "rs school logo" }) })
  ] }) }) });
}
function Header() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("header", { className: "header-main", "data-testid": "header-test", children: /* @__PURE__ */ jsxs("div", { className: "header-links", "data-testid": "header-links-test", children: [
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/",
        style: ({ isActive }) => isActive ? { textDecoration: "none", color: "blue" } : {},
        "data-testid": "home-link",
        children: "Home"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/form",
        style: ({ isActive }) => isActive ? { textDecoration: "none", color: "blue" } : {},
        "data-testid": "form-link",
        children: "Form"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/about",
        style: ({ isActive }) => isActive ? { textDecoration: "none", color: "blue" } : {},
        "data-testid": "about-link",
        children: "About"
      }
    )
  ] }) }) });
}
const Main = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "container", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const viewsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGeSURBVHgB7VSxdcJADJXdQOkRGIFsQCbIywRcB1R4Ax8TYDpKMwHZIGwQj8AGcenKzpetc5yLgiFNUvDfk8/2SfqSTjqiO/4awZBCHMdRWZZTvE5EqKqqIgzDfL/fn35NsFwuJ0EQrOHMYI00nbquC+y94HUDsvPVBKvVagvjmG6DBcnmIoFEfYTzqad34ijH43GepmkBvRm+DWT+xVkQ5LB97mfTEUit30jq3AOnb0kBiPh/4pOMRqNHDoS/Q7cB51vFeeacw1myWCzeRViXZO/UN+DsxRd1BDA2krKPAz/4TLBYPmyRWKJvMlTsjJSxJQDrWlEi14bcSf4edxiviDYnHUlHAOVC0+BzoQFkWabaIuioIyA9TZIB4wB2ioOmfK4UPpxNQyClOCh6iexbLDseLBZqO8vNyVyx4+bIGiL3xxgTob1ewezPgDpAEj0HYL3fZ8zLg2vTb4OGCI8KSQY5cKa9u4mdz/pKFwfNI7LkDdAV2PXK9kn6kzZng8UioqeBy47PLr3pslPIZpiFKa5oR3Smtta5q/Ud/xcfFuTUC2x5LscAAAAASUVORK5CYII=";
const likesIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAYCAYAAAALQIb7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGJSURBVHgBvVbLcYNADBVrDj5SgktwBy4hTgVJDvxOwRVkUkHwjRkOpgMnFSQlOB1sCeQEFyBPGGY8jPHy9ZtZxC4STxIrsRoNhOu6H0VReJqmnSAfgyCQKhtBA2BZ1paJ+B5yDXHoYjeITAhhXM4R3drzPENpRxMA0Rlpmq5VepOQMTg6lc5Qsk1zIcsyqTLqTWaaJkfw3FxHKqXKtjfZYrE4NteQwjgMw5PKVqMesG37FS/2m+uI6hPru1u2XIedyRzHWUF8Y6xoAOCQ34mMayhJkgO839IIaPC4UOhEdE73E42D1PkCjw2EWeY8z3MD8w3GL6ZvNB1edJDEdP4OZX9DK6ofjkpZE1z0eLeQdAdwUAKXP5ofEbZ+xDmTND/KgO5FVkJg98U0LyRG2XWEruvyisIPnNjRRFHXR4a2yN6xSx/wbE8jUZVWCXHtoMJFjrHn4ub5crn0qkYrqSdg91Xf65WUdNFg4c2xUmQR+b7P3vnokRF+/8qzRg04GVe27WRtqAwHb6h/dkGWAcl8LRkAAAAASUVORK5CYII=";
const initialState$5 = {
  value: []
};
const LikeRepositorySlice = createSlice({
  name: "like",
  initialState: initialState$5,
  reducers: {
    updateLikeArr: (state, action) => {
      state.value = action.payload;
    }
  }
});
const { updateLikeArr } = LikeRepositorySlice.actions;
const StateLikeRepositoryReducer = LikeRepositorySlice.reducer;
const useAppDispatch = useDispatch;
const useAppSelector = useSelector;
function StateLikeRepository(action) {
  const likeArray = useAppSelector((state) => state.likeArray.value);
  const dispatch = useAppDispatch();
  if (action === "find") {
    return function find2(key) {
      const isFind = likeArray.some((keyId) => keyId === key) ? true : false;
      return isFind;
    };
  } else if (action === "add") {
    return function add(key) {
      const newLikeArr = [...likeArray, key];
      dispatch(updateLikeArr(newLikeArr));
    };
  } else {
    return function remove(key) {
      const arr = likeArray.filter((element) => element !== key);
      dispatch(updateLikeArr(arr));
    };
  }
}
const initialState$4 = {
  value: []
};
const ViewRepositorySlice = createSlice({
  name: "view",
  initialState: initialState$4,
  reducers: {
    updateViewArr: (state, action) => {
      state.value = action.payload;
    }
  }
});
const { updateViewArr } = ViewRepositorySlice.actions;
const StateViewRepositoryReducer = ViewRepositorySlice.reducer;
function StateViewRepository(action) {
  const viewArray = useAppSelector((state) => state.viewArray.value);
  const dispatch = useAppDispatch();
  if (action === "find") {
    return function find2(key) {
      const isFind = viewArray.some((keyId) => keyId === key) ? true : false;
      return isFind;
    };
  } else {
    return function add(key) {
      const newViewArr = [...viewArray, key];
      dispatch(updateViewArr(newViewArr));
    };
  }
}
const initialState$3 = {
  id: ""
};
const CardSlice = createSlice({
  name: "card",
  initialState: initialState$3,
  reducers: {
    updateId: (state, action) => {
      state.id = action.payload;
    }
  }
});
const { updateId } = CardSlice.actions;
const CardReducer = CardSlice.reducer;
function Card({ canDraw, character, setModalActive, onCharacterCardClick }) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [info, setInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const findLikeState = StateLikeRepository("find");
  const addLikeState = StateLikeRepository("add");
  const removeLikeState = StateLikeRepository("remove");
  const findViewState = StateViewRepository("find");
  const addViewState = StateViewRepository("add");
  const dispatch = useAppDispatch();
  const componentDidMount = useCallback(() => {
    let isLiked2 = false;
    if (character && !("data" in character) && "id" in character) {
      const liked = findLikeState(character.id);
      if (typeof liked === "boolean") {
        isLiked2 = liked;
      }
    }
    const likes2 = isLiked2 ? 1 : 0;
    let isViewed2 = false;
    if (character && "id" in character) {
      const viewed = findViewState(character.id);
      if (typeof viewed === "boolean") {
        isViewed2 = viewed;
      }
    }
    const views2 = isViewed2 ? 1 : 0;
    if (isLiked2) {
      setIsLiked(isLiked2);
    }
    setLikes(likes2);
    if (isViewed2) {
      setIsViewed(isViewed2);
    }
    setViews(views2);
  }, [character, findLikeState, findViewState]);
  const handleCardClick = () => {
    setModalActive(true);
    if (character && "id" in character) {
      if (onCharacterCardClick) {
        onCharacterCardClick(character);
      }
      dispatch(updateId(String(character.id)));
    }
    handleInfoClick();
  };
  useEffect(() => {
    componentDidMount();
  }, [componentDidMount]);
  const handleLikesClick = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(!isLiked);
      if (character && "id" in character && addLikeState) {
        addLikeState(character.id);
      }
    } else {
      setLikes(likes - 1);
      setIsLiked(!isLiked);
      if (character && "id" in character && removeLikeState) {
        removeLikeState(character.id);
      }
    }
  };
  const handleInfoClick = () => {
    if (!isViewed) {
      setViews(views + 1);
      setInfo(!info);
      setIsViewed(!isViewed);
      if (character && "id" in character && addViewState) {
        addViewState(character.id);
      }
    } else {
      setInfo(!info);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: character && "id" in character && canDraw && /* @__PURE__ */ jsxs("div", { className: "card", "data-testid": "card", onClick: handleCardClick, children: [
    /* @__PURE__ */ jsx("div", { className: "card-header-wrapper", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("img", { className: "person-img", src: character.image, alt: "person image", loading: "lazy" }),
      /* @__PURE__ */ jsx("h2", { className: "person-name", children: character.name }),
      /* @__PURE__ */ jsxs("span", { className: "person-status", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-testid": "status-icon",
            className: character.status === "Alive" ? "status-icon-green" : "status-icon-red"
          }
        ),
        /* @__PURE__ */ jsxs("strong", { children: [
          character.status,
          " - ",
          character.species
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("hr", { className: "hr" }),
      /* @__PURE__ */ jsxs("div", { className: "card-footer-wrapper", children: [
        /* @__PURE__ */ jsxs("div", { className: "likes-block", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "like-img",
              src: likesIcon,
              alt: "like image",
              onClick: handleLikesClick
            }
          ),
          /* @__PURE__ */ jsx("strong", { className: "card-footer-text", "data-testid": "likes", children: likes })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "views-block", children: [
          /* @__PURE__ */ jsx("img", { className: "views-img", src: viewsIcon, alt: "views image", loading: "lazy" }),
          /* @__PURE__ */ jsx("strong", { className: "card-footer-text", "data-testid": "views", children: views })
        ] })
      ] })
    ] })
  ] }) });
}
function Roller({ classRoller }) {
  return /* @__PURE__ */ jsxs("div", { "data-testid": "roller", className: classRoller, children: [
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {})
  ] });
}
const ErrorMessage = React.lazy(() => import("./assets/ErrorMessage-7c4ebe22.js"));
function Cards(props) {
  return /* @__PURE__ */ jsxs("div", { className: "cards", "data-testid": "cards", children: [
    props.characters && Array.isArray(props.characters) && props.characters.map((character) => {
      return /* @__PURE__ */ jsx(
        Card,
        {
          setModalActive: props.setModalActive,
          onCharacterCardClick: props.onCharacterCardClick,
          character,
          canDraw: props.canDraw
        },
        String(character.id)
      );
    }),
    props.characters && !Array.isArray(props.characters) && "data" in props.characters && props.canDraw && /* @__PURE__ */ jsx("div", { className: "roller-wrapper", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Roller, { classRoller: "lds-roller-main lds-roller" }), children: /* @__PURE__ */ jsx(ErrorMessage, {}) }) })
  ] });
}
function FormField(props) {
  const renderTextInput = () => {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
        props.formField.labels[0],
        /* @__PURE__ */ jsx(
          "input",
          {
            placeholder: props.formField.placeholder,
            "data-testid": props.formField.ids[0],
            ...props.register(props.formField.register, {
              required: props.formField.required,
              pattern: props.formField.patern,
              minLength: props.formField.minLength
            })
          },
          props.formField.ids[0]
        )
      ] }),
      props.formField.ids[0] === "name" && props.errors.name && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.name.message }),
      props.formField.ids[0] === "origin" && props.errors.origin && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.origin.message }),
      props.formField.ids[0] === "location" && props.errors.location && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.location.message })
    ] });
  };
  const renderRadioInput = () => {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("label", { className: "form-label", children: props.formField.ids.map((_, index) => {
        var _a;
        return /* @__PURE__ */ jsxs(Fragment$1, { children: [
          props.formField.labels[index],
          /* @__PURE__ */ jsx(
            "input",
            {
              type: props.formField.type,
              "data-testid": props.formField.ids[index],
              ...props.register(props.formField.register, {
                required: props.formField.required,
                pattern: props.formField.patern,
                minLength: props.formField.minLength
              }),
              value: (_a = props.formField.values) == null ? void 0 : _a[index]
            }
          )
        ] }, props.formField.ids[index]);
      }) }),
      props.errors.status && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.status.message })
    ] });
  };
  const renderSelectInput = () => {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
        props.formField.labels[0],
        /* @__PURE__ */ jsx(
          "select",
          {
            "data-testid": props.formField.register,
            ...props.register(props.formField.register, { required: props.formField.required }),
            children: props.formField.ids.map((_, index) => {
              var _a, _b;
              return /* @__PURE__ */ jsx(
                "option",
                {
                  "data-testid": props.formField.ids[index],
                  value: (_a = props.formField.values) == null ? void 0 : _a[index],
                  children: (_b = props.formField.options) == null ? void 0 : _b[index]
                },
                `${props.formField.ids[0]}-${index}`
              );
            })
          }
        )
      ] }),
      props.formField.ids[0] === "select-spec-0" && props.errors.species && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.species.message }),
      props.formField.ids[0] === "select-gen-0" && props.errors.gender && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.gender.message })
    ] });
  };
  const renderInput = () => {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
        props.formField.labels[0],
        /* @__PURE__ */ createElement(
          "input",
          {
            ...props.register(props.formField.register, { required: props.formField.required }),
            type: props.formField.type,
            key: props.formField.ids[0],
            "data-testid": props.formField.ids[0]
          }
        )
      ] }),
      props.formField.type === "file" && props.errors.image && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.image.message }),
      props.formField.type === "date" && props.errors.date && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.date.message }),
      props.formField.type === "checkbox" && props.errors.consest && /* @__PURE__ */ jsx("span", { className: "input-error", children: props.errors.consest.message })
    ] });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    props.formField.type === "text" && renderTextInput(),
    props.formField.type === "radio" && renderRadioInput(),
    props.formField.type === "select" && renderSelectInput(),
    (props.formField.type === "file" || props.formField.type === "date" || props.formField.type === "checkbox") && renderInput(),
    /* @__PURE__ */ jsx("div", { className: "underline" })
  ] });
}
const CharacterFormMetadata = [
  {
    type: "text",
    ids: ["name"],
    register: "name",
    labels: ["Name:"],
    placeholder: "Character name",
    required: "Name is required",
    patern: {
      value: /^[A-Z|А-Я]/,
      message: "Name should start with a capital letter"
    },
    minLength: {
      value: 2,
      message: "Please enter a name longer than 1 character"
    }
  },
  {
    type: "radio",
    ids: ["status-0", "status-1", "status-2"],
    register: "status",
    labels: ["Alive:", "Dead:", "Unknown:"],
    required: "Status is required",
    values: ["Alive", "Dead", "Unknown"]
  },
  {
    type: "select",
    ids: [
      "select-spec-0",
      "select-spec-1",
      "select-spec-2",
      "select-spec-3",
      "select-spec-4",
      "select-spec-5",
      "select-spec-6",
      "select-spec-7",
      "select-spec-8",
      "select-spec-9",
      "select-spec-10",
      "select-spec-11"
    ],
    register: "species",
    labels: ["Species:"],
    required: "Species is required",
    values: [
      "",
      "Alien",
      "Animal",
      "Disease",
      "Fish",
      "Human",
      "Humanoid",
      "Human with giant head",
      "Mythological Creature",
      "Poopybutthole",
      "Robot",
      "Unknown"
    ],
    options: [
      "Select Species",
      "Alien",
      "Animal",
      "Disease",
      "Fish",
      "Human",
      "Humanoid",
      "Human with giant head",
      "Mythological Creature",
      "Poopybutthole",
      "Robot",
      "unknown"
    ]
  },
  {
    type: "select",
    ids: ["select-gen-0", "select-gen-1", "select-gen-2", "select-gen-3"],
    register: "gender",
    labels: ["Gender:"],
    required: "Gender is required",
    values: ["", "Male", "Female", "Unknown"],
    options: ["Select Gender", "Male", "Female", "Unknown"]
  },
  {
    type: "text",
    ids: ["origin"],
    register: "origin",
    labels: ["Origin planet of birth:"],
    placeholder: "Origin planet",
    required: "Origin planet name is required",
    patern: {
      value: /^[A-Z|А-Я]/,
      message: "Origin planet should start with a capital letter"
    },
    minLength: {
      value: 2,
      message: "Please enter a origin planet longer than 1 character"
    }
  },
  {
    type: "text",
    ids: ["location"],
    register: "location",
    labels: ["Last known location:"],
    placeholder: "Last location",
    required: "Last known location is required",
    patern: {
      value: /^[A-Z|А-Я]/,
      message: "Location planet should start with a capital letter"
    },
    minLength: {
      value: 2,
      message: "Please enter a location planet longer than 1 character"
    }
  },
  {
    type: "file",
    ids: ["image"],
    register: "image",
    labels: ["Image:"],
    required: "Select character image"
  },
  {
    type: "date",
    ids: ["date"],
    register: "date",
    labels: ["Date of character creation:"],
    required: "Select date of creation"
  },
  {
    type: "checkbox",
    ids: ["checkbox"],
    register: "consest",
    labels: ["I consent to this data"],
    required: "Confirm information publishing before submitting"
  }
];
class UuidGenerator {
  generateUuid() {
    return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, (character) => {
      const random = Math.random() * 16 | 0;
      const value = character === "x" ? random : random & 3 | 8;
      return value.toString(16);
    });
  }
}
class CharacterFactory {
  constructor() {
    __publicField(this, "UuidGenerator", new UuidGenerator());
  }
  create(values) {
    const uuid = this.UuidGenerator.generateUuid();
    return {
      id: uuid,
      name: values[0],
      status: values[1],
      species: values[2],
      type: "",
      gender: values[3],
      origin: {
        name: values[4],
        url: ""
      },
      location: {
        name: values[5],
        url: "https://rickandmortyapi.com/api/location/6"
      },
      image: values[6],
      episode: ["https://rickandmortyapi.com/api/episode/19"],
      url: `https://rickandmortyapi.com/api/character/${uuid}`,
      created: values[7]
    };
  }
}
const initialState$2 = {
  value: []
};
const CharacterFormSlice = createSlice({
  name: "charcterForm",
  initialState: initialState$2,
  reducers: {
    addCharacter: (state, action) => {
      state.value.push(action.payload);
    }
  }
});
const { addCharacter } = CharacterFormSlice.actions;
const CharacterFormReducer = CharacterFormSlice.reducer;
function useSubmitForm(setShowSubmitMessage, getValues, reset) {
  const dispatch = useAppDispatch();
  const useSubmit = (data, event) => {
    const characterFactory = new CharacterFactory();
    event == null ? void 0 : event.preventDefault();
    setShowSubmitMessage(true);
    setTimeout(() => {
      setShowSubmitMessage(false);
      const characterData = Object.values(getValues());
      const filteredData = characterData.map((value) => {
        if (value && typeof value === "string") {
          return value;
        } else if (value && typeof value === "boolean") {
          return;
        } else if (value) {
          return URL.createObjectURL(getValues("image")[0]);
        }
      }).filter((value) => value !== void 0);
      const newCharcter = characterFactory.create(filteredData);
      dispatch(addCharacter(newCharcter));
      reset();
    }, 1e3);
  };
  return useSubmit;
}
function CharacterForm() {
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  return /* @__PURE__ */ jsxs(
    "form",
    {
      "data-testid": "form",
      className: "character-form",
      onSubmit: handleSubmit(useSubmitForm(setShowSubmitMessage, getValues, reset)),
      children: [
        CharacterFormMetadata.map((_, index) => {
          return /* @__PURE__ */ jsx(
            FormField,
            {
              formField: CharacterFormMetadata[index],
              register,
              errors
            },
            index
          );
        }),
        /* @__PURE__ */ jsx("div", { className: "form-buttons", children: /* @__PURE__ */ jsx("button", { "data-testid": "form-submit-btn", type: "submit", children: "Submit form" }) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-testid": "submit-message",
            className: showSubmitMessage ? "submit-message" : "notsubmit-message",
            children: "Data has been saved"
          }
        )
      ]
    }
  );
}
const cross = "/assets/cross-20c735ad.svg";
const ModalFormPage = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-testid": "modal",
      className: props.active ? "modal active" : "modal",
      onClick: () => {
        props.setActive(false);
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: props.active ? "modal-content active" : "modal-content",
          onClick: (e) => e.stopPropagation(),
          children: /* @__PURE__ */ jsxs("div", { className: "card-modal", "data-testid": "card-modal", children: [
            /* @__PURE__ */ jsx("div", { className: "modal-close-cross", children: /* @__PURE__ */ jsx(
              "img",
              {
                "data-testid": "modal-close-btn",
                className: "cross-img",
                src: cross,
                alt: "modal-close-icon",
                onClick: () => {
                  props.setActive(false);
                }
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "card-header-wrapper", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "person-img",
                  src: (_a = props.characterModal) == null ? void 0 : _a.image,
                  alt: "person image",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsx("h2", { className: "person-name", children: (_b = props.characterModal) == null ? void 0 : _b.name }),
              /* @__PURE__ */ jsxs("span", { className: "person-status", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    "data-testid": "person-status-ico",
                    className: ((_c = props.characterModal) == null ? void 0 : _c.status) === "Alive" ? "status-icon-green" : "status-icon-red"
                  }
                ),
                /* @__PURE__ */ jsxs("strong", { children: [
                  (_d = props.characterModal) == null ? void 0 : _d.status,
                  " - ",
                  (_e = props.characterModal) == null ? void 0 : _e.species
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "person-loc", "data-testid": "person-loc", children: [
                /* @__PURE__ */ jsx("span", { className: "person-location-title", children: "Last known location:" }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("strong", { className: "person-location-name", children: (_f = props.characterModal) == null ? void 0 : _f.location.name }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "person-gender-title", children: "Gender:" }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("strong", { className: "person-gender", children: (_g = props.characterModal) == null ? void 0 : _g.gender })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "person-loc", "data-testid": "person-info-block", children: [
                /* @__PURE__ */ jsx("span", { className: "person-info-title", children: "Origin place of birth:" }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("strong", { className: "person-info-name", children: (_h = props.characterModal) == null ? void 0 : _h.origin.name }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "person-birth-title", children: "Date of birth:" }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("strong", { className: "person-date", children: (_i = props.characterModal) == null ? void 0 : _i.created.slice(0, 10) })
              ] })
            ] }) })
          ] })
        }
      )
    }
  );
};
function FormPage() {
  const [modalActive, setModalActive] = useState(false);
  const [characterModal, setCharacterModal] = useState(null);
  const formCharacters = useAppSelector((state) => {
    var _a;
    return (_a = state.formCharacters) == null ? void 0 : _a.value;
  });
  const handleCardClickFormPage = (character) => {
    setCharacterModal(character);
    setModalActive(true);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { "data-testid": "form-page", children: /* @__PURE__ */ jsxs("div", { className: "main", children: [
      /* @__PURE__ */ jsx("h1", { "data-testid": "form-h1", children: "Create new Character with form" }),
      /* @__PURE__ */ jsx(CharacterForm, {}),
      /* @__PURE__ */ jsx(
        Cards,
        {
          canDraw: true,
          setModalActive,
          onCharacterCardClick: handleCardClickFormPage,
          characters: formCharacters
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      ModalFormPage,
      {
        characterModal,
        active: modalActive,
        setActive: setModalActive
      }
    )
  ] });
}
const charactersAPI = createApi({
  reducerPath: "charactersAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getAllCharacters: builder.query({
      query: (search) => `character/${search}`
    }),
    getCharacters: builder.query({
      query: (search) => `character/?name=${search}`
    }),
    getCharacterById: builder.query({
      query: (id) => `character/${id}`
    })
  })
});
const { useGetAllCharactersQuery, useGetCharactersQuery, useGetCharacterByIdQuery } = charactersAPI;
const Modal = (props) => {
  const [characterModal, setCharacterModal] = useState(null);
  const cardId = useAppSelector((state) => state.card.id);
  const { data: fetchCharacterModal, isFetching } = useGetCharacterByIdQuery(cardId, {
    skip: !props.active
  });
  useEffect(() => {
    if (fetchCharacterModal && "id" in fetchCharacterModal) {
      setCharacterModal(fetchCharacterModal);
    }
  }, [fetchCharacterModal]);
  if (!isFetching && characterModal && "id" in characterModal) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-testid": "modal",
        className: props.active ? "modal active" : "modal",
        onClick: () => {
          props.setActive(false);
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            "data-testid": "modal-content",
            className: props.active ? "modal-content active" : "modal-content",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxs("div", { className: "card-modal", "data-testid": "card-modal", children: [
              /* @__PURE__ */ jsx("div", { className: "modal-close-cross", children: /* @__PURE__ */ jsx(
                "img",
                {
                  "data-testid": "modal-close-btn",
                  className: "cross-img",
                  src: cross,
                  alt: "modal-close-icon",
                  onClick: () => {
                    props.setActive(false);
                  }
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "card-header-wrapper", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    className: "person-img",
                    src: characterModal.image,
                    alt: "person image",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsx("h2", { className: "person-name", children: characterModal.name }),
                /* @__PURE__ */ jsxs("span", { className: "person-status", children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      "data-testid": "person-status-ico",
                      className: characterModal.status === "Alive" ? "status-icon-green" : "status-icon-red"
                    }
                  ),
                  /* @__PURE__ */ jsxs("strong", { children: [
                    characterModal.status,
                    " - ",
                    characterModal.species
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "person-loc", "data-testid": "person-loc", children: [
                  /* @__PURE__ */ jsx("span", { className: "person-location-title", children: "Last known location:" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("strong", { className: "person-location-name", children: characterModal.location.name }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "person-gender-title", children: "Gender:" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("strong", { className: "person-gender", children: characterModal.gender })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "person-loc", "data-testid": "person-info-block", children: [
                  /* @__PURE__ */ jsx("span", { className: "person-info-title", children: "Origin place of birth:" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("strong", { className: "person-info-name", children: characterModal.origin.name }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "person-birth-title", children: "Date of birth:" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("strong", { className: "person-date", children: characterModal.created.slice(0, 10) })
                ] })
              ] }) })
            ] })
          }
        )
      }
    );
  } else {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-testid": "modal-error",
        className: props.active ? "modal active" : "modal",
        onClick: () => props.setActive(false),
        children: /* @__PURE__ */ jsx(
          "div",
          {
            "data-testid": "modal-content-error",
            className: props.active ? "modal-content active" : "modal-content",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxs("div", { className: "card-modal", "data-testid": "card-modal", children: [
              /* @__PURE__ */ jsx("div", { className: "modal-close-cross", children: /* @__PURE__ */ jsx(
                "img",
                {
                  "data-testid": "modal-close-btn",
                  className: "cross-img",
                  src: cross,
                  alt: "modal-close-icon",
                  onClick: () => props.setActive(false)
                }
              ) }),
              !isFetching && /* @__PURE__ */ jsx("div", { className: "card-header-wrapper", children: /* @__PURE__ */ jsx("div", { className: "modal-error", children: /* @__PURE__ */ jsx("div", { "data-testid": "on-error", children: "Failed to fetch Character Information!" }) }) }),
              isFetching && /* @__PURE__ */ jsx(Roller, { classRoller: "lds-roller-modal lds-roller" })
            ] })
          }
        )
      }
    );
  }
};
const find = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEQSURBVHgB5ZaNDYIwEIWfTsAIjOAIHYEN7AayiWzCCIQJOoJsUDfANjkjOSrXFkQTv+SFn/b10aZwAD+Icro6GSfrNNLR0P0TNqJ06ihAUkv9sznjNZtYWfJlhY0rlBRaIjyzzqlyKqhfQdehJbdIWN42MEAteOo3DyhyyghbClWSqcl5ygl8eRvJYJihQhoV8xvJwDdLgTQKzDfPjMPkfFxoi0Uc4zg5v7O2nBliYbxZ4MDaFNJQ7HqAENiztgvS4P17yaCQ/x5eAt6oKtJlhIbCWkRSYudvqUdjXbVIrhjP0NR6uDq0RLh6hGS2CvX43dYg/E/j7yvqp7cMjUX/dajFh9Es8IYd8F8pS9L4Bg/MGuPLsWFRSgAAAABJRU5ErkJggg==";
const initialState$1 = {
  value: ""
};
const SearchBarSlice = createSlice({
  name: "search",
  initialState: initialState$1,
  reducers: {
    updateSearch: (state, action) => {
      state.value = action.payload;
    }
  }
});
const { updateSearch } = SearchBarSlice.actions;
const SearchBarReducer = SearchBarSlice.reducer;
function SearchBar() {
  const searchRef = useRef(null);
  const searchValue = useAppSelector((state) => {
    var _a;
    return (_a = state.search) == null ? void 0 : _a.value;
  });
  const dispatch = useAppDispatch();
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (searchRef.current) {
        dispatch(updateSearch(searchRef.current.value));
      }
    },
    [dispatch]
  );
  return /* @__PURE__ */ jsxs("form", { className: "wrapper-search", "data-testid": "search-test", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "search-bar", children: [
      /* @__PURE__ */ jsx("img", { className: "search-img", src: find, alt: "find" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "search",
          defaultValue: searchValue || "",
          "data-testid": "search-input",
          ref: searchRef
        }
      )
    ] }),
    /* @__PURE__ */ jsx("button", { className: "btn", "data-testid": "search-btn", onClick: handleSubmit, children: "Search" })
  ] });
}
const initialState = {
  searchResults: []
};
const CharactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    updateSearchResults: (state, action) => {
      state.searchResults = action.payload;
    }
  }
});
const { updateSearchResults } = CharactersSlice.actions;
const CharactersFetchReducer = CharactersSlice.reducer;
function HomePage() {
  const [canDrawCard, setCanDrawCard] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const searchCharacters = useAppSelector((state) => {
    var _a;
    return (_a = state.characters) == null ? void 0 : _a.searchResults;
  });
  const searchValue = useAppSelector((state) => {
    var _a;
    return (_a = state.search) == null ? void 0 : _a.value;
  });
  const dispatch = useAppDispatch();
  const { data: initialCharacters, isFetching: initialFetch } = useGetAllCharactersQuery(" ");
  useEffect(() => {
    if (initialCharacters) {
      dispatch(updateSearchResults(initialCharacters.results));
    }
  }, [dispatch, initialCharacters]);
  const {
    data: fetchedCharacters,
    isFetching: searchFetch,
    error
  } = useGetCharactersQuery(searchValue || "", {});
  useEffect(() => {
    if (error && "status" in error) {
      dispatch(updateSearchResults(error));
    } else if (fetchedCharacters) {
      dispatch(updateSearchResults(fetchedCharacters.results));
    }
    if (searchCharacters) {
      setCanDrawCard(true);
    }
  }, [dispatch, error, fetchedCharacters, searchCharacters]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { "data-testid": "home-page-component", children: [
      /* @__PURE__ */ jsx(SearchBar, {}),
      !initialFetch && !searchFetch ? /* @__PURE__ */ jsxs("div", { className: "main", children: [
        /* @__PURE__ */ jsx("h1", { "data-testid": "home-h1", children: "The Rick and Morty Universe" }),
        /* @__PURE__ */ jsx(
          Cards,
          {
            setModalActive,
            characters: searchCharacters,
            canDraw: canDrawCard
          }
        )
      ] }) : /* @__PURE__ */ jsx(Roller, { classRoller: "lds-roller-main lds-roller" })
    ] }),
    /* @__PURE__ */ jsx(Modal, { active: modalActive, setActive: setModalActive })
  ] });
}
const routers = createBrowserRouter([
  {
    path: "/",
    element: /* @__PURE__ */ jsx(Main, {}),
    children: [
      {
        path: "/",
        element: /* @__PURE__ */ jsx(HomePage, {})
      },
      {
        path: "/about",
        element: /* @__PURE__ */ jsx(AboutPage, {})
      },
      {
        path: "/form",
        element: /* @__PURE__ */ jsx(FormPage, {})
      },
      {
        path: "/*",
        element: /* @__PURE__ */ jsx(NotFoundPage, {})
      }
    ]
  }
]);
const App = () => {
  return /* @__PURE__ */ jsx(RouterProvider, { router: routers });
};
const store = configureStore({
  reducer: {
    search: SearchBarReducer,
    card: CardReducer,
    characters: CharactersFetchReducer,
    formCharacters: CharacterFormReducer,
    likeArray: StateLikeRepositoryReducer,
    viewArray: StateViewRepositoryReducer,
    [charactersAPI.reducerPath]: charactersAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersAPI.middleware)
});
function render(url, opts) {
  const stream = renderToPipeableStream(
    /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) }),
    opts
  );
  return stream;
}
export {
  jsx as a,
  render as default,
  jsxs as j
};
