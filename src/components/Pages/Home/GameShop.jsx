import React from 'react';
import { Link } from 'react-router-dom';
import {AiOutlinePlus} from "react-icons/ai"
import rogphone from "../../../assets/rogasus.png";
import { game } from '../../../function';


const GameShop = () => {
    const gameShop = game()
  return (
    <div className='px-4 mt-20 bg-[#94c4c8bd] rounded-tl-2xl rounded-tr-2xl'>
        <div className='relative lg:px-4 xl:mx-[10%] 2xl:mx-[16%]'>
            <div className='absolute top-[80px] w-full'>
                <h3 className='rog text-[32px] text-center md:text-[38px] lg:text-[48px]'>R O G P H O N E</h3>
            </div>
            <div className=' w-[50%] mx-auto pt-12'>
                <img className=' mx-auto' src={rogphone} alt="" />
            </div>
            <div className='mt-2 py-2 px-4 bg-[#f6f6f6] rounded-tl-2xl rounded-tr-2xl'>
                <div className='flex flex-wrap justify-between xl:justify-start xl:gap-2 px-2'>
                    {gameShop.map(item => (
                        <div key={item.id} className='w-[48%] sm:w-[49%] md:w-[32%] lg:w-[24%] xl:w-[19%] bg-white rounded-2xl p-3 mt-3 border-hover'>
                            <button className='ml-[82%] p-2 rounded-xl bg-transparent border-style'>
                                <AiOutlinePlus size={12} />
                            </button>
                            <Link to={`/product/${item.name}`} onClick={() => window.scrollTo(0,0)}>
                                <div className='mt-3'>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <p className='mt-4 three-dot'>{item.name}</p>
                                <h2 className='font-bold'>{new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'VND'}).format(item.price)}</h2>
                                <p className='text-gray-400 line-through'>{new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'VND'}).format(item.price * item.old_price)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='mt-6'>
                    <p className='text-center text-[12px] md:text-[16px]
                    text-[#105b59]'><span className='text-[14px] font-bold md:text-[18px]'>ROG PHONE</span> thế giới của mọi game thủ mang đến các sản cực kì chất lượng với cấu hình 
                    cực khủng</p>
                </div>
                <div className='w-full my-6'>
                    <button className='py-1 px-4 rounded-3xl text-[#115E5C] border-green text-[13px] 
                    font-medium ml-[50%] translate-x-[-50%]'>Xem thêm</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GameShop