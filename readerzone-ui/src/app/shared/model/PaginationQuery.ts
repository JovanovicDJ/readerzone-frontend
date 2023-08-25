export interface PaginationQuery {
    PageNumber: number,
    PageSize: number,
    SearchKeyword: string,
    SelectedGenres: Array<string>,
    MinPrice: number,
    MaxPrice: number
}