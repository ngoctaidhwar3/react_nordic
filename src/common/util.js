import { BASE_API } from "./constants"

export const makeCateApi = (cateSlug, page =1) => {
    return BASE_API + '/cat/' + cateSlug+`?p=${page}`;
}

export const makeSearchApi = (query, page = 1) => {
    return BASE_API + `/search?q=${query}&p=${page}`;
}

export const makeProductDetailApi = (productId) => {
    return BASE_API + '/detail/' + productId;
}
