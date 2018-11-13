import { IRepository } from "./repository";
import { IPump } from "../../../interface/pump";

export interface IPumpRepository extends IRepository<IPump> {
    findById(id: string): Promise<IPump | null>;
    removeById(id: string): Promise<void>;
    updateById(id: string, document: IPump): Promise<IPump>;
}
