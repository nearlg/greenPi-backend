import { IEnvironment } from "../models/interface/environment";
import { environmentRepository } from "../models/database/repository/implementation/mongoose4/environment-repository"

export function addEnvironment(environment: IEnvironment): Promise<IEnvironment> {
    return environmentRepository.create(environment);
}

export function updateEnvironment(environment: IEnvironment): Promise<IEnvironment> {
    return environmentRepository.update(environment);
}

export function updateEnvironmentById(id: string, environment: IEnvironment): Promise<IEnvironment> {
    return environmentRepository.updateById(id, environment);
}

export function deleteEnvironment(environment: IEnvironment): Promise<void> {
    return environmentRepository.remove(environment);
}

export function deleteEnvironmentById(id: string): Promise<void> {
    return environmentRepository.removeById(id);
}

export function fetchEnvironments(): Promise<IEnvironment[]> {
    return environmentRepository.findAll();
}

export function getEnvironmentById(id: string): Promise<IEnvironment> {
    return environmentRepository.findById(id);
}