// import { OneLogo } from "../assets"
import { CubeIcon } from "@heroicons/react/24/outline"



const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full lg:min-h-[80vh]">
            {/* Title */}
            <h1 className='text-4xl text-center tracking-tight font-bold text-[#070F6F] max-w-7xl sm:text-5xl md:text-6xl lg:text-[77px]'>
                The Harmony Tool for <span className="text-[#00AEE9]">Tracking</span> & <span className="text-[#00AEE9]">Analysing</span> Transactions
            </h1>
            <p className='text-center max-w-5xl mt-8 mb-12 text-slate-500'>
                The Harmony Framework is a blockchain analytics platform that provides a comprehensive view of the blockchain ecosystem. It is a one-stop solution for all your blockchain analytics needs.
                It helps you to track the transactions, addresses, tokens, and blocks on the blockchain.
            </p>
            {/* Cards */}
            <div className='mb-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2 px-6 rounded-md'>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div>
                            <CubeIcon className="h-8 w-8 text-[#070F6F]" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <span className='text-sm text-[#727272] uppercase'>SHARD COUNT</span>
                            <div>4</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div>
                            <CubeIcon className="h-8 w-8 text-[#070F6F]" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <span className='text-sm text-[#727272] uppercase'>SHARD COUNT</span>
                            <div>4</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div>
                            <CubeIcon className="h-8 w-8 text-[#070F6F]" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <span className='text-sm text-[#727272] uppercase'>SHARD COUNT</span>
                            <div>4</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div>
                            <CubeIcon className="h-8 w-8 text-[#070F6F]" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <span className='text-sm text-[#727272] uppercase'>SHARD COUNT</span>
                            <div>4</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div>
                            <CubeIcon className="h-8 w-8 text-[#070F6F]" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <span className='text-sm text-[#727272] uppercase'>SHARD COUNT</span>
                            <div>4</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div>
                            <CubeIcon className="h-8 w-8 text-[#070F6F]" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <span className='text-sm text-[#727272] uppercase'>SHARD COUNT</span>
                            <div>4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home




