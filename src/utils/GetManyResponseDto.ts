export default class GetManyResponseDto<T> {
    page: number;
    perPage: number;
    nextPage?: number;
    prevPage?: number;
    data: Array<T>;
}