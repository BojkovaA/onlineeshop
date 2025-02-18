
//images
import logo from "../assets/logo.png"

//icons
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";

//clerk
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";



function NavbarComponent() {

    const {totalProduct} = useSelector(state=> state.cartStore);
    const [totalProductLs, setTotalProductLs] = useState();

    const {favoriteTotal} = useSelector(state=> state.favoriteStore);

    //let totalProduct = JSON.parse(localStorage.getItem('cart_total'));

    useEffect(()=>{
        let lsTotal =JSON.parse(localStorage.getItem('cart_total'));
        if(lsTotal){
            setTotalProductLs(lsTotal);
        }else{
            setTotalProductLs(0);
        }
    },[totalProduct])


    return (
        <div className="bg-mainBlue h-full lg:h-[100px] flex items-center py-[10px] " >
            <div className="container mx-auto max-w-7xl flex justify-between items-center flex-col lg:flex-row gap-[10px]">
                <Link to="/">
                <img src={logo} alt="logo-image" />
                </Link>

                {/*search bar*/}
                <div className="bg-textWhite rounded-[20px]">
                    <input type="text" placeholder="Search.." 
                    className="bg-transparent outline-none px-[30px] py-[15px] rounded-[20px] placeholder:text-mainYellow text-mainBlue"/>
                    <button className="bg-mainYellow px-[30px] py-[15px] rounded-[20px] text-textWhite">Search</button>
                </div>

                {/*loginSystem and Cart/Favorites*/}    
                <div className="flex items-center gap-[10px]">
                    <div className="flex items-center gap-[5px]">
                        <CiUser size={24} color="white"/>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton showName/>
                        </SignedIn>
                    </div>
                    <div className="flex items-center gap-[5px]">
                        <CiHeart size={24} color="white"/>
                        <span className="bg-mainYellow rounded-full text-textWhite w-[20px] h-[20px] flex items-center justify-center">{favoriteTotal}</span>
                        <Link to={"/favorite"} className="text-textWhite text-[18px]" >Favorite</Link>
                    </div>
                    <div className="flex items-center gap-[5px]">
                        <CiShoppingCart size={24} color="white"/>
                        <span className="bg-mainYellow rounded-full text-textWhite w-[20px] h-[20px] flex items-center justify-center">{totalProductLs}</span>
                        <Link to="/cart" className="text-textWhite text-[18px]">Cart</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent;