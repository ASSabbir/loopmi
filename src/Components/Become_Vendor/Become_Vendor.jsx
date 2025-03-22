import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Root/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { TiTick } from "react-icons/ti";

// Image for vendor application page
const vendorImg = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80";


const Become_Vendor = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        businessAddress: '',
        businessType: '',
        phoneNumber: '',
        taxId: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            Swal.fire({
                title: "Please login first!",
                text: "You need to be logged in to apply as a vendor",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5f9877",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        setLoading(true);
        
        try {
            const vendorData = {
                ...formData,
                email: user.email,
                name: user.displayName,
                userId: user.uid,
                status: 'pending',
                appliedDate: new Date().toISOString()
            };

            const response = await axios.post('http://localhost:5000/vendor/apply', vendorData);
            
            if (response.data.success) {
                Swal.fire({
                    title: "Application Submitted!",
                    text: "We'll review your application and get back to you soon",
                    icon: "success",
                    confirmButtonColor: "#5f9877",
                });
                navigate('/profile');
            }
        } catch (error) {
            console.error("Error submitting vendor application:", error);
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonColor: "#5f9877",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 mt-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-color6 mb-4">Become a Vendor on LoopMi</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Join our community of sustainable sellers and help give pre-loved items a second life
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <img 
                            src={vendorImg} 
                            alt="Become a Vendor" 
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-color5 mb-6">Why Sell on LoopMi?</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-color5 text-xl">
                                    <TiTick />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl">Reach Eco-Conscious Buyers</h3>
                                    <p className="text-gray-600">Connect with customers who value sustainability and reuse.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-color5 text-xl">
                                    <TiTick />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl">Simple & Affordable</h3>
                                    <p className="text-gray-600">Low commission fees and easy-to-use seller dashboard.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-color5 text-xl">
                                    <TiTick />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl">Support & Resources</h3>
                                    <p className="text-gray-600">Get help with listing, shipping and growing your business.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-color5 text-xl">
                                    <TiTick />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl">Make an Impact</h3>
                                    <p className="text-gray-600">Help reduce waste and promote a circular economy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-base-100 rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-color5 mb-8">Vendor Application</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Business Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    placeholder="Your business name" 
                                    className="input input-bordered focus:border-color5" 
                                    required 
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Business Address</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="businessAddress"
                                    value={formData.businessAddress}
                                    onChange={handleChange}
                                    placeholder="Your business address" 
                                    className="input input-bordered focus:border-color5" 
                                    required 
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Business Type</span>
                                </label>
                                <select 
                                    name="businessType"
                                    value={formData.businessType}
                                    onChange={handleChange}
                                    className="select select-bordered w-full focus:border-color5" 
                                    required
                                >
                                    <option value="" disabled>Select business type</option>
                                    <option value="Individual">Individual Seller</option>
                                    <option value="Small Business">Small Business</option>
                                    <option value="Retail Store">Retail Store</option>
                                    <option value="Thrift Shop">Thrift Shop</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Phone Number</span>
                                </label>
                                <input 
                                    type="tel" 
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Your phone number" 
                                    className="input input-bordered focus:border-color5" 
                                    required 
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Tax ID (optional)</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="taxId"
                                    value={formData.taxId}
                                    onChange={handleChange}
                                    placeholder="Your tax ID or business registration number" 
                                    className="input input-bordered focus:border-color5" 
                                />
                            </div>
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Tell us about your business</span>
                            </label>
                            <textarea 
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="textarea textarea-bordered h-32 focus:border-color5" 
                                placeholder="What kind of products do you plan to sell? Tell us about your experience and why you want to join LoopMi."
                                required
                            ></textarea>
                        </div>
                        
                        <div className="form-control mt-8">
                            <button 
                                type="submit" 
                                className="btn bg-gradient-to-r from-color4 to-color5 text-white border-none hover:from-color5 hover:to-color4"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Submit Application"}
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="mt-16 bg-color2/20 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-color6 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="collapse collapse-plus bg-base-100 rounded-box">
                            <input type="checkbox" /> 
                            <div className="collapse-title text-lg font-medium">
                                How long does the approval process take?
                            </div>
                            <div className="collapse-content"> 
                                <p>We typically review and process vendor applications within 2-3 business days. You&apos;ll receive an email notification once your application has been reviewed.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 rounded-box">
                            <input type="checkbox" /> 
                            <div className="collapse-title text-lg font-medium">
                                What are the fees for selling on LoopMi?
                            </div>
                            <div className="collapse-content"> 
                                <p>LoopMi charges a 10% commission on each sale. There are no listing fees or monthly subscription costs.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 rounded-box">
                            <input type="checkbox" /> 
                            <div className="collapse-title text-lg font-medium">
                                How do I get paid for my sales?
                            </div>
                            <div className="collapse-content"> 
                                <p>Once a sale is completed and the buyer confirms receipt, the payment will be processed within 3 business days to your connected bank account or payment method.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 rounded-box">
                            <input type="checkbox" /> 
                            <div className="collapse-title text-lg font-medium">
                                What types of products can I sell?
                            </div>
                            <div className="collapse-content"> 
                                <p>LoopMi focuses on pre-loved, recycled, refurbished, and upcycled items. We welcome a wide range of categories including electronics, fashion, home goods, and more. All items must be in good working condition.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Become_Vendor;