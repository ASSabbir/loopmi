import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useItem = () => {
   
    const {data:items,isLoading,refetch }=useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res=await axios.get(`https://loopmi-server.vercel.app/carts`);
            return res.data;
        }
    })
   
    return [items,isLoading,refetch]
};

export default useItem;