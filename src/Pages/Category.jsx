import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Contextpage from '../ContextPage';
import { toast } from 'react-toastify';

function Category() {

    const { category, setLoading } = useContext(Contextpage);

    const DeleteCategory = (deleteid) => {
        setLoading(true);
        var config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `https://book-e-sell-node-api.vercel.app/api/category?id=${deleteid}`,
            headers: { "Content-Type": "application/json" }
        };
        axios(config)
            .then(function () {
                toast.success("Category Delete Successfully");
                setLoading(false);
            })
            .catch(function (error) {
                toast.error("Error");
                console.log(error);
            });
    }

    const columns = [
        {
            field: 'id',
            headerName: 'Category Id',
            width: 100
        },
        {
            field: 'name',
            headerName: 'Category Name',
            width: 500,
        },
        {
            field: "edit",
            headerName: "Edit",
            width: 200,
            renderCell: (row) => (
                <>
                    <Link to={`/editcategory/${row.id}`} className='bg-green-500/60 px-5 py-2 font-semibold hover:bg-green-500/40 rounded-lg mx-2'>
                        Edit
                    </Link>

                    <button className='bg-red-500/60 px-5 py-2 font-semibold hover:bg-red-500/40 rounded-lg mx-2' onClick={() => DeleteCategory(row.id)}>
                        Delete
                    </button>
                </>)
        },
    ];

    return (
        <>
            <div className="flex justify-center flex-col items-center p-4">
                <h1 className="text-4xl font-bold text-center p-3">Category</h1>
                <div className="w-40 h-1 bg-red-400 rounded-full"></div>
            </div>

            <div className="flex justify-center items-center flex-col">
                <div className="flex">
                    <Link to="/addcategory" className='bg-blue-400 p-2 rounded-lg hover:bg-blue-300 font-semibold text-white'>Add Category</Link>
                </div>

                <div className="w-auto m-10">
                    <DataGrid
                        rows={category}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
            </div>
        </>
    )
}

export default Category