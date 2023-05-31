import React, { useContext, useEffect, useState } from "react";
import Contextpage from '../ContextPage';
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import dummyimage from '../assets/dummyimage.jpg'

const Home = () => {
  const { setLoading,AddCart} = useContext(Contextpage);
  // get products items
  const [products, setProducts] = useState([]);
  // get api info
  const [apidata, getApidata] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState({});

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getBooks = () => {
      setLoading(true);
      var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://book-e-sell-node-api.vercel.app/api/book?pageSize=8&pageIndex=${page}&keyword=${search}`,
        headers: { "Content-Type": "application/json" }
      };

      axios(config)
        .then(function (response) {
          const result = response.data.result;
          setProducts(result.items);
          getApidata(result)
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  useEffect(() => {
    getBooks();
  }, [page,search])

  return (
    <>
      <div className="flex justify-center flex-col items-center m-2">
        <h1 className="text-4xl font-bold text-center p-4">Products</h1>
        <div className="w-24 h-1 bg-red-400 rounded-full"></div>
      </div>
      
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">

        {/* product navbar */}
        <div className="mb-4 w-full flex justify-between items-center">
          <h1 className="font-semibold text-xl">Total - {apidata.totalItems} items</h1>

          <input type="text" className="bg-gray-100 p-2 outline-none border-2 rounded-xl border-gray-300" placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div className="group" key={product.id}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.base64image ? product.base64image : dummyimage}
                  alt='img'
                  className="h-60 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-gray-700 font-bold text-md">{product.name}</h3>
              <h1 className="text-blue-500">{product.category}</h1>
              <p className="mt-1 text-lg font-medium text-gray-900">Rs. {product.price}</p>

              <button className='bg-red-200 w-full p-2 my-2 rounded-lg' onClick={() => AddCart(product.id)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-10'>
          <Stack spacing={2}>
            <Pagination count={apidata.totalPages} color="error" page={page} onChange={handleChange} />
          </Stack>
        </div>
      </div>
    </>
  )
}

export default Home