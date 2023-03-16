import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// define a NavItem prop

// add NavItem prop to component prop

const Sidebar = () => {
  const [openState, setOpenState] = useState(false);
  const [secondState, setSecondState] = useState(false);
  const [thirdState, setThirdState] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [state, setState] = useState(false);

  const router = useRouter();

  useEffect(() => {

    setState(Cookies.get('x-access-token'));
  }, [router]);

  const ref = useRef(null);
  // useOnClickOutside(ref, (e) => {
  //   console.log('dsfasf');
  //   setSubMenu(false);
  // });

  function subMenuHandler(e) {
    e.preventDefault();
    setSubMenu(!subMenu);
  }

  function logoutHandler(e) {
    e.preventDefault();
    Cookies.remove('x-access-token');
    router.push('/login');
  }
  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="relative h-full px-3 py-4 bg-blue-100 dark:bg-gray-800">
        <a href="#" ref={ref} onClick={(e) => subMenuHandler(e)}
          className="flex items-center pl-2.5 py-2.5 mb-2.5 rounded-3xl bg-blue-200">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RICARDO</span>
        </a>
        <nav
          id="sidenav-5"
          className={classNames({
            " top-0 fixed left-full  h-screen w-64 bg-white   dark:bg-zinc-800 pt-10 px-5 border-r border-gray-200": subMenu,
            " top-0 fixed left-full -translate-x-60 opacity-0 z-[-1]  transition-all h-screen w-64 pt-20 px-5 bg-white   dark:bg-zinc-800 w-": !subMenu
          })}
          data-te-sidenav-init
          data-te-sidenav-hidden="false"
          data-te-sidenav-accordion="true">
          <ul
            className="relative m-0 list-none px-[0.2rem]"
            data-te-sidenav-menu-ref>
            <li className="relative">
              <Link href="#">
                <span className="text-2xl leading-loose font-bold px-2 ">Profile</span>
              </Link>
            </li>
            <li className="relative py-1 text-blue-700 hover:bg-blue-200  hover:text-neutral-900 rounded transition-colors">
              <Link href="#">
                <span className="text-lg leading-loose  font-semibold  py-1 px-2">Personal Information</span>
              </Link>
            </li>
            <li className="relative py-1 text-blue-700 hover:bg-blue-200  hover:text-neutral-900 rounded transition-colors">
              <Link href="#">
                <span className="text-lg leading-loose py-1 px-2 font-semibold">Emails</span>
              </Link>
            </li>
            <li className="relative py-1 text-blue-700 hover:bg-blue-200  hover:text-neutral-900 rounded transition-colors">
              <Link href="#">
                <span className="text-lg leading-loose py-1 px-2 font-semibold">Password</span>
              </Link>
            </li>
            <li className="relative py-1 text-blue-700 hover:bg-blue-200  hover:text-neutral-900 rounded transition-colors">
              <Link href="#">
                <span className="text-lg py-1 px-2 font-semibold">Notifications</span>
              </Link>
            </li>
            <li className="relative py-1 text-blue-700 hover:bg-blue-200  hover:text-neutral-900 rounded transition-colors">
              <Link href="/users/business/create">
                <span className="text-lg leading-loose py-1 px-2 font-semibold">Business</span>
              </Link>
            </li>

          </ul>
        </nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <button type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={() => setOpenState((prev) => !prev)}>
              <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              <span className="flex-1 ml-3 text-left whitespace-nowrap" >Sales & Payments</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <ul id="dropdown-example" className={classNames({
              "  hidden": !openState,
              "py-2 space-y-2 transition-all duration-300": true,
            })}>
              <li>
                <Link href="/invoices" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoices</Link>
              </li>
              <li>
                <Link href="/customers" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Customers</Link>
              </li>
              <li>
                <Link href="/products" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products & Services</Link>
              </li>
            </ul>
          </li>
          <li>
            <button type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={() => setSecondState((prev) => !prev)}>
              <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
              <span className="flex-1 ml-3 text-left whitespace-nowrap" >Purchases</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <ul id="dropdown-example" className={classNames({
              "hidden": !secondState,
              "py-2 space-y-2": true,
            })}>
              <li>
                <Link href="/bills" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Bills</Link>
              </li>
              <li>
                <Link href="/vendors" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Vendors</Link>
              </li>
              <li>
                <Link href="/products" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">products & Services</Link>
              </li>
            </ul>
          </li>
          <li>
            <button type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={() => setThirdState((prev) => !prev)}>
              <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
              <span className="flex-1 ml-3 text-left whitespace-nowrap" >Accounting</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <ul id="dropdown-example" className={classNames({
              "hidden": !thirdState,
              "py-2 space-y-2": true,
            })}>
              <li>
                <Link href="/transactions" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Transactions</Link>
              </li>
              <li>
                <Link href="/reconcillation" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Reconcillation</Link>
              </li>
              <li>
                <Link href="/accounts" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Chart of Accounts</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Reports</span>
            </Link>
          </li>
          <li>
            {
              state ? (<Link onClick={logoutHandler} href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </Link>) : (<Link href="/login" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
              </Link>)
            }

          </li>
          <li>
            <Link href="/register" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside >
  );
};
export default Sidebar;
