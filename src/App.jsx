import "./App.css";
import { UserManager, WebStorageStateStore } from "oidc-client";
import { login, logout } from "./helpers/auth_helper";

const userManagerConfig = {
  authority: "http://localhost:8080/realms/ecommerce-qa/",
  client_id: "frontend_keycloak",
  redirect_uri: window.location.origin + "/signin-callback.html",
  response_type: "code",
  scope: "openid profile email",
  // post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const App = () => {
  const userManager = new UserManager(userManagerConfig);

  function handleMessage(event) {
    if (event.origin === window.location.origin && event.data === "keycloak-iframe:logged-in") {
      // Code to handle successful login
      // e.g., Redirect the user to a logged-in page
      window.location.href = "/loggedin-page";
    }
  }

  window.addEventListener("message", handleMessage, false);

  function handleLogin() {
    userManager.signinRedirect();
  }

  const callBackend = async () => {
    // const response = await axiosPrivate.post(
    //   "/test",
    //   json
    //   );
    console.log("call backedn");
  };

  return (
    <>
      <p className="read-the-docs">Frontend - Keycloak</p>
      <div className="container">
        <button className="btn-login" onClick={handleLogin}>
          Login
        </button>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
        <button onClick={callBackend} className="btn-backend">
          Call Backend
        </button>
      </div>
      {/* <iframe id="keycloak-iframe" src={userManager.createSigninRequest()} /> */}
    </>
  );
};

export default App;
