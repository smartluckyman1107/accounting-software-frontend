import React, { useState, useEffect } from 'react';
import IncomeModal from '../../components/modals/incomeCreate';
import ExpenseModal from '../../components/modals/expenseCreate';
import { instance } from '../../helpers/axios';
const Transactions = () => {

    const [openIncome, setOpenIncome] = useState(false);
    const [openExpense, setOpenExpense] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        instance.get('/account').then((res) => {
            setAccounts(res.data);
        }, []);

        instance.get('/transaction').then((res) => {
            setTransactions(res.data);
        }, []);
    })


    const openIncomeHandler = () => {
        setOpenIncome(true);
    }

    const openExpenseHandler = () => {
        setOpenExpense(true);
    }

    const closeModal = () => {
        setOpenIncome(false);
        setOpenExpense(false);
        instance.get('/transaction').then((res) => {
            setTransactions(res.data);
        });
    }
    return (
        <>
            <div className='px-40 py-20'>

                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-bold'>Transactions</h2>
                    <div>
                        <button className="shadow ml-auto mr-2 border border-purple-500 text-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none hover:text-white text-xs font-semibold py-1 px-4 rounded-full transition-colors duration-300" onClick={openIncomeHandler}>
                            Add income
                        </button>
                        <button className="shadow ml-auto mr-2 border border-purple-500 text-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none hover:text-white text-xs font-semibold py-1 px-4 rounded-full transition-colors duration-300" onClick={openExpenseHandler}>
                            Add expense
                        </button>
                        {/* <select className="shadow ml-auto mr-2 border border-purple-500 text-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none hover:text-white text-xs font-semibold py-1 px-4 rounded-full transition-colors duration-300">
                            <option value="default">More</option>
                        </select> */}
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-2'>
                    <select className=' col-span-3 py-1 px-2 text-xs font-semibold leading-normal border border-gray-200 rounded-lg focus:outline-none'>
                        <option value="banrural-aboro">Banrural Aboro</option>
                    </select>
                    <div className='flex justify-between col-span-9 py-1 px-2 leading-normal border border-gray-200 rounded-lg'>
                        <div className='text-xs'>
                            <button className='font-bold mr-1'>Auto updates </button>
                            to your transactions
                        </div>
                        <button className='text-xs font-bold text-blue-700'>All updates</button>
                    </div>
                </div>
                <div className='bg-gray-100 border-b mt-4 border-gray-200'>
                    <div className='flex items-center px-3 py-2 text-xs font-semibold text-gray-500'>
                        <input type="checkbox" id="select" name="select" />
                        <label htmlFor="select" className='ml-1'>Select all</label>
                        <button className='ml-auto text-xs '>Filter</button>
                        <button className='ml-3 text-xs '>Sort</button>
                        <button className='ml-3 text-xs'>search</button>
                    </div>
                </div>
                <table className='table-auto w-full bg-gray-100'>
                    <thead className='px-2 border-b border-gray-200'>
                        <tr className='text-xs font-semibold text-left'>
                            <th className='pl-8 py-2 w-1/6'>Date</th>
                            <th className='pl-2 py-2 w-1/3 '>Description</th>
                            <th className='py-2 w-1/6'>Account</th>
                            <th className='py-2 w-1/12'>Category</th>
                            <th className='py-2 w-1/12'>Amount</th>
                            <th className='py-2 pr-3 w-1/12 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((item, index) => (
                                <tr key={'transaction-' + index} className='px-3 text-xs text-gray-500 font-semibold border-b border-gray-200'>
                                    <td className='flex items-center pl-3 py-2'><input type="checkbox" id="select" name="select" />
                                        <label htmlFor="select" className='ml-2'>{new Intl.DateTimeFormat('en-US').format(new Date(item.date))}</label></td>
                                    <td><span className='block truncate py-1 px-2 bg-transparent ' cols={40} rows={1}>{item.description}</span> </td>
                                    <td>{item.account}</td>
                                    <td>
                                        <select disabled name="category" id="category" className='py-1 px-2 bg-transparent outline-blue-700'>
                                            <option value="payment-received-for-an-invoice">Payment Received for an invoice</option>
                                            <option value="transfer-from-bank-credit-card-or-loan">Transfer from Bank, Credit Card, or Loan</option>
                                        </select>
                                    </td>
                                    <td>L{item.amount}</td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>

                <IncomeModal modalIsOpen={openIncome} closeModal={closeModal} accounts={accounts}></IncomeModal>
                <ExpenseModal modalIsOpen={openExpense} closeModal={closeModal} accounts={accounts}></ExpenseModal>
            </div>
        </>
    );
}
export default Transactions;