import { IRepository } from "./repository";
import { IPump } from "../../../interface/pump";

export interface IPumpRepository extends IRepository<IPump> {
    find(id: string): Promise<IPump>;
    remove(id: string): Promise<IPump>;
}
