import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import { useSelector } from 'react-redux';

function CartPage() {


    let cart = JSON.parse(localStorage.getItem('cartItem'))

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
                        {cart.map((product) => (
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
                                        <button className='px-[8px] py-[4px] bg-slate-200 text-[18px]'>-</button>
                                        <span className='px-[8px] py-[4px] bg-slate-200 text-[18px]'>{product.count}</span>
                                        <button className='px-[8px] py-[4px] bg-slate-200 text-[18px]'>+</button>
                                    </div>
                                </TableCell>
                                <TableCell align="left">{product.cartTotal}</TableCell>
                                <TableCell align="left">
                                    <button className="text-red-500">Remove</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <div className='w-full lg:w-[30%]'>
                <h2>Cart Total</h2>
            </div>

            </div>
        </div>
    )
}

export default CartPage;