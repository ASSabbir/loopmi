import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const useRole = () => {
    const email=localStorage.getItem('user')
    const {data:users,isLoading,refetch }=useQuery({
        queryKey: ['usrsRole'],
        queryFn: async () => {
            const res=await axios.get(`https://loopmi-server.vercel.app/users_role?email=${email}`);
            return res.data;
        }
    })
   
    return [users,isLoading,refetch]
};

export default useRole;