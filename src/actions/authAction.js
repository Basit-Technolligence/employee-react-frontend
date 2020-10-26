import authReducer from "../reducers/authReducer";
import { setToken } from "./setToken";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
  }
  try {
    const response = await axios.get("https://employee-node-backend.herokuapp.com/xyz");
    dispatch({
      type: "LOAD_USER",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    const response = await axios.post("https://employee-node-backend.herokuapp.com/login", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data,
    });
    await dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOGIN_FAIL", payload: error });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
