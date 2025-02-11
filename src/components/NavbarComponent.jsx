
//images
import logo from "../assets/logo.png"

//icons
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";

function NavbarComponent() {
    return (
        <div className="bg-mainBlue h-full lg:h-[100px] flex items-center py-[10px] " >
            <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row gap-[10px]">
                <img src={logo} alt="logo-image" />

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
                        <span className="text-textWhite text-[18px]">Login</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                        <CiHeart size={24} color="white"/>
                        <span className="bg-mainYellow rounded-full text-textWhite w-[20px] h-[20px] flex items-center justify-center">0</span>
                        <span className="text-textWhite text-[18px]">Favorite</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                        <CiShoppingCart size={24} color="white"/>
                        <span className="bg-mainYellow rounded-full text-textWhite w-[20px] h-[20px] flex items-center justify-center">0</span>
                        <span className="text-textWhite text-[18px]">Cart</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent;