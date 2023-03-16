import React, { useState, useEffect } from 'react';
import AccountModal from '../../components/modals/accountCreate';
import SubAccountModal from '../../components/modals/subAccountCreate';
import { instance } from '../../helpers/axios';
import { accountType } from '../../helpers/account-type';
import classNames from 'classnames';

const Accounts = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openSubModal, setOpenSubModal] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [subAccounts, setSubAccounts] = useState([]);
    const [title, setTitle] = useState('');
    const [filter, setFilter] = useState('Assets');

    useEffect(() => {
        instance.get('/account').then((res) => {
            setAccounts(res.data);
        });
    }, []);


    useEffect(() => {
        let values = accountType[filter];
        setTitle(values.join(', '));
        instance.get('/account/').then((res) => {
            let tmp = res.data.filter((item) => item.parent == filter);
            setSubAccounts(tmp);
        })
    }, [filter, accounts])

    const openModalHandler = () => {
        setOpenModal(true);
    }

    const openSubModalHandler = () => {
        setOpenSubModal(true)
    }

    const closeSubModalHandler = () => {
        setOpenSubModal(false);
        instance.get('/account').then((res) => {
            setAccounts(res.data);
        })
    }

    const closeModal = () => {

        setOpenModal(false);
        instance.get('/account').then((res) => {
            setAccounts(res.data);
        })
    }

    const calCount = (type) => {
        let tmp = accounts.filter((item) => item.parent == type);
        return tmp.length;
    }


    return (
        <>
            <div className='container px-32 py-32'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold'>Chart of Accounts</h2>
                    <div>
                        <button onClick={openModalHandler} className="  py-2 px-4 text-white text-xs font-semibold bg-blue-700 rounded-2xl">Add a New Account</button>
                    </div>
                </div>
                <div className='relative mb-6'>
                    <div className='relative w-1/2 bg-blue-50 rouned-lg mx-auto grid grid-cols-12 gap-1 rounded-xl py-1 px-1 text-center '>
                        {
                            Object.keys(accountType).map((item, index) => (
                                <div key={'type-' + index} onClick={() => setFilter(item)} className={classNames({
                                    'col-span-3 text-xs font-semibold px-4 py-1 rounded-lg  transition-colors cursor-pointer duration-300': true,
                                    'bg-white': (filter == item)
                                })}>
                                    {item}
                                    <span className='px-2 rounded-full text-blue-800 text-xs font-semibold bg-blue-200  mb-4 ml-2'>{calCount(item)}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className='absolute top-1/2 left-0 w-full border-b border-solid border-gray-200 z-[-1]'></div>
                </div>
                <div className='px-2 py-2 text-xs font-semibold bg-gray-200'>
                    {title}
                </div>
                <div>

                    {
                        subAccounts.map((item, index) => (
                            <div key={'account-' + index} className='grid grid-cols-12 gap-4 py-2 border-b border-gray-300'>
                                <div className='col-span-3 pl-16 text-xs font-semibold' >
                                    <h6 className='text-gray-600'>{item.name}</h6>
                                    <p className='text-gray-400'>Latest transaction on February 26, 2023</p>
                                </div>
                                <div className='col-span-5 text-xs font-semibold'>
                                    {item.description}
                                </div>

                                <div className='col-span-4 pr-4 text-xs text-blue-700 text-right font-semibold'>
                                    <button>Edit</button>
                                </div>
                            </div>
                        ))
                    }


                    <div className='py-2 pl-16 border-b-2 border-gray-300'>
                        <button onClick={openSubModalHandler} className='text-xs text-blue-700 font-bold'>Add a New Account</button>
                    </div>
                </div>
            </div>
            <AccountModal modalIsOpen={openModal} closeModal={closeModal}></AccountModal>
            <SubAccountModal modalIsOpen={openSubModal} closeModal={closeSubModalHandler} filter={filter}></SubAccountModal>
        </>
    );
}

export default Accounts;