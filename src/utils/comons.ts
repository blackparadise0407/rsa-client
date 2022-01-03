import { IMAGE_MIME_TYPES } from 'app-constants/mimeType';

export const validateImageMimeType = (mime: string) => {
    return IMAGE_MIME_TYPES.includes(mime);
};

export const getFileNameFromPath = (path: string) => {
    return path.substring(path.lastIndexOf('/') + 1);
};
