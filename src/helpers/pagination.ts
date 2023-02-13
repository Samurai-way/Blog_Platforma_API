import {PostsType} from "../db/db";

export type Pagination = {
    searchNameTerm?: string
    searchEmailTerm?: string,
    searchLoginTerm?: string
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: string
}
export const getPagination = (query: any): Pagination => {
    //validation logic for fields
    return {
        searchLoginTerm: query.searchLoginTerm,
        searchEmailTerm: query.searchEmailTerm,
        pageNumber: query.pageNumber,
        searchNameTerm: query.searchNameTerm,
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