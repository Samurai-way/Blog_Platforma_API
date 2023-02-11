export type Pagination = {
    pageNumber: number
    pageSize: number,
    sortBy: string,
    sortDirection: string,
}
export const getPostsPagination = (query: any): Pagination => {
    //validation logic for fields
    return {
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        sortBy: query.sortBy,
        sortDirection: query.sortDirection
    }
}

export const paginator = (pageNumber: number, pageSize: number, totalCount: number, items: any) => {
    const pagesCount = Math.ceil(totalCount / pageSize)
    return {
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount: totalCount,
        items
    }
}