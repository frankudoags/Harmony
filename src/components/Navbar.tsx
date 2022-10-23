import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { Logo} from '../assets'


// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

export default function Navbar() {
    return (
        <Popover className="relative bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between py-6  md:space-x-10">
                    <div className="flex">
                        <Link to="/" className='flex items-center gap-1'>
                            <span className="sr-only">ScanOne</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src={Logo}
                                alt=""
                            />
                        </Link>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex text-[#49509d] hover:text-[#070F6F]">
                        <Link to="/" className="text-base font-medium">
                            Pricing
                        </Link>
                        <Link to="/" className="text-base font-medium">
                            Docs
                        </Link>
                        <Link to="/" className="text-base font-medium">
                            Company
                        </Link>
                        <Link to="/" className="text-base font-medium">
                            Blog
                        </Link>
                        <Link to="/" className="text-base font-medium">
                            Profile 
                        </Link>
                    </Popover.Group>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-[#070F6F] hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-8 w-8 text-black" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Link to="/">
                                        <img
                                            className="h-8 w-auto"
                                            src={Logo}
                                            alt="Your Company"
                                        />
                                    </Link>
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                            </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Pricing
                                </Link>

                                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Docs
                                </Link>
                                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Company
                                </Link>
                                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Blog
                                </Link>
                                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
