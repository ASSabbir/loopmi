import { useContext, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AuthContext } from "../Root/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { setCartCount, cartCount, user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    setCartCount(savedCart.length);
  }, [setCartCount]);

  const handelremove = (deleteItem) => {
    const updatedCart = cart.filter((item) => item._id !== deleteItem._id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setCartCount(updatedCart.length);
  };

  const handelAdd = () => {
    setIsModalOpen(true); // Open modal when clicking "Pay"
  };

  const handleConfirmOrder = () => {
    if (!phone || !address) {

      Toast.fire({
        icon: "error",
        title: "Please enter both Phone and Address!"
      });
      return;
    }

    // Save user details and close modal
    localStorage.setItem("userDetails", JSON.stringify({ phone, address }));
    setIsModalOpen(false);
    const orderItems = cart.map(({ _id, ...item }) => ({
      ...item,
      CustomerName: user.displayName,
      CustomerEmail: user.email,
      CustomerAddress: address,
      CustomerPhone: phone,
      status: 'ordered',
    }))
    console.log(orderItems)
    axios.post("https://loopmi-server.vercel.app/orders", orderItems)
    .then(res => {
      if (res.data.acknowledged) {  // Ensure response is valid before using it
        Swal.fire({
          title: "Order Confirmed!",
          text: "We will contact you soon.",
          icon: "success"
        });
        localStorage.removeItem('cart')
        setCart([])
        setCartCount(0);
      }
    })
    .catch(error => {
      console.error("Error placing order:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again!"
      });
    });
    
  };

  return (
    <div className="mt-20">
      <section className="text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute right-20 top-1/2 -z-10"></div>
          <div className="bg-color1 w-full opacity-30"></div>
          <div className="w-[100px] h-[200px] bg-color3 blur-[50px] rounded-full absolute right-20 top-32 -z-10"></div>
          <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute left-2 bottom-64 -z-10"></div>
        </div>

        <div className="max-w-screen-2xl relative z-10 flex flex-col justify-center items-center p-6 mx-auto sm:py-12 lg:py-12 lg:flex-row lg:justify-center">
          <div className="md:w-[90%] flex flex-col justify-center">
            <nav aria-label="breadcrumb" className="w-full text-gray-800">
              <ol className="flex h-8 space-x-2 text-gray-800">
                <li className="flex items-center">
                  <a href="#" className="flex items-center hover:underline">Home</a>
                </li>
                <li className="flex items-center space-x-1">
                  <span className="text-gray-600"><IoIosArrowForward /></span>
                  <a href="#" className="flex items-center px-1 capitalize hover:underline">Cart</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <div className={`max-w-screen-2xl ${cartCount < 3 ? "h-96" : "h-auto"} my-7 gap-7 mx-auto`}>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Product Name</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, index) => (
                <tr key={index}>
                  <th><h1>{index + 1}</h1></th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.photo} alt="Product Image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.location}</td>
                  <th>
                    <button onClick={() => handelremove(item)} className="btn btn-ghost btn-xs text-red-500">
                      Remove
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Product Name</th>
                <th>Location</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pay Button */}
        <div className="flex w-full justify-end">
          <button onClick={handelAdd} className="bg-color5 p-2 px-6 mt-10 text-white">Pay</button>
        </div>
      </div> 

      {/* ✅ Modal for Phone & Address */}
      {isModalOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enter Details</h2>
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label className="block mb-2">Address</label>
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 p-2 px-4 rounded-md text-white">Cancel</button>
              <button onClick={handleConfirmOrder} className="bg-blue-500 p-2 px-4 rounded-md text-white">Confirm Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
