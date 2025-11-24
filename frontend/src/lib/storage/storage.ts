import { type Descendant } from "slate";

const STORAGE_KEYS = {
    DOCUMENT: 'google-doc-clone-document',
    DOCUMENT_TITLE: 'google-docs-clone-title',
    LAST_SAVED: 'google-dcos-clone-last-saved'
};

export const saveDocumemt = (content: Descendant[], title: string) : void => {
    try {
        const contentString = JSON.stringify(content);

        localStorage.setItem(STORAGE_KEYS.DOCUMENT, contentString);
        localStorage.setItem(STORAGE_KEYS.DOCUMENT_TITLE, title);
        localStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());

        console.log('Document saved Successfully');
    } catch (error) {
        console.log("Error saving document: ", error);
    }
}

export const loadDocument = () : Descendant[] | null => {
    try {
        const documentString = localStorage.getItem(STORAGE_KEYS.DOCUMENT);
        
        if(!documentString) {
            console.log('No saved document found');
            return null;
        }

        // parse JSON back to object
        const content = JSON.parse(documentString) as Descendant [];

        console.log('Document laoded successfully');
        return content;

    } catch (error) {
        console.log('Error loading document: ', error);
        return null;
    }
}

export const loadTitle = () : string => {
    try {
        const title = localStorage.getItem(STORAGE_KEYS.DOCUMENT_TITLE);

        return title || 'Untitled Document';

    } catch (error) {
        console.error('Error loading title: ', error);
        return 'Untitled  Document';
    }
}

export const loadLastSaved = () : Date | null => {
    try {
        const timeString = localStorage.getItem(STORAGE_KEYS.LAST_SAVED);

        if(!timeString) {
            return null;
        }

        return new Date(timeString);
    } catch (error) {
        console.log('Error getting last saved time: ', error);
        return null;
    }
}

// Clear all data
export const clearDocument = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEYS.DOCUMENT);
        localStorage.removeItem(STORAGE_KEYS.DOCUMENT_TITLE);
        localStorage.removeItem(STORAGE_KEYS.LAST_SAVED);
        console.log("Document cleared");
    } catch (error) {
        console.log("Error clearing document: ", error);
    }
}