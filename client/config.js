// This is client side config only - don't put anything in here that shouldn't be public!

module.exports = {
  devEndpoint: "http://localhost:4000",
  prodEndpoint: "https://instantlist-yoga-prod.herokuapp.com",
  TODOIST_CLIENT_ID:
    process.env.NODE_ENV === "development"
      ? "6694150e42b74e62985f80ef12cd0d86"
      : "df5e92dd2e2843e49aac5e1b17f7de7b",
  TODOIST_RANDOM: "ZGrVmtnAV23j7GLNmCb3YCX8"
};
