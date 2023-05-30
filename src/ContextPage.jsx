import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Contextpage = createContext();

export function ContextProvider({ children }) {

    const navigate = useNavigate();
    const [data, setData] = useState(0);
    const [logindata, setLogindata] = useState({});
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([])

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
            setCategory
        }}>
            {children}
        </Contextpage.Provider>
    )
}

export default Contextpage