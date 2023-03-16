import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import BillModal from '../../components/modals/billCreate';
import { instance } from '../../helpers/axios';
import classNames from "classnames";
const Customers = () => {
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [bills, setBills] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const openModalHandler = () => {
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
        instance.get('/bill').then((res) => {
            setBills(res.data);
        });
    }

    function changeHandler(e) {
        console.log(e.currentTarget.value);
        document.querySelector('.filter-form-submit').click();
    }

    const onSubmit = (data) => {
        console.log(data);
        instance.get('/bill').then((res) => {
            let tmp = res.data;
            if (data.vendor != 'default') {
                tmp = tmp.filter((item) => item.vendorID._id == data.vendor);
            }
            if (data.from != '') {
                tmp = tmp.filter((item) => (new Date(item.date).getTime() - new Date(data.from).getTime()) >= 0);
            }
            if (data.to != '') {
                tmp = tmp.filter((item) => (new Date(item.date).getTime() - new Date(data.to).getTime()) <= 0);
            }
            setBills(tmp);
        })
    };


    useEffect(() => {
        instance.get('/product').then((res) => {
            setProducts(res.data);
        });

        instance.get('/vendor').then((res) => {
            setVendors(res.data);
        });

        instance.get('/bill').then((res) => {
            setBills(res.data);
        })
    }, [])
    return (
        <>
            <div className='px-40 py-20'>

                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold'>Bills</h2>
                    <div>
                        <button onClick={openModalHandler} className="  py-1 px-4 ml-2 text-white font-light border-blue-800 bg-blue-800 rounded-2xl">Create a Bill</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-12 gap-3   italic text-base text-gray-400 mt-4 mb-4'>
                    <div className=' col-span-5   '>
                        <div className='text-xs font-semibold text-gray-500 not-italic mb-1'>Vendor</div>
                        <select name="customer" id="customer" className=' w-full pt-1 pb-2 px-2 leading-normal border border-gray-200 rounded-lg' {...register('vendor', { onChange: (e) => { changeHandler(e) } })}>
                            <option value="default" >All vendors</option>
                            {
                                vendors.map((item, index) => {
                                    return (
                                        <option key={'vendor-' + index} value={item._id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='col-span-4'>
                        <div className='text-xs font-semibold text-gray-500 not-italic mb-1'>Bill date</div>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-6'>
                                <input type="date" className='w-full py-1 px-2 leading-normal border border-gray-200 rounded-tl-lg rounded-bl-lg' placeholder='From' {...register('from', { onChange: (e) => { changeHandler(e) } })} />
                            </div>
                            <div className='col-span-6'>
                                <input type="date" className='w-full py-1 px-2 leading-normal border border-gray-200 rounded-br-lg rounded-tr-lg' placeholder='To' {...register("to", { onChange: (e) => { changeHandler(e) } })} />
                            </div>

                        </div>
                        <button type='submit' className='hidden filter-form-submit'>Submit</button>
                    </div>
                </form>


                <table className='table-auto w-full'>
                    <thead className=' border-b-2 border-gray-400'>
                        <tr className=' text-xs font-semibold text-left'>
                            <th className='py-2'>Status</th>
                            <th className='py-2'>Date</th>
                            <th className='py-2'>Vendor</th>
                            <th className='py-2 text-right'>Amount Due</th>
                            <th className='py-2 text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bills.map((item, index) => {
                                return (
                                    <tr key={'bill-' + index} className='border-b border-gray-200'>
                                        <td className='py-2'><span className={classNames({
                                            'inline-block w-20 px-2 py-1 bg-emerald-300 text-emerald-700 font-semibold rounded-md text-center': (item.status == 'paid'),
                                            ' inline-block w-20 px-2 py-1 bg-gray-300 text-gray-600 font-semibold rounded-md text-center': (item.status == 'unpaid')

                                        })}> {item.status}</span></td>
                                        <td>{item.date}</td>
                                        <td>{item.vendorID.name}</td>
                                        <td className='text-right'>
                                            <span className='block'>L0.00HNL</span>
                                            <span className='block text-gray-500'>total L{item.total}HNL</span>
                                        </td>
                                        <td></td>
                                    </tr>

                                )
                            })
                        }


                    </tbody>
                </table>

                <BillModal modalIsOpen={openModal} closeModal={closeModal} vendors={vendors} products={products}> </BillModal>
            </div>
        </>
    );
}
export default Customers;