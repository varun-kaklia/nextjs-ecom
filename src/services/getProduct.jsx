import { productList } from "@/constants/api"
import { axiosGet } from "@/utils/Axios"

export const getProduct = async()=>{
    try {
        const res = await axiosGet(productList);
        return res;
    } catch (error) {
        console.error("Error while getting product list:", error);
        throw error
    }
}