import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { saveAllProductsAction } from "../store/ProductSlice";
import CardComponent from "../components/CardComponent";

//icons
import { CiGrid31 } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";


function HomePage() {

    const [isGrid, setIsGrid] = useState('gridView');
    const [limitProducts, setLimitProducts] = useState(10);


    const dispatch = useDispatch();

    const {allProducts, isLoading, selectCategory, searchProduct} = useSelector((state)=> state.productStore);


    useEffect(()=>{
        if(searchProduct){
            ProductService.getSearchProductsService(searchProduct)
        .then((res) => { dispatch(saveAllProductsAction(res.data.products))}).catch(err => console.log(err))

        }
             }, [searchProduct])

    useEffect(()=>{ 

        if(selectCategory){
            ProductService.getAlllPriductsByCategoryService(selectCategory)
        .then((res) => {
            dispatch(saveAllProductsAction(res.data.products))
        })
        .catch(err => console.log(err))
        }else{
            ProductService.getAllProductsService(limitProducts)
            .then((res) => {
                dispatch(saveAllProductsAction(res.data.products))
            })
            .catch(err => console.log(err))
        }

        
    },[selectCategory, limitProducts])

   

 

    return (
        <div className="container mx-auto">
            <div className="flex items-center gap-[20px] py-[20px] justify-end">
                <CiBoxList size={28} onClick={() => setIsGrid('listView')} className={
                isGrid === 'listView' ? 'bg-mainYellow p-[2px] rounded-lg' : '' } ></CiBoxList>
                <CiGrid31 size={28} onClick={() => setIsGrid('gridView')} className={
                isGrid === 'gridView' ? 'bg-mainYellow p-[2px] rounded-lg' : '' }></CiGrid31>
            </div>
            {isLoading ? 
            <div className={isGrid === 'gridView' ? 'flex flex-wrap items-center justify-center gap-[10px] py-[50px]' : 'flex flex-col items-center justify-center gap-[10px]'}>
                {allProducts.map((product)=> {
                    return (
                        <CardComponent key={product.id} product={product} isGrid={isGrid}  setIsGrid={setIsGrid}/>
                    )
                })}
            </div> : <div>Loading...</div>}

            <div className="flex items-center justify-center py-[50px]">
            
            {!selectCategory && <button className="bg-mainBlue text-textWhite py-[8px] px-[16px] my-[20px] rounded-lg hover:bg-mainYellow transition-all duration-300 "
            onClick={() => setLimitProducts(limitProducts + 10)}>View more products</button>
}
            
            
            </div>
        </div>
        
    )
}



export default HomePage;