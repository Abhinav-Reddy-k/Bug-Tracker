const axios = require("axios");
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "./../api";

const api = (store) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);
  next(action);
  const { url, onSuccess, onError, method, data, onLoading } = action.payload;
  if (onLoading) store.dispatch({ type: onLoading });

  try {
    const responce = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });

    // specific
    if (onSuccess) store.dispatch({ type: onSuccess, payload: responce.data });
    //general
    else store.dispatch(apiCallSuccess(responce.data));
  } catch (error) {
    // for general errors
    store.dispatch(apiCallFailed(error.message));
    // for specific errors
    if (onError) store.dispatch({ type: onError, payload: error.message });
  }
};

export default api;
