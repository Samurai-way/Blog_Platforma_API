import {PaginationItemsType, PostsType} from "../db/db";


export const pagination = (pageNumber: number, pageSize: number, itemsCount: number, items: any) => {
    const pagesCount = Math.ceil(itemsCount/pageSize)
    return{
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount: itemsCount,
        items
    }
}