import { GOOGLE_CLIENT_ID } from "../config/google";

const { OAuth2Client } = require('google-auth-library');

function getAuthUrl(): Promise<string> {
    const client_secret = 'e7rga-cS8pEinwwfKBuRQ-Xs';
    const client_id = '817996159467-7ksp8d30a8ot7s4v97kle9nh3rikrlgu.apps.googleusercontent.com';
    const redirect_uris = ['http://localhost:8000/sign-in/google'];

    const oAuth2Client = new OAuth2Client(
        client_id, client_secret, redirect_uris[0]);

    const authUrl: string = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
    });
    return Promise.resolve(authUrl);
}

function getIdToken(code: string): Promise<string> {
    const client_secret = 'e7rga-cS8pEinwwfKBuRQ-Xs';
    const client_id = '817996159467-7ksp8d30a8ot7s4v97kle9nh3rikrlgu.apps.googleusercontent.com';
    const redirect_uris = ['http://localhost:8000/sign-in/google'];

    const oAuth2Client = new OAuth2Client(
        client_id, client_secret, redirect_uris[0]);
    return oAuth2Client.getToken(code)
    .then(res => res.tokens.id_token);
}

/**
 * Return the payload of the token
 * The payload contains, the userId, in payload.sub
 * @param idToken
 */
function verify(idToken: string): Promise<any> {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    return client.verifyIdToken({
        idToken: idToken,
        // Specify the CLIENT_ID of the app that accesses the backend
        audience: GOOGLE_CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    }).then(ticket => ticket.getPayload());
}

export {
    verify,
    getAuthUrl,
    getIdToken
};
