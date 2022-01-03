import request from './request';

const PATH = '/image';

export interface IImageResponse extends IImage {}

export interface IUploadRequest {
    file: File;
}

export function getCurrentUserImages() {
    return request<IImageResponse[]>('GET', PATH + '/mine');
}

export function uploadImage(body: IUploadRequest) {
    const formData = new FormData();
    formData.append('file', body.file);
    return request<IImageResponse>('POST', PATH, formData);
}

export function deleteImages(ids: Array<string>) {
    return request<string>('DELETE', PATH, ids);
}
