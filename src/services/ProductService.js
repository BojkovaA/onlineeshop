import axios from 'axios';

class ProductService {
    static getAllProductsService = (limit) => axios.get(`/products?limit=${limit}&skip=70`);
    static getSingleProductService = (id) => axios.get(`/products/${id}`);
    static getAlllPriductsByCategoryService = (category) => axios.get(`/products/category/${category}`);
    static getSearchProductsService = (search) => axios.get(`/products/search?q=${search}`);
}

export default ProductService;