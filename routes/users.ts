import * as restify from 'restify';
import * as controller from '../controllers/user';
import * as gController from '../controllers/google';

export function routes(server: restify.Server, mainPath: string = '') {
    // User profile
    server.post(mainPath + '/profile/sign-in/local', controller.signInLocal);
    server.post(mainPath + '/profile/sign-in/google', gController.signInGoogle);
    server.post(mainPath + '/profile', controller.signUp);
    server.get(mainPath + '/profile', controller.getProfile);
    server.patch(mainPath + '/profile', controller.editProfile);

    // For the Admins
    server.post(mainPath, controller.addUser);
    server.patch(mainPath + '/:id', controller.updateUser);
    server.del(mainPath + '/:id', controller.deleteUser);
    server.get(mainPath, controller.fetchUsers);
    server.get(mainPath + '/:id', controller.getUser);
}
