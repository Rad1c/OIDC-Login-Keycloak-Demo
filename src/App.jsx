import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const App = () => {
  const { instance, accounts } = useMsal();

  const handleLogin = async () => {
    try {
      if (accounts.length === 0) {
        await instance.loginRedirect();
      } else {
        // Handle the case where a user is already logged in
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const acquireAccessToken = async () => {
    var request = {
      scopes: ["openid", "profile"],
    };

    const accounts = instance.getAllAccounts();
    instance.setActiveAccount(accounts[0]);

    instance
      .acquireTokenSilent(request)
      .then((tokenResponse) => {
        console.log("token");
        console.log(tokenResponse);
      })
      .catch(async (error) => {
        console.log(error);
        if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          return instance.acquireTokenRedirect(request);
        }
      });
  };

  return (
    <>
      <UnauthenticatedTemplate>
        <button onClick={handleLogin}>Sign in</button>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        User is logged in
        <div>
          <button onClick={acquireAccessToken}>Acquire access/</button>
        </div>
      </AuthenticatedTemplate>
    </>
  );
};

export default App;
