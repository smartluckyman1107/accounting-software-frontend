import React, { useState } from 'react';
import { useEffect } from 'react';
import VendorModal from '../../components/modals/vendorCreate';
import { instance } from '../../helpers/axios';
const Vendors = () => {
    const [openModal, setOpenModal] = useState(false);
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        instance.get('/vendor').then((res) => {
            console.log(res.data);
            setVendors(res.data);
        })
    }, []);

    const openModalHandler = () => {
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
        instance.get('/vendor').then((res) => {
            setVendors(res.data);
        })
    }

    const changeHandler = (e) => {
        var search = e.currentTarget.value;
        instance.get('/vendor').then((res) => {
            let tmp = res.data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
            setVendors(tmp);

        })
    }
    return (
        <>
            <div className='px-40 py-20'>

                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold'>Vendors</h2>
                    <div>
                        <button onClick={openModalHandler} className="  py-1 px-4 ml-2 text-white font-light border-blue-800 bg-blue-800 rounded-xl">New</button>
                    </div>
                </div>
                <div className='flex items-center'>
                    <input onChange={changeHandler} type="search" className=' w-72  py-1 px-2 leading-normal border border-gray-200 rounded-lg' placeholder="Search by name" />
                    <div className='flex items-center ml-4'>
                        <span className='px-2 rounded-full text-blue-800 text-xs font-semibold bg-blue-200'>{vendors.length}</span>
                        <span className='text-xs ml-2 font-medium text-gray-600'>vendors found</span>
                    </div>
                </div>

                <table className='table-auto w-full'>
                    <thead className=' border-b-2 border-gray-400'>
                        <tr className=' text-xs font-semibold text-left'>
                            <th className='py-2 '>Name</th>
                            <th className='py-2 '>Total Bills Count</th>
                            <th className='py-2 '>Total Owed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vendors.map((item, index) => {
                                return (
                                    <tr key={'vendor-' + index} className='border-b border-gray-200'>
                                        <td className='py-2'>{item.name}</td>
                                        <td className='py-2'></td>
                                        <td className='py-2'></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

                <VendorModal modalIsOpen={openModal} closeModal={closeModal}></VendorModal>
            </div>
        </>
    );
}
export default Vendors;