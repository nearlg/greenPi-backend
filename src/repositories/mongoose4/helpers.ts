function toObjectDocument(document: any) {
  return document.toObject();
}

function normalizeDocuments(documents: any[]): any[] {
  return documents.map(normalizeFieldNames);
}

function normalizeDocument(document: any): any {
  if (typeof document !== "object") {
    return document;
  }
  // Normalize fields
  if (document._id) {
    document.id = document._id;
    delete document._id;
  }
  // Check all the fields
  for (let field in document) {
    normalizeFieldNames(document[field]);
  }
  return document;
}

function toObject(documents: any) {
  return Array.isArray(documents)
    ? documents.map(toObjectDocument)
    : toObjectDocument(documents);
}

function normalizeFieldNames(document: any): any {
  return Array.isArray(document)
    ? normalizeDocuments(document)
    : normalizeDocument(document);
}

export function normalizeData(data: any): any {
  data = toObject(data);
  return normalizeFieldNames(data);
}

export function rejectIfNull(errorMsg: string) {
  return function(document: any) {
    if (!document) {
      let err: Error = new Error(errorMsg);
      err.name = "DataNotFoundError";
      throw err;
    } else {
      return document;
    }
  };
}

export function getSearchingObject(gte?: Date, lte?: Date): Object {
  const searchingObject = {};
  if (gte || lte) {
    searchingObject["date"] = {};
    if (gte) {
      searchingObject["date"]["$gte"] = gte;
    }
    if (lte) {
      searchingObject["date"]["$lte"] = lte;
    }
  }
  return searchingObject;
}
