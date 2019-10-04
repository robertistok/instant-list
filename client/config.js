// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint = "http://localhost:4000";
export const prodEndpoint = "https://instantlist-yoga-prod.herokuapp.com";
export const TODOIST_CLIENT_ID_PROD = "df5e92dd2e2843e49aac5e1b17f7de7b";
export const TODOIST_CLIENT_ID_DEV = "6694150e42b74e62985f80ef12cd0d86";
export const TODOIST_CLIENT_ID =
  process.env.NODE_ENV === "development" ? TODOIST_CLIENT_ID_DEV : TODOIST_CLIENT_ID_PROD;
export const TODOIST_RANDOM = "ZGrVmtnAV23j7GLNmCb3YCX8";
