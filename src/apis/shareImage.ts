import request from './request';

const PATH = '/shared-image';

export interface CreateShareImageDto {
    image_id: string;
    shared_to_id: string;
}

export function shareImageToUserId(data: CreateShareImageDto) {
    return request<string>('POST', PATH, data);
}
