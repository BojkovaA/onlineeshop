import axios from 'axios';

class ProductService {
    static getAllProductsService = () => axios.get('/products?limit=30&skip=70');
    static getSingleProductService = (id) => axios.get(`/products/${id}`)
}

export default ProductService;