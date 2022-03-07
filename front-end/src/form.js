import "./styles.css";

import { Success } from "./success";
import axios from 'axios'
import { useState } from "react";

export const Form = () => {
    const [data, setData] = useState();
    const [initial, setInitial] = useState(true);
    const [isValid, setIsvalid] = useState(false);

    const baseUrl = 'http://localhost:3001/'
    const postData = async( ) => {
        const path = 'data';

        const url = new URL(path,  baseUrl);

        const response = await axios.post(url, {
            data: data
        });

        return response.data;
    }

    const  onSubmit= async (e) => {
        e.preventDefault();
        localStorage.setItem("num", data);
        setInitial(false);
        
        if(isNaN(data) || data.length>10) {
            setIsvalid(false);
        } else  {
            setIsvalid(true);
            await postData();
        }
    }

    const onChange = (value) => { 
        setData(value);
    }

    const number = localStorage.getItem('num');
    

    if (isValid === true) {
        return (<Success></Success>)
    } else   {
        let validationError;
        if(initial == false ) { 
            validationError = "Please enter only numbers, ( max length 10 )"
        }
        const populateData = isNaN(number) === true ? number : '';
        return ( 
            <form onSubmit={e => {onSubmit(e)}}>
                {validationError}
            <label htmlFor="addNum">Number:</label>
            <input
                id="num"
                name="num"
                type="text"
                onChange={e => onChange(e.target.value)}
                in={populateData}
                  value={typeof data !== 'undefined' ? data : populateData} 
            />
            <button type="submit">Submit</button>
            </form>
        );
    }

}; 