const userReducer = (user, { type, payload }) => {
  switch (type) {
    case "AUTH_SUCCESS":
      return { ...payload };
    case "LOG_OUT":
      return null;
  }
};

export default userReducer;
