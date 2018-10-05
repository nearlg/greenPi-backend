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

export function toObject(documents: any) {
    return Array.isArray(documents) ?
        documents.map(toObjectDocument) :
        toObjectDocument(documents);
}

function toObjectDocument(document: any) {
    return document.toObject();
}

export function normalizeFiledNames(document: any): any {
    return Array.isArray(document) ?
        normalizeDocuments(document) :
        normalizeDocument(document);
}

function normalizeDocuments(documents: any[]): any[] {
    return documents.map(normalizeFiledNames);
}

function normalizeDocument(document: any): any {
    if (typeof document !== 'object') {
        return document;
    }
    // Normalize fields
    if (document._id) {
        document.id = document._id;
        delete document._id;
    }
    // Check all the fields
    for (let field in document) {
        normalizeFiledNames(document[field]);
    }
    return document;
}

export function getSearchingObject(gte?: Date, lte?: Date): Object {
    const searchingObject = {};
    if (gte || lte) {
        searchingObject['date'] = {};
        if (gte) {
            searchingObject['date']['$gte'] = gte;
        }
        if (lte) {
            searchingObject['date']['$lte'] = lte;
        }
    }
    return searchingObject;
}
