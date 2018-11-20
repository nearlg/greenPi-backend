import { GOOGLE_CLIENT_ID } from "../config/google";

const { OAuth2Client } = require('google-auth-library');

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
    verify
};
