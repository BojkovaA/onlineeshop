import { useParams } from "react-router-dom";
import { useEffect, useState  } from "react";
import ProductService from "../services/ProductService";
import { Rating } from "@mui/material";

//icons
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";



function SingleProductPage(){

    const [singleProdcut, setSingleProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [currentImg, setCurrentImg] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const {id} = useParams();
    console.log(id);

    useEffect(()=>{
        ProductService.getSingleProductService(id).
        then((res)=>{console.log(res.data)
            setSingleProduct(res.data)
            setIsLoading(true)
        }).catch((err)=>console.log(err))
    },[])


    function handleImageClick(index){
        setCurrentImg(index)
    }

    return( 
        <div className="py-[20px]">
            {isLoading? <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-[40px] lg:gap[20px]">
                {/*Left Side*/}
                <div className="w-full lg:w-[50%] flex flex-col items-center">
                    <img src={singleProdcut.images[currentImg]} className="max-h-[400px] "/>
                    <div className="flex items-center justify-between gap-[20px] w-[50%] mx-auto">
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
                        <button className="bg-mainYellow text-textWhite py-[12px] px-[16px] rounded-lg">Add to Cart</button>
                        <div className="bg-[#EEE] p-[10px] rounded-full">
                            <FaRegHeart size={30} />
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