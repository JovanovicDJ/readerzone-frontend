export interface PaginationQuery {
    pageNumber: number,
    pageSize: number,
    searchKeyword: string,
    selectedGenres: Array<string>,
    minPrice: number,
    maxPrice: number
}