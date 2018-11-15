import { IPump } from "../models/interface/pump";
import { pumpRepository } from "../models/database/repository/implementation/mongoose4/pump-repository"

export function addPump(pump: IPump): Promise<IPump> {
    return pumpRepository.create(pump);
}

export function updatePump(pump: IPump): Promise<IPump> {
    return pumpRepository.update(pump);
}

export function updatePumpById(id: string, pump: IPump): Promise<IPump> {
    return pumpRepository.updateById(id, pump);
}

export function deletePump(pump: IPump): Promise<void> {
    return pumpRepository.remove(pump);
}

export function deletePumpById(id: string): Promise<void> {
    return pumpRepository.removeById(id);
}

export function fetchPumps(): Promise<IPump[]> {
    return pumpRepository.findAll();
}

export function getPumpById(id: string): Promise<IPump> {
    return pumpRepository.findById(id);
}