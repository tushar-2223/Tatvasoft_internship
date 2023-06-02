import React, { useState, useEffect,useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Contextpage from '../ContextPage';
import { toast } from 'react-toastify';

function Books() {

  const { setLoading } = useContext(Contextpage);

  const [books, setBooks] = useState([])

  const getAllBookdata = () => {
    setLoading(true);
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://book-e-sell-node-api.vercel.app/api/book/all`,
      headers: { "Content-Type": "application/json" }
    };

    axios(config)
      .then(function (response) {
        setBooks(response.data.result);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteBook = (bookid) => {
    var config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://book-e-sell-node-api.vercel.app/api/book?id=${bookid}`,
      headers: {}
    };

    axios(config)
    .then(function () {
      toast.success("Book Delete successfully")
      getAllBookdata();
    })
    .catch(function (error) {
      console.log(error);
      toast.error("error")
    });
  }

  useEffect(() => {
    getAllBookdata();
  }, [])

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 70
    },
    {
      field: 'name',
      headerName: 'Book Name',
      width: 450,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 150,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 200,
      renderCell: (row) => (
        <>
          <Link to={`/editbook/${row.id}`} className='bg-green-500/60 px-5 py-2 font-semibold hover:bg-green-500/40 rounded-lg mx-2'>
            Edit
          </Link>

          <button onClick={() => deleteBook(row.id)} className='bg-red-500/60 px-5 py-2 font-semibold hover:bg-red-500/40 rounded-lg mx-2'>
            Delete
          </button>
        </>)
    },
  ];

  return (
    <>

      <div className="flex justify-center flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-center p-3">Books</h1>
        <div className="w-40 h-1 bg-red-400 rounded-full"></div>
      </div>

      <div className="flex justify-center items-center flex-col">
        <div className="flex">
          <Link to="/addbook" className='bg-blue-400 p-2 rounded-lg hover:bg-blue-300 font-semibold text-white'>Add Books</Link>
        </div>

        <div className="w-auto m-10">
          <DataGrid
            rows={books}
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

export default Books