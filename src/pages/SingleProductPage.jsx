import { Link, useParams } from "react-router-dom";
import { useEffect, useState  } from "react";
import { useSelector } from "react-redux";
import ProductService from "../services/ProductService";
import { Rating } from "@mui/material";
import { saveInCartAction } from "../store/CartSlice";
//icons
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { updateFavoriteAction } from "../store/FavoriteSlice";



function SingleProductPage(){

    const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);
    const [singleProdcut, setSingleProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [currentImg, setCurrentImg] = useState(0);
    const [quantity, setQuantity] = useState(1);


    const {allFavorite} = useSelector((state)=>state.favoriteStore)

    const {id} = useParams();
    console.log(id);

    //dispatch for redux
    const dispatch = useDispatch();

    useEffect(()=>{
        ProductService.getSingleProductService(id).
        then((res)=>{console.log(res.data)
            setSingleProduct(res.data)
            setIsLoading(true)
        }).catch((err)=>console.log(err))
    },[])

    useEffect(()=>{
        if(allFavorite.length === 0){
        allFavorite.find((item)=>{
            if(item.id === singleProdcut.id){
                setFavoriteIdIcon(item.id)  
                return
            }
        }
        )}else{
            setFavoriteIdIcon(null);
        }
    }, [allFavorite])


    function handleImageClick(index){
        setCurrentImg(index)
    }


    //Function toput product to cart
    function handleProductCart(){
        dispatch(saveInCartAction(singleProdcut))
    }

    return( 
        <div className="py-[20px]">
            {isLoading? <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-[40px] lg:gap[20px]">
                {/*Left Side*/}
                <div className="w-full lg:w-[50%] flex flex-col items-center">
                    <img src={singleProdcut.images[currentImg]} className="max-h-[400px] "/>
                    <div className="flex items-center justify-center gap-[20px]  mx-auto flex-wrap">
                        {singleProdcut.images.map((el, index)=>{
                            return <img src={el} alt="" key={index} 
                            className={
                                
                                    index === currentImg ? "w-[100px] h-[100px] border border-mainBlue p-[10px] rounded-lg" :
                                    "index === currentImg ? w-[100px] h-[100px] border border-grayColor p-[10px] rounded-lg"
                            }
                             onClick={() => handleImageClick(index)}/>
                        })}
                    </div>
                </div> 
                {/*Right Side */}
                <div className="w-full lg:w-[50%] flex flex-col gap-[10px] ml-[10px] ">
                    <h2 className="text-mainBlue text-[36px]">{singleProdcut.title}</h2>
                    <h5 className="font-semibold text-[20px]">${singleProdcut.price}</h5>
                    <Rating value={singleProdcut.rating} readOnly size="large" />
                    <div className="flex items-center gap-[10px]">
                        <span className="text-gray-500">Availability: </span>
                        {singleProdcut.stock > 0? <h3 className="flex items-center text-[#30BD57] gap-[5px]"><FaCheck size={24}/> In Stock</h3> : <h3 className="flex items-center text-[#FF0000] gap-[5px] font-semibold"> <RxCross2 size={34}/> Out of Stock</h3>}
                    </div>
                    <p className="text-grayColor">Hurry up! only <span className="font-extrabold text-mainBlue">{singleProdcut.stock}</span> product left in stock!</p>
                    <div className="flex items-center gap-[20px]">
                        <p className="text-gray-500">Tags: </p>
                        <ul className="flex items-center gap-[10px]">
                            {singleProdcut.tags.map((tag, index)=>{
                                return <li key={index} className="bg-lightGray px-[8px] py-[4px] rounded-lg text-gray-500 cursor-pointer ">#{tag}</li>
                            })}
                        </ul>
                    </div>
                    <div className="flex items-center gap-[20px] ">
                        <p className="text-gray-500">Quantity: </p>
                        <div className="flex items-center">
                            <button className="bg-lightGray  px-[10px] py-[4px] border border-gray-500">-</button>
                            <span className="bg-lightGray  px-[20px] py-[4px] border border-gray-500">{quantity}</span>
                            <button className="bg-lightGray  px-[10px] py-[4px] border border-gray-500">+</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-[10px] mt-[30px]">
                        <Link to={'/cart'} className="bg-mainYellow text-textWhite py-[12px] px-[16px] rounded-lg"
                        onClick={handleProductCart}>Add to Cart</Link>
                        <div className="bg-[#EEE] p-[10px] rounded-full">
                            {favoriteIdIcon === parseInt(id) ?
                                <FaRegHeart style={{color: 'red'}} color='red' size={30} onClick={()=> dispatch(updateFavoriteAction(singleProdcut))} /> :                                
                                <FaRegHeart size={30} onClick={()=> dispatch(updateFavoriteAction(singleProdcut))} />
}
                        </div>
                    </div> 
                    <hr className="my-[20px]"></hr>
                    <div className="flex imtes-center gap-[20px]">
                        <FaTruckFast size={36}/>
                        <span className="text-grayColor">{singleProdcut.shippingInformation}</span>
                    </div>
                    <p className="font-semibold text-gray-500">{singleProdcut.returnPolicy}</p>
                </div>

            </div> : <div>Loading...</div>}
        </div>
    )
}

export default SingleProductPage;