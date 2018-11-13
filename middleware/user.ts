import { IUser } from "../models/interface/user";
import { userRepository } from "../models/database/repository/implementation/mongoose4/user-repository";

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
