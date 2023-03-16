import React, { useState, useEffect } from 'react';
import ProductModal from '../../components/modals/productCreate';
import { instance } from '../../helpers/axios';

const Customers = () => {
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState([]);

    const openModalHandler = () => {
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        instance.get('./product').then((res) => {
            setProducts(res.data);
        })
    }, []);

    const changeHandler = (e) => {
        var search = e.currentTarget.value;
        instance.get('/product').then((res) => {
            let tmp = res.data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
            setProducts(tmp);

        })
    }
    return (
        <>
            <div className='px-40 py-20'>

                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold'>Products & Services</h2>
                    <div>
                        <button onClick={openModalHandler} className="  py-1 px-4 ml-2 text-white font-light border-blue-800 bg-blue-800 rounded-xl">New</button>
                    </div>
                </div>
                <div className='flex items-center'>
                    <input onChange={changeHandler} type="search" className=' w-72  py-1 px-2 leading-normal border border-gray-200 rounded-lg' placeholder="Search by name" />
                    <div className='flex items-center ml-4'>
                        <span className='px-2 rounded-full text-blue-800 text-xs font-semibold bg-blue-200'>{products.length}</span>
                        <span className='text-xs ml-2 font-medium text-gray-600'>products & services found</span>
                    </div>
                </div>

                <table className='table-auto w-full'>
                    <thead className=' border-b-2 border-gray-400'>
                        <tr className=' text-xs font-semibold text-left'>
                            <th className='py-2 '>Name</th>
                            <th className='py-2 '>Description</th>
                            <th className='py-2 '>price</th>
                            <th className='py-2'>Sell/Buy</th>
                            <th className='py-2 text-right'>Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => (
                                <tr key={'product' + index} className='border-b border-gray-200'>
                                    <td className='py-2'>{item.name}</td>
                                    <td className='py-2'>{item.description}</td>
                                    <td className='py-2'>L{item.price}HNL</td>
                                    <td className='py-2'>{item.option}</td>
                                    <td className='py-2 text-right'>{item.tax}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <ProductModal modalIsOpen={openModal} closeModal={closeModal}></ProductModal>
            </div>
        </>
    );
}
export default Customers;