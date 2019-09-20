import * as GoogleConfig from "../config/google";

const { OAuth2Client } = require('google-auth-library');

const clientSecret = GoogleConfig.GOOGLE_CLIENT_SECRET;
const clientId = GoogleConfig.GOOGLE_CLIENT_ID;
const redirectUris = [GoogleConfig.GOOGLE_REDIR_URL];

function getAuthUrl(): Promise<string> {
    const oAuth2Client = new OAuth2Client(
        clientId, clientSecret, redirectUris[0]);

    const authUrl: string = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
    });
    return Promise.resolve(authUrl);
}

function getIdToken(code: string): Promise<string> {
    const oAuth2Client = new OAuth2Client(
        clientId, clientSecret, redirectUris[0]);
    return oAuth2Client.getToken(code)
    .then(res => res.tokens.id_token);
}

/**
 * Return the payload of the token
 * The payload contains, the userId, in payload.sub
 * @param idToken
 */
function verify(idToken: string): Promise<any> {
    const client = new OAuth2Client(clientId);
    return client.verifyIdToken({
        idToken: idToken,
        // Specify the CLIENT_ID of the app that accesses the backend
        audience: clientId,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    }).then(ticket => ticket.getPayload());
}

export {
    verify,
    getAuthUrl,
    getIdToken
};
