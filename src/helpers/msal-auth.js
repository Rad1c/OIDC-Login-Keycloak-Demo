import * as msal from "@azure/msal-browser";

export const MsalInstance = new msal.PublicClientApplication({
  auth: {
    protocolMode: msal.ProtocolMode.OIDC,
    authorityMetadata: JSON.stringify({
      authorization_endpoint:
        "https://localhost:8443/realms/ecommerce-qa/protocol/openid-connect/auth",
      token_endpoint: "https://localhost:8443/realms/ecommerce-qa/protocol/openid-connect/token",
      issuer: "https://localhost:8443/realms/ecommerce-qa",
      userinfo_endpoint:
        "https://localhost:8443/realms/ecommerce-qa/protocol/openid-connect/userInfo",
    }),
    authority: "https://localhost:8443/realms/ecommerce-qa",
    clientId: "frontend_keycloak",
    knownAuthorities: ["https://localhost:8443/realms/ecommerce-qa"],
  },
  cache: {
    cacheLocation: "localStorage",
  },
});
