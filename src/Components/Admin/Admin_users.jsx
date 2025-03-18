import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";



const Admin_users = () => {
    
    const {data:users=[],isLoading,refetch }=useQuery({
        queryKey: ['users','allusers'],
        queryFn: async () => {
            const res=await axios.get('https://loopmi-server.vercel.app/users');
            return res.data;
        }
    })
    console.log(users);
    if (isLoading) {
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    const handelMakeAdmin = async (id) => {
        const { value: confirmation } = await Swal.fire({
            title: 'Type "confirm" to proceed',
            input: 'text',
            inputPlaceholder: 'Type "confirm"',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
                if (value.toLowerCase() !== 'confirm') {
                    return 'You must type "confirm"!';
                }
            },
            customClass: {
                popup: 'bg-white text-black border-2 border-gray-300',
                title: 'text-2xl font-semibold mb-4',
                input: 'p-2 border border-gray-400 rounded-md',
                confirmButton: 'bg-color2 text-white p-2 rounded-md hover:bg-color1',
                cancelButton: 'bg-red-500 text-white p-2 rounded-md hover:bg-red-600',
            }
        });

        if (confirmation && confirmation.toLowerCase() === 'confirm') {
            axios.put(`https://loopmi-server.vercel.app/admin_made/${id}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.acknowledged == true) {
                        Swal.fire({
                            title: "Done!",
                            text: "User is now Admin",
                            icon: "success"
                        });
                        refetch()
                    }
                })
        }
    }
    return (
        <div className="p-6 bg-gray-200 space-y-4 w-full">
            <div className="p-6 sm:p-12 bg-gray-50 text-gray-800">
                <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">

                    <div className="flex flex-col">
                        <h4 className="text-2xl font-semibold font-Noto text-center md:text-left">All Users</h4>
                        <p className="text-gray-600"></p>
                    </div>
                </div>

            </div>
            <div className="p-6 sm:p-12 bg-gray-50 min-h-screen ">

                <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                    <h2 className="mb-4 text-2xl font-semibold leading-tight">Total : {users.length} users</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col className="w-24" />
                            </colgroup>
                            <thead className="bg-gray-300">
                                <tr className="text-left">
                                    <th className="p-3">Id #</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3 text-right"></th>

                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) =>

                                    <tr key={user._id} className="border-b hover:bg-color5 hover:text-white border-opacity-20 duration-150 border-gray-300 bg-gray-50">
                                        <td className="p-3">
                                            <p>{user._id}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{user.email}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{user.role}</p>

                                        </td>

                                        <td className="p-3 text-right">
                                            <button onClick={() => handelMakeAdmin(user._id)} className="px-3 py-1 font-semibold rounded-md bg-color5 hover:bg-white hover:text-color5 duration-150 text-gray-50">
                                                Make Admin
                                            </button>
                                        </td>
                                    </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Admin_users;