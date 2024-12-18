/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
"use client";
import { navigation } from "./navigation";
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { AuthModal } from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const openUserMenu = Boolean(anchorEl);
  const [openCategory, setOpenCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);

  useEffect(() => {
    if (auth.user) {
      setOpenAuthModal(false);
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }
  }, [auth.user, location.pathname, navigate]);

  const handleClose = () => {
    setOpenAuthModal(false);
  };
  

  const handleOpen = () => {
    setOpenAuthModal(true);
    navigate("/login");
  };

  const handleMyOrderClick = () => {
    navigate("/account/order");
  };
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
  const handleCategoryClick = (category, section, item) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    setOpen(false);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleCategoryMouseEnter = (categoryName) => {
    setOpenCategory(categoryName);
  };

  const handleCategoryMouseLeave = () => {
    setOpenCategory(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="fixed w-full top-0 bg-white z-50 border-b border-gray-200">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="object-cover object-center"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              { auth.user ?(<div className="flow-root">
                <a
                    href="#"
                    className="-m-2 block p-2 font text-gray-900"
                    onClick={handleUserClick}
                  >
                    {auth.user?.firstName}
                  </a>
                  
                  <a
                    href="#"
                    className="-m-2 block p-2 mt-4 font-medium text-gray-900"
                    onClick={handleUserClick}
                  >
                    Orders
                  </a>
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={handleUserClick}
                  >
                    My Profile
                  </a>
                  <a
                    href="#"
                    className="-m-2 block p-2 text-sm  text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                  <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            navigate("/");
                          }}
                        >
                          Home
                        </MenuItem>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            navigate("/account/order");
                          }}
                        >
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
              </div>) : (
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={handleOpen}
                  >
                    Sign in
                  </a>
                </div>) 
              }
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
                  className="block h-auto w-5 flex-shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">
                  CAD
                </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="w-full border-b border-gray-200">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Left section with logo and categories */}
              <div className="flex items-center gap-8">
                {/* Logo */}
                <div className="flex lg:ml-0">
                  <a href="/">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </div>

                {/* Categories */}
                <div className="hidden lg:flex lg:items-center">
                  <PopoverGroup className="flex gap-6">
                    {/* Categories with dropdowns */}
                    {navigation.categories.map((category) => (
                      <div
                        key={category.name}
                        className="relative"
                        onMouseEnter={() => handleCategoryMouseEnter(category.name)}
                        onMouseLeave={handleCategoryMouseLeave}
                      >
                        <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                          {category.name}
                        </button>

                        {openCategory === category.name && (
                          <div className="absolute left-0 top-full w-[500px] bg-white shadow-lg z-50">
                            <div className="p-6">
                              {category.sections.map((section) => (
                                <div key={section.name} className="mb-6">
                                  <p className="font-medium text-gray-900 mb-4">{section.name}</p>
                                  <ul className="grid grid-cols-2 gap-4">
                                    {section.items.map((item) => (
                                      <li key={item.name}>
                                        <a
                                          href="#"
                                          onClick={() => handleCategoryClick(category, section, item)}
                                          className="text-gray-600 hover:text-gray-800"
                                        >
                                          {item.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Additional navigation links */}
                    <a
                      href="/profile"
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Profile
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Contact
                    </a>
                  </PopoverGroup>
                </div>
              </div>

              {/* Center section with search */}
              <div className="hidden lg:flex flex-1 justify-center px-8">
                <form onSubmit={handleSearch} className="w-full max-w-lg">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-md border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </form>
              </div>

              {/* Right section */}
              <div className="flex items-center justify-end space-x-6">
                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* User Menu */}
                <div className="hidden lg:flex lg:items-center">
                  {auth.user ? (
                    <div className="relative">
                      <Avatar
                        className="text-white cursor-pointer"
                        onClick={handleUserClick}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                      <Menu
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem onClick={() => {
                          handleCloseUserMenu();
                          navigate("/");
                        }}>
                          Home
                        </MenuItem>
                        <MenuItem onClick={() => {
                          handleCloseUserMenu();
                          navigate("/account/order");
                        }}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Button>
                  )}
                </div>

                {/* Cart */}
                <div className="flow-root">
                  <a href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
