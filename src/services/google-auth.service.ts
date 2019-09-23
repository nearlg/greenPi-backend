import * as GoogleConfig from "../config/google";

const { OAuth2Client } = require("google-auth-library");

const clientSecret = GoogleConfig.GOOGLE_CLIENT_SECRET;
const clientId = GoogleConfig.GOOGLE_CLIENT_ID;
const redirectUris = [GoogleConfig.GOOGLE_REDIR_URL];

async function getAuthUrl() {
  const oAuth2Client = new OAuth2Client(
    clientId,
    clientSecret,
    redirectUris[0]
  );

  const authUrl: string = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"]
  });
  return authUrl;
}

async function getIdToken(code: string) {
  const oAuth2Client = new OAuth2Client(
    clientId,
    clientSecret,
    redirectUris[0]
  );
  const res = await oAuth2Client.getToken(code);
  const idToken: string = res.tokens.id_token;
  return idToken;
}

/**
 * Return the payload of the token
 * The payload contains, the userId, in payload.sub
 * @param idToken
 */
async function verify(idToken: string) {
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    // Specify the CLIENT_ID of the app that accesses the backend
    audience: clientId
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const ticketPayload = ticket.getPayload();
  return ticketPayload;
}

export { verify, getAuthUrl, getIdToken };
