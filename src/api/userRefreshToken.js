import axios from "./axios";

const keycloakTokenUrl = "http://localhost:8080/realms/ecommerce-qa/protocol/openid-connect/token";
const clientId = "frontend_keycloak";

const useRefreshToken = () => {
  const refresh = async () => {
    const prevRefresh = localStorage.getItem("refresh");

    const requestData = new URLSearchParams();
    requestData.append("grant_type", "refresh_token");
    requestData.append("refresh_token", prevRefresh);
    requestData.append("client_id", clientId);

    const response = await axios.post(keycloakTokenUrl, requestData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token: newAccessToken } = response.data;

    localStorage.setItem("access", newAccessToken);

    return response.data;
  };

  return refresh;
};

export default useRefreshToken;
