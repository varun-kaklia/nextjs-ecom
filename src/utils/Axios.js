import axios from "axios"
import { toast } from "react-toastify";

const url = process.env.BASEURL?`${process.env.BASEURL}`:"https://fakestoreapiserver.reactbd.com"

const axiosInstance = axios.create({
    baseURL:url,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    },
})

const errorHandling = (error) => {
    if (error.response) {
      console.error('Server Error Faced:', error.response.data);
      toast.error(`Error: ${error.response.data.message || 'An error occurred'}`);
    } else if (error.request) {
      console.error('Network Error:', error.message);
      toast.error('Network Error: Please check your connection and try again.');
    } else {
      console.error('Error:', error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

export const axiosGet = async(url,config)=>{
    try {
        const response = await axiosInstance.get(url,config)
        return response?.data;
    } catch (error) {
        errorHandling(error);
        throw error;
    }
}

export const axiosPost = async(url,data,config)=>{
    try {
        const response = await axiosInstance.post(url,data,config)
        return response?.data;
    } catch (error) {
        errorHandling(error);
        throw error;
    }
}

export const axiosDelete = async(url,config)=>{
    try {
        const response = await axiosInstance.delete(url,config)
        return response?.data;
    } catch (error) {
        errorHandling(error);
        throw error;
    }
}

export default axiosInstance