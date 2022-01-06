import request from './request';

const PATH = '/image';

export interface IImageResponse extends IImage {}

export interface IUploadRequest {
    files?: CustomFile[];
    file?: File;
}

export function getCurrentUserImages() {
    return request<IImageResponse[]>('GET', PATH + '/mine');
}

export function uploadSingleImage(body: IUploadRequest) {
    const formData = new FormData();
    formData.append('file', body.file);
    return request<IImageResponse>('POST', PATH, formData);
}

export function uploadMultipleImages(body: IUploadRequest) {
    const formData = new FormData();
    body.files.forEach((x) => formData.append('files', x));
    return request<string>('POST', PATH + '/multiple', formData);
}

export function deleteImages(ids: Array<string>) {
    return request<string>('DELETE', PATH, ids);
}
