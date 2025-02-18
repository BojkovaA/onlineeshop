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
import {useState, useEffect} from 'react'

function CartPage() {

    const [cartData, setCartData] = useState([]);
    const {cart, totalPrice} = useSelector(state=> state.cartStore);

    const dispatch = useDispatch();


    useEffect(()=>{
        setCartData(JSON.parse(localStorage.getItem('cartItem')))
    },[cart])


    function handleRemoveProduct(product){
        dispatch(deleteFromCartAction(product))
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
                <h2>Cart Total</h2>
                <span>${totalPrice}</span>
            </div>

            </div>
        </div>
    )
}

export default CartPage;