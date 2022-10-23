import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Search = () => {

    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const v = search.split(" ").join("").toLowerCase();

        if (v.length === 42 && (/^0x[a-f0-9]+$/.test(v))) {
            // address
            navigate(`/address/${v}`);
            setSearch('');
            return;
        }
        else if (v.length !== 42) {
            toast.error('Please enter a valid address');
            setSearch('');
            return;
        }

    }




    return (
        <form onSubmit={handleSearchSubmit} className="relative flex flex-col justify-center items-center w-11/12 md:w-1/2 lg:w-2/3 mb-8 mt-8 mx-auto">
            <input type="text" value={search} onChange={handleSearchChange} className="w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:border-[#070F6F] focus:border-2 px-8" placeholder="Search by Address/ Transaction Hash/ Block/ Token" />
            <svg className="absolute w-5 h-5 left-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </form>
    )
}

export default Search
