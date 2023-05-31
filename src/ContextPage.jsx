import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Contextpage = createContext();

export function ContextProvider({ children }) {

    const [data, setData] = useState(0);
    const [logindata, setLogindata] = useState({});
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [products, setProduct] = useState([]);

    const getData = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://book-e-sell-node-api.vercel.app/api/user/all',
            headers: { "Content-Type": "application/json" }
        };

        axios(config)
            .then(function (response) {
                const data = response.data.result;
                const filterdatavalue = filterData(data)
                // setUser(filterdata);
                // const userdata = LocalStorageFun(filterdatavalue);
                localStorage.setItem("user", JSON.stringify(filterdatavalue))
                setUser(filterdatavalue);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const filterData = (data) => {
        const filterdata = data.find(value => value.email == logindata.email);
        // console.log(filterdata);
        return filterdata;
    }

    const getlocalstoragedata = () => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }

    const LoadinContainer = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }

    const getCategory = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://book-e-sell-node-api.vercel.app/api/category/all',
            headers: { "Content-Type": "application/json" }
        };

        axios(config)
            .then(function (response) {
                setCategory(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Cart

    const AddCart = (bookid) => {
        const initialCart = {
            bookId: bookid,
            userId: user.id,
            quantity: 1,
        };

        setLoading(true);
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://book-e-sell-node-api.vercel.app/api/cart',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(initialCart),
        };

        // Check if book is already in the cart
        axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${user.id}`)
            .then(function (response) {
                const cartItems = response.data.result;
                const existingCartItem = cartItems.find((item) => item.bookId === bookid);

                if (existingCartItem) {
                    // Book is already in the cart
                    toast.warning('Book is already in the cart');
                    setLoading(false);
                } else {
                    // Book is not in the cart, add it
                    axios(config)
                        .then(function () {
                            toast.success('Item added successfully');
                            setLoading(false);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            })
            .catch(function (error) {
                console.log(error);
           });
    };

    useEffect(() => {
        if (logindata.email) {
            getData();
        }

        getlocalstoragedata();
        getCategory();
    }, [logindata.email]);


    return (

        <Contextpage.Provider value={{
            data,
            setData,
            logindata,
            setLogindata,
            user,
            setUser,
            getData,
            loading,
            setLoading,
            LoadinContainer,
            category,
            setCategory,
            AddCart,
            products,
            setProduct,
        }}>
            {children}
        </Contextpage.Provider>
    )
}

export default Contextpage