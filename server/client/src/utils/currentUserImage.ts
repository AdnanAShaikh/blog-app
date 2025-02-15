export const getCurrentUserImage = (userData: any) =>
  `${
    process.env.REACT_APP_LOCAL_SERVER_URL ||
    process.env.REACT_APP_GLOBAL_SERVER_URL
  }${userData?.image || ""}`;
