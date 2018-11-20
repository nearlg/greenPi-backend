import * as restify from 'restify';
import * as controller from '../controllers/user';

export function routes(server: restify.Server, mainPath: string = ''): void{
    // User profile
    server.post(mainPath + '/profile/sign-in/local', controller.signInLocal);
    server.post(mainPath + '/profile/sign-in/google', controller.signInGoogle);
    server.post(mainPath + '/profile', controller.signUp);
    server.get(mainPath + '/profile', controller.getProfile);
    server.patch(mainPath + '/profile', controller.editProfile);

    // For the Admins
    server.post(mainPath, controller.addUser);
    server.patch(mainPath + '/:email', controller.updateUser);
    server.del(mainPath + '/:email', controller.deleteUser);
    server.get(mainPath, controller.fetchUsers);
    server.get(mainPath + '/:email', controller.getUser);
}
