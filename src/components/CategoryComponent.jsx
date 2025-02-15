import { useEffect, useState } from "react";
import CategoryService from "../services/CategoryService";
//redux
import { useDispatch, useSelector } from "react-redux";
import { saveAllCategoryAction } from "../store/CategorySlice";

function CategoryComponent() {

    const [toggleCategory, setToggleCategory] = useState(false);

    
    const dispatch = useDispatch();
    const {allCategory, isLoading} = useSelector((state) => state.categoryStore);

    useEffect(() => {
        CategoryService.getAllCategory().
        then((res)=> {
            console.log(res.data);
            dispatch(saveAllCategoryAction(res.data))
        
        }).
        catch(err=> console.log(err))
    },[])


    function handleToggleCateory(){
        setToggleCategory(!toggleCategory);
    }

    return ( 
        <div className="bg-lightGray h-[100%] py-[20px]  flex items-center">
            <div className=" container mx-auto max-w-7xl flex items-center gap-[20px] h-full flex-col lg:flex-row">
                <button  className="bg-mainBlue px-[20px] py-[10px] text-textWhite rounded-lg"
                onClick={handleToggleCateory}>Show Category</button>
                {isLoading ? <div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[5px]">
                    {toggleCategory &&
                    allCategory.map((cat, index) => {
                        return <li key={index} className="w-[200px] bg-mainBlue text-textWhite text-center rounded-lg px-[16px] py-[8px] hover:bg-mainYellow transition-all duration-500 cursor-pointer    ">{cat}</li>
                    })
                    }
                    </ul>
                    </div> : <div>Loading category</div>}

            </div>
        </div>
    )
}

export default CategoryComponent;