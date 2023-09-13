import { UserManager, WebStorageStateStore } from "oidc-client";

const userManagerConfig = {
  authority: "http://localhost:8080/realms/ecommerce-qa/",
  client_id: "frontend_keycloak",
  redirect_uri: window.location.origin + "/signin-callback.html",
  response_type: "code",
  scope: "openid profile email",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const userManager = new UserManager(userManagerConfig);

export const getUser = () => {
  return userManager.getUser();
};

export const login = () => {
  return userManager.signinRedirect();
  //   return userManager.signinSilent();
};

export const logout = () => {
  return userManager.signoutRedirect();
};
