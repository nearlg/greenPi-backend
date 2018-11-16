import * as restify from "restify";
import * as Controller from "../controllers/user";

export function routes(server: restify.Server, mainPath: string = ''): void{

    // User profile

    server.post(mainPath + '/profile/sign-in', Controller.signIn);
    server.post(mainPath + '/profile', Controller.signUp);
    server.get(mainPath + '/profile', Controller.getProfile);
    server.patch(mainPath + '/profile', Controller.editProfile);

    // For the Admins

    server.post(mainPath, Controller.addUser);
    // server.patch(mainPath, Controller.updateUser);
    server.patch(mainPath + '/:email', Controller.updateUserByEmail);
    // server.del(mainPath, Controller.deleteUser);
    server.del(mainPath + '/:email', Controller.deleteUserByEmail);
    server.get(mainPath, Controller.fetchUsers);
    server.get(mainPath + '/:email', Controller.getUserByEmail);
}
