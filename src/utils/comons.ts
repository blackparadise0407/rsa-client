import { IMAGE_MIME_TYPES } from 'app-constants/mimeType';

export const validateImageMimeType = (mime: string) => {
    return IMAGE_MIME_TYPES.includes(mime);
};

export const getFileNameFromPath = (path: string) => {
    return path?.substring(path.lastIndexOf('/') + 1);
};

export const getImageExtension = (path: string) => {
    const fileName = getFileNameFromPath(path);
    const ext = fileName?.substring(fileName.lastIndexOf('.') + 1);
    if (IMAGE_MIME_TYPES.some((x) => x.includes(ext))) return ext;
    else return 'jpeg';
};

export const getImageSrcFromBase64 = (input: string, path?: string) => {
    return `data:image/${getImageExtension(
        path,
    )};charset=utf-8;base64, ${input}`;
};
