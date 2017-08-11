export function rejectIfNull(errorMsg: string) {
    return function (document: any) {
        if (!document) {
            let err: Error = new Error(errorMsg);
            err.name = 'DataNotFoundError';
            throw err;
        } else {
            return document;
        }
    };
}

export function toObjectAll(documents: any[]) {
    return documents.map(toObject);
}

export function toObject(document: any) {
    return document.toObject();
}

export function renameIdAll(documents: any[]) {
    return documents.map(renameId);
}

export function renameId(document: any) {
    document.id = document._id;
    delete document._id;
    return document;
}