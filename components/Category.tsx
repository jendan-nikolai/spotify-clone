import React from 'react'

const Category = ({imageUrl, label, subLabel }) => {
    return (
            <div className="flex flex-col items-center w-48 bg-gray-800 rounded h-70 hover:bg-gray-700 hover:opacity-80">
                <div className="w-40 py-2 h-42 position-absolute">
                    <img className='object-cover h-40 mt-2 rounded w-52'
                        src={imageUrl}
                    />
                </div>
                <div className="w-full h-20 px-4 m-1 text-left text-md">
                    <div className="mb-1 text-white">
                        <h2><strong>{label}</strong></h2>
                    </div>
                    <div className="mb-2 overflow-hidden text-gray-300 ">
                        <p className="truncate ...">{subLabel}</p>
                    </div>
                </div>

            </div>

    )
}

export default Category
