const axios = require("axios");
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "./../api";

const api = (store) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);
  next(action);
  const { url, onSuccess, onError, method, data } = action.payload;
  try {
    const responce = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });
    //general
    store.dispatch(apiCallSuccess(responce.data));
    // specific
    if (onSuccess) store.dispatch({ type: onSuccess, payload: responce.data });
  } catch (error) {
    // for general errors
    store.dispatch(apiCallFailed(error));
    // for specific errors
    if (onError) store.dispatch({ type: onError, payload: error });
  }
};

export default api;
