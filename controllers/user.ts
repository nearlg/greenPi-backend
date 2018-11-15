import bcrypt = require('bcrypt');
import { IUser } from "../models/interface/user";
import { userRepository } from "../models/database/repository/implementation/mongoose4/user-repository";
import { createToken } from "../services/jwt-service";

export function addUser(user: IUser): Promise<IUser> {
    return userRepository.create(user);
}

export function updateUser(user: IUser): Promise<IUser> {
    return userRepository.update(user);
}

export function updateUserByEmail(email: string, user: IUser): Promise<IUser> {
    return userRepository.updateByEmail(email, user);
}

export function deleteUser(user: IUser): Promise<void> {
    return userRepository.remove(user);
}

export function deleteUserByEmail(email: string): Promise<void> {
    return userRepository.removeByEmail(email);
}

export function fetchUsers(): Promise<IUser[]> {
    return userRepository.findAll();
}

export function getUserByEmail(email: string): Promise<IUser> {
    return userRepository.findByEmail(email);
}

export function signIn(userEmail: string, password: string): Promise<string> {
    return userRepository.findByEmail(userEmail)
    .then(user => {
        return bcrypt.compare(password, user.password)
        .then(passwdIsCorrect => {
            if (passwdIsCorrect) {
                const token = createToken(user);
                return Promise.resolve(token);
            }
            return Promise.reject();
        })
    })
    // With this, the real error is hidden and
    // is more complex to know if the user does not exist
    // or the password was wrong
    .catch(error => {
        const err = new Error();
        err.name = 'InvalidCredentialsError';
        return Promise.reject(err);
    });
}
