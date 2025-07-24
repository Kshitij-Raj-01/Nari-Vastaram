"use client";

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
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu as MuiMenu, MenuItem, Avatar, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";
import { getCart } from "../../../State/Cart/Action";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      // featured: [
      //   {
      //     name: "New Arrivals",
      //     href: "#",
      //     imageSrc:
      //       "https://i.pinimg.com/474x/fa/91/5d/fa915d158642f5a807f2a399a9943cc8.jpg",
      //     imageAlt: "A radiant woman in a flowy kurti smiling under the sun.",
      //   },
      //   {
      //     name: "Designer Kurtis",
      //     href: "#",
      //     imageSrc:
      //       "https://www.anantexports.in/cdn/shop/files/IMG-20231104-WA0090.jpg?v=1699121091",
      //     imageAlt: "Close-up of intricate embroidery on a vibrant kurti.",
      //   },
      // ],
      sections: [
        {
          id: "style",
          name: "Style",
          items: [
            { name: "All Kurtis", href: "#" },
            { name: "Kurti Sets", href: "#" },
            { name: "Designer Kurtis", href: "#" },
            { name: "Short Kurtis", href: "#" },
            { name: "Long Kurtis", href: "#" },
          ],
        },
        {
          id: "occasion",
          name: "Occasion",
          items: [
            { name: "Festive Wear", href: "#" },
            { name: "Casual Wear Kurtis", href: "#" },
            { name: "Latest Trends", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [OpenAuthModal, setOpenAuthModal] = useState(false);
  const [guestCartCount, setGuestCartCount] = useState(0);

  const jwt = sessionStorage.getItem("jwt");
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

    const getGuestCartCount = () => {
    const cart = localStorage.getItem("guest_cart");
    if (!cart) return 0;

    try {
      const items = JSON.parse(cart);
      return items.reduce((sum, item) => sum + item.quantity, 0);
    } catch (err) {
      console.error("Failed to parse guest cart:", err);
      return 0;
    }
  };

   useEffect(() => {
    const updateGuestCartCount = () => {
      const count = getGuestCartCount();
      setGuestCartCount(count);
    };

     updateGuestCartCount();

    // Listen for external cart updates (other tabs or manually triggered)
    window.addEventListener("storage", updateGuestCartCount);

     return () => {
      window.removeEventListener("storage", updateGuestCartCount);
    };
  }, []);

  const totalCartItems = jwt
    ? cart?.cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0
    : guestCartCount;

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.name}`);
    close();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/")
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user) {
      dispatch(getCart(jwt));
      handleClose();
    }
  }, [auth.user, dispatch, jwt, navigate, location.pathname]);

  return (
    <div className="bg-[#F1EDE1] w-full mb-10">
      {/* Mobile menu */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative z-50 flex w-full max-w-xs transform flex-col overflow-y-auto bg-[#FFF5CD] pb-12 shadow-xl">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            {/* Tabs */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories?.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories?.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category?.featured?.map((item) => (
                        <div
                          key={item.name}
                          className="group relative text-sm"
                        >
                          <img
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a className="mt-6 block font-medium text-gray-900">
                            {item.name}
                          </a>
                          <p className="mt-1">Shop now</p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul className="mt-6 flex flex-col space-y-6">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <a
                                onClick={() => {
                                  navigate(
                                    `/${category.id}/${section.id}/${item.name}`
                                  );
                                  setOpen(false);
                                }}
                                className="block p-2 text-gray-500"
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
                <div key={page.name}>
                  <a
                    href={page.href}
                    className="block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              {auth.user ? (
                <>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left text-sm font-medium text-gray-700 py-2"
                  >
                    Profile
                  </button>
                  <button
    onClick={() => {
      setOpen(false);
      navigate("/account/orders");
    }}
    className="block w-full text-left text-sm font-medium text-gray-700 py-2"
  >
    My Orders
  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-sm font-medium text-red-600 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    handleOpen();
                  }}
                  className="block w-full text-left text-sm font-medium text-[#9155FD] hover:text-[#7D3FDF] py-2"
                >
                  Sign In
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-[#F1EDE1]">

        <nav className="max-w-full px-4">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-[#D8A353] p-2 text-white lg:hidden"
              >
                <Bars3Icon className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <img
                    src="/assets/logo.jpg"
                    alt="Logo"
                    className="h-14 w-auto"
                  />
                </a>
              </div>

              {/* Desktop Nav */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
                            {category.name}
                          </PopoverButton>
                          <PopoverPanel className="absolute z-50 inset-x-0 top-full text-sm text-gray-500">
                            <div className="relative bg-[#F1EDE1]">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured?.map((item) => (
                                      <div key={item.name}>
                                        <img
                                          src={item.imageSrc}
                                          alt={item.imageAlt}
                                          className="aspect-square w-full rounded-lg bg-gray-100 object-cover"
                                        />
                                        <a className="mt-6 block font-medium text-gray-900">
                                          {item.name}
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p className="font-medium text-gray-900">
                                          {section.name}
                                        </p>
                                        <ul className="mt-6 space-y-6">
                                          {section.items.map((item) => (
                                            <li key={item.name}>
                                              <p
                                                onClick={() =>
                                                  handleCategoryClick(
                                                    category,
                                                    section,
                                                    item,
                                                    close
                                                  )
                                                }
                                                className="hover:text-gray-800 cursor-pointer"
                                              >
                                                {item.name}
                                              </p>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </>
                      )}
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              {/* Right Icons */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                  {auth.user ? (
                    <>
                      <IconButton onClick={handleMenuOpen} size="small">
                        <Avatar
                          sx={{
                            bgcolor: "white",
                            color: "black",
                            width: 36,
                            height: 36,
                          }}
                        >
                          {auth.user.firstName[0].toUpperCase()}
                        </Avatar>
                      </IconButton>
                      <MuiMenu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleMenuClose();
                            navigate("/account/orders");
                          }}
                        >
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MuiMenu>
                    </>
                  ) : (
                    <>
                      <a
                        onClick={handleOpen}
                        className="text-sm font-medium text-[#9155FD] hover:text-[#7D3FDF] cursor-pointer"
                      >
                        Sign in
                      </a>
                    </>
                  )}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 lg:mr-10">
                  <a href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon className="size-9 shrink-0 p-1 bg-[#D8A353] text-white rounded-full" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {totalCartItems}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={handleClose} open={OpenAuthModal} />
    </div>
  );
};

export default Navigation;
