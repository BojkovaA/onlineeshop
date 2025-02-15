import { useEffect } from "react";
import ProductService from "../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { saveAllProductsAction } from "../store/ProductSlice";
import CardComponent from "../components/CardComponent";

function HomePage() {


    const dispatch = useDispatch();

    const {allProducts, isLoading} = useSelector((state)=> state.productStore);

    useEffect(()=>{
        ProductService.getAllProductsService()
        .then((res) => {
            dispatch(saveAllProductsAction(res.data.products))
        })
        .catch(err => console.log(err))
    },[])

    return (
        <div className="container mx-auto">
            <div>List/ Grid View</div>
            {isLoading ? 
            <div className="flex flex-wrap items-center justify-center gap-[10px]">
                {allProducts.map((product)=> {
                    return (
                        <CardComponent key={product.id} product={product}/>
                    )
                })}
            </div> : <div>Loading...</div>}
        </div>
    )
}   

export default HomePage;