import { camelCase } from "lodash";

const ACCESS_TOKEN_LS_KEY = "accessToken";

const updateLsAccessToken = (tokenData) => {
  localStorage.setItem(ACCESS_TOKEN_LS_KEY, JSON.stringify(tokenData));
};

const objectKeysToCamelCase = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [camelCase(k), v])
  );
};

/**
 * Initialize the freesound client with default token auth.
 * These keys have less priviledge than the access token.
 */
export const init = (freeSound) => {
  const token = "scxd6vqqUvfCieE3mGnrZbdBFRQc0DB4M7C5Jrbp";

  // Token login
  freeSound.setToken(token);

  // @TODO: Extract this to a build-time step
  const clientId =
    process.env.NODE_ENV === "production"
      ? "K6AocfvMZmY2hWUA35dg"
      : "DTxOWhQnrVNrKqmllJJ9";
  // @TODO: Extract this to a build-time step
  const clientSecret =
    process.env.NODE_ENV === "production"
      ? "scxd6vqqUvfCieE3mGnrZbdBFRQc0DB4M7C5Jrbp"
      : "Sxqu9nDcI3BaBPgVIN2Mh1dmBeVXbDmqQEp34dP6";

  // Set your application's client_id and client_secret
  freeSound.setClientSecrets(clientId, clientSecret);
};

const accessTokenSuccessHandler = (freeSound, rawAccessTokenData, cb) => {
  const accessTokenData = objectKeysToCamelCase(rawAccessTokenData);
  updateLsAccessToken(accessTokenData);
  freeSound.setToken(accessTokenData.accessToken, "oauth");
  if (cb) cb(accessTokenData);
};

const auth = async (freeSound, tokenSuccessCb, tokenFailureCb) => {
  const lsAccessToken = localStorage.getItem(ACCESS_TOKEN_LS_KEY);

  if (lsAccessToken) {
    let lsAccessTokenData = JSON.parse(lsAccessToken);
    const { expiresAt } = lsAccessTokenData;
    // Check if the token is expired
    if (Date.now() > expiresAt) {
      // Get a new acccess token using the refresh token
      const response = objectKeysToCamelCase(
        await freeSound.postAccessCode(lsAccessToken.refreshToken, "refresh")
      );
      lsAccessTokenData = {
        ...response,
        expiresIn: Date.now() + response.expiresIn,
      };
    }
    accessTokenSuccessHandler(freeSound, lsAccessTokenData, tokenSuccessCb);
  } else {
    // After the user logs in on freesound's end, they'll be sent back to us
    // with a `code` param. Here, we try to read the code param
    const params = new URLSearchParams(window.location.search);
    if (params.has("code")) {
      const authToken = params.get("code");
      try {
        const response = objectKeysToCamelCase(
          await freeSound.postAccessCode(authToken)
        );
        const accessTokenData = {
          ...response,
          expiresIn: Date.now() + response.expiresIn,
        };
        accessTokenSuccessHandler(freeSound, accessTokenData, tokenSuccessCb);
      } catch (e) {
        tokenFailureCb();
      }
    } else if (tokenFailureCb) tokenFailureCb();
  }
};

export default auth;
