import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import {deleteFromCartAction, setPriceHandlerAction} from '../store/CartSlice'
import {useState, useEffect, useRef} from 'react'

function CartPage() {

    const [cartData, setCartData] = useState([]);
    const {cart, totalPrice} = useSelector(state=> state.cartStore);
    const [activeCode, setActiveCode] = useState(null); 

    const dispatch = useDispatch();


    const copounRef = useRef();

    useEffect(()=>{
        setCartData(JSON.parse(localStorage.getItem('cartItem')))
    },[cart])


    function handleRemoveProduct(product){
        dispatch(deleteFromCartAction(product))
    }

    function handleApplyCoupon(){
        setActiveCode(copounRef.current.value);

        copounRef.current.value = '';
    }

    return (
        <div className="mt-[50px]">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-[20px] items-start">
            <TableContainer component={Paper} className='w-full lg:w-[70%]'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className='bg-mainBlue text-textWhite '>
                    <TableRow>
                        <TableCell style={{ color: 'white' }} align="left">Products</TableCell>
                        <TableCell style={{ color: 'white' }} align="left">Price</TableCell>
                        <TableCell style={{ color: 'white' }} align="left">Quantity</TableCell>
                        <TableCell style={{ color: 'white' }} align="left">Subtotal</TableCell>
                        <TableCell style={{ color: 'white' }} align="left">Remove</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartData.map((product, index) => (
                            <TableRow
                                key={product.id} // Осигури се дека `id` е уникатно
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img src={product.thumbnail} alt={product.name} className='w-[90px] h-[90px] border border-mainBlue rounded-lg
                                    object-cover'/>
                                </TableCell>
                                <TableCell align="left">${product.price}</TableCell>
                                <TableCell align="left">
                                    <div className='flex items-center'>
                                        <button className='px-[8px] py-[4px] bg-slate-200 text-[18px]'
                                        onClick={()=> dispatch(setPriceHandlerAction({index, increment: -1, product}))}>-</button>
                                        <span className='px-[8px] py-[4px] bg-slate-200 text-[18px]'>{product.count}</span>
                                        <button className='px-[8px] py-[4px] bg-slate-200 text-[18px]'
                                        onClick=
                                        {()=>{
                                            if(product.count < product.stock){
                                                dispatch(setPriceHandlerAction({index, increment: 1, product}))
                                            }
                                        }}
                                        
                                        >+</button>
                                    </div>
                                </TableCell>
                                <TableCell align="left">{Math.floor(product.cartTotal)}</TableCell>
                                <TableCell align="left">
                                    <button className="text-red-500" onClick={()=>handleRemoveProduct(product)}>Remove</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <div className='w-full lg:w-[30%]'>
                <h2 className='text-white bg-mainBlue text-center py-[17px] rounded-md'>Cart Total</h2>
                <span className='text-center font-extrabold text-[28px]'>
                    Total Price: ${activeCode === "alpha" ? totalPrice/2 : totalPrice}</span>

                <div className='flex flex-col'>
                    <input ref={copounRef}
                     type='text' placeholder='Coupon Code'
                    className='p-[10px] border border-grayColor rounded-lg placeholder:text-mainBlue outline-none mt-[25px]'
                    //value={activeCode} // onChange={(e) => setActiveCode(e.target.value)} 
                    />
                    
                    <span className='text-[13px] text-grayColor'>Insert copun for 50% discount</span>
                    <button className={activeCode === 'alpha' ? 'bg-grayColor text-black hover:bg-gray-500 px-[15px] py-[7px] transition-all duration-300 cursor-pointer rounded-lg mt-[30px] line-through'
 : 'bg-mainBlue text-textWhite hover:bg-mainYellow px-[15px] py-[7px] transition-all duration-300 cursor-pointer rounded-lg mt-[30px]'
}                    onClick={handleApplyCoupon}
                    disabled={activeCode === 'alpha' ? true: false  }>Apply Copount</button>
                </div>

            </div>

            </div>
        </div>
    )
}

export default CartPage;