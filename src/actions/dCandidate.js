import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CAREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

const formatData = (data) => ({
  ...data,
  age: parseInt(data.age ? data.age : 0),
});

export const fetchAll = () => {
  return (dispatch) => {
    api
      .dCandidate()
      .fetchAll()
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.FETCH_ALL,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const Create = (data, onSuccess) => {
  return (dispatch) => {
    data = formatData(data);
    api
      .dCandidate()
      .create(data)
      .then((res) => {
        dispatch({
          type: ACTION_TYPES.CREATE,
          payload: res.data,
        });

        onSuccess();
      })
      .catch((err) => console.log(err));
  };
};

export const Update = (id, data, onSuccess) => {
  return (dispatch) => {
    data = formatData(data);
    api
      .dCandidate()
      .update(id, data)
      .then((res) => {
        dispatch({
          type: ACTION_TYPES.UPDATE,
          payload: { id: id, ...data },
        });
        onSuccess();
      })
      .catch((err) => console.log(err));
  };
};

export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .dCandidate()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        paylad: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
