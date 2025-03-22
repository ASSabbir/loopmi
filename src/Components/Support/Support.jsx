import { useState, useContext } from 'react';
import { AuthContext } from '../Root/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaQuestion, FaEnvelope, FaHeadset, FaComments, FaBox, FaMoneyBillWave, FaUserCircle, FaShippingFast } from 'react-icons/fa';

const Support = () => {
    const { user } = useContext(AuthContext);
    const [ticketData, setTicketData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        subject: '',
        category: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('faq'); // 'faq' or 'contact'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData({
            ...ticketData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!ticketData.name || !ticketData.email || !ticketData.subject || !ticketData.category || !ticketData.message) {
            Swal.fire({
                title: "All fields are required",
                text: "Please complete all fields to submit your support request",
                icon: "warning",
                confirmButtonColor: "#5f9877",
            });
            return;
        }

        setLoading(true);
        
        try {
            // Replace with your actual API endpoint
            await axios.post('http://localhost:5000/support/ticket', {
                ...ticketData,
                userId: user?.uid || null,
                status: 'open',
                createdAt: new Date().toISOString()
            });
            
            Swal.fire({
                title: "Support Request Submitted!",
                text: "We'll get back to you as soon as possible",
                icon: "success",
                confirmButtonColor: "#5f9877",
            });
            
            // Reset form
            setTicketData({
                name: user?.displayName || '',
                email: user?.email || '',
                subject: '',
                category: '',
                message: ''
            });
            
        } catch (error) {
            console.error("Error submitting support ticket:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to submit your request. Please try again later.",
                icon: "error",
                confirmButtonColor: "#5f9877",
            });
        } finally {
            setLoading(false);
        }
    };

    // FAQ items organized by category
    const faqItems = {
        account: [
            {
                question: "How do I reset my password?",
                answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password."
            },
            {
                question: "How can I update my account information?",
                answer: "You can update your account information by navigating to the Profile page after logging in. Click the edit button next to the information you wish to update."
            },
            {
                question: "Is my personal information secure?",
                answer: "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information."
            }
        ],
        orders: [
            {
                question: "How can I track my order?",
                answer: "You can track your order by going to 'My Orders' in your account dashboard. Click on the specific order to see its current status and tracking information."
            },
            {
                question: "What should I do if my order is delayed?",
                answer: "If your order is delayed beyond the estimated delivery date, please contact our support team with your order number for assistance."
            },
            {
                question: "Can I modify or cancel my order?",
                answer: "You can cancel or modify your order within 1 hour of placing it. After that, please contact our support team to see if changes are still possible."
            }
        ],
        payments: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. For some regions, we also offer payment options like Apple Pay and Google Pay."
            },
            {
                question: "When will I be charged for my order?",
                answer: "You'll be charged for your order once it's confirmed and processed, typically within 24 hours of placing the order."
            },
            {
                question: "Is there a money-back guarantee?",
                answer: "Yes, we offer a 30-day money-back guarantee on most products. If you're not satisfied with your purchase, you can return it for a full refund."
            }
        ],
        shipping: [
            {
                question: "What are your shipping options?",
                answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and next-day delivery options depending on your location."
            },
            {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to most countries worldwide. International shipping times and costs vary by destination."
            },
            {
                question: "How do I return an item?",
                answer: "To return an item, go to 'My Orders', select the order containing the item, and click 'Return Item'. Follow the instructions to complete the return process."
            }
        ],
        products: [
            {
                question: "How can I tell if a product is in stock?",
                answer: "Product availability is shown on each product page. If an item is out of stock, you can sign up for notifications when it becomes available again."
            },
            {
                question: "Are your products new or refurbished?",
                answer: "LoopMi specializes in sustainable products. Items may be new, gently used, refurbished, or upcycled. The product condition is clearly stated on each listing."
            },
            {
                question: "What is your product quality guarantee?",
                answer: "All products on LoopMi are thoroughly checked for quality. We guarantee that items will arrive in the condition described in the listing or better."
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-12 mt-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-color6">Support Center</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Find answers to common questions or contact our support team
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Tabs */}
                <div className="tabs tabs-boxed bg-gray-100 mb-8 flex justify-center">
                    <a 
                        className={`tab tab-lg ${activeTab === 'faq' ? 'bg-color5 text-white' : ''}`}
                        onClick={() => setActiveTab('faq')}
                    >
                        <FaQuestion className="mr-2" /> FAQs
                    </a>
                    <a 
                        className={`tab tab-lg ${activeTab === 'contact' ? 'bg-color5 text-white' : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        <FaHeadset className="mr-2" /> Contact Support
                    </a>
                </div>

                {/* FAQ Section */}
                {activeTab === 'faq' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* FAQ Categories */}
                        <div className="space-y-6">
                            <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                                <div className="bg-color4/20 p-4">
                                    <h3 className="text-xl font-bold text-color6 flex items-center">
                                        <FaUserCircle className="mr-2 text-color5" /> Account & Profile
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {faqItems.account.map((item, index) => (
                                            <div key={index} className="collapse collapse-plus bg-base-100">
                                                <input type="checkbox" /> 
                                                <div className="collapse-title font-medium">
                                                    {item.question}
                                                </div>
                                                <div className="collapse-content"> 
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                                <div className="bg-color4/20 p-4">
                                    <h3 className="text-xl font-bold text-color6 flex items-center">
                                        <FaBox className="mr-2 text-color5" /> Orders
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {faqItems.orders.map((item, index) => (
                                            <div key={index} className="collapse collapse-plus bg-base-100">
                                                <input type="checkbox" /> 
                                                <div className="collapse-title font-medium">
                                                    {item.question}
                                                </div>
                                                <div className="collapse-content"> 
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                                <div className="bg-color4/20 p-4">
                                    <h3 className="text-xl font-bold text-color6 flex items-center">
                                        <FaMoneyBillWave className="mr-2 text-color5" /> Payments & Billing
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {faqItems.payments.map((item, index) => (
                                            <div key={index} className="collapse collapse-plus bg-base-100">
                                                <input type="checkbox" /> 
                                                <div className="collapse-title font-medium">
                                                    {item.question}
                                                </div>
                                                <div className="collapse-content"> 
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                                <div className="bg-color4/20 p-4">
                                    <h3 className="text-xl font-bold text-color6 flex items-center">
                                        <FaShippingFast className="mr-2 text-color5" /> Shipping & Returns
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {faqItems.shipping.map((item, index) => (
                                            <div key={index} className="collapse collapse-plus bg-base-100">
                                                <input type="checkbox" /> 
                                                <div className="collapse-title font-medium">
                                                    {item.question}
                                                </div>
                                                <div className="collapse-content"> 
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                                <div className="bg-color4/20 p-4">
                                    <h3 className="text-xl font-bold text-color6 flex items-center">
                                        <FaBox className="mr-2 text-color5" /> Products
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {faqItems.products.map((item, index) => (
                                            <div key={index} className="collapse collapse-plus bg-base-100">
                                                <input type="checkbox" /> 
                                                <div className="collapse-title font-medium">
                                                    {item.question}
                                                </div>
                                                <div className="collapse-content"> 
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-color2/20 rounded-lg text-center">
                                <h3 className="text-xl font-bold text-color6 mb-3">
                                    Still have questions?
                                </h3>
                                <p className="mb-4">Our support team is ready to assist you</p>
                                <button 
                                    className="btn bg-color5 hover:bg-color4 text-white border-none"
                                    onClick={() => setActiveTab('contact')}
                                >
                                    <FaHeadset className="mr-2" /> Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Support Section */}
                {activeTab === 'contact' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-base-100 rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold text-color6 mb-6">Submit a Support Ticket</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Your Name</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                value={ticketData.name} 
                                                onChange={handleChange} 
                                                placeholder="Your full name" 
                                                className="input input-bordered w-full" 
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email Address</span>
                                            </label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                value={ticketData.email} 
                                                onChange={handleChange} 
                                                placeholder="your.email@example.com" 
                                                className="input input-bordered w-full" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Subject</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="subject" 
                                            value={ticketData.subject} 
                                            onChange={handleChange} 
                                            placeholder="Brief description of your issue" 
                                            className="input input-bordered w-full" 
                                            required 
                                        />
                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category</span>
                                        </label>
                                        <select 
                                            name="category" 
                                            value={ticketData.category} 
                                            onChange={handleChange} 
                                            className="select select-bordered w-full" 
                                            required
                                        >
                                            <option value="" disabled>Select a category</option>
                                            <option value="account">Account Issues</option>
                                            <option value="orders">Order Issues</option>
                                            <option value="payment">Payment Issues</option>
                                            <option value="shipping">Shipping & Delivery</option>
                                            <option value="product">Product Questions</option>
                                            <option value="returns">Returns & Refunds</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Message</span>
                                        </label>
                                        <textarea 
                                            name="message" 
                                            value={ticketData.message} 
                                            onChange={handleChange} 
                                            className="textarea textarea-bordered h-40" 
                                            placeholder="Please describe your issue in detail, including any error messages or order numbers..." 
                                            required
                                        ></textarea>
                                    </div>
                                    
                                    <div className="form-control mt-6">
                                        <button 
                                            type="submit" 
                                            className="btn bg-gradient-to-r from-color4 to-color5 text-white border-none hover:from-color5 hover:to-color4"
                                            disabled={loading}
                                        >
                                            {loading ? 
                                                <span className="loading loading-spinner"></span> : 
                                                <><FaEnvelope className="mr-2" /> Submit Ticket</>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-base-100 rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold text-color6 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="text-color5 text-xl mt-1">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Email Support</h4>
                                            <p className="text-gray-600">support@loopmi.com</p>
                                            <p className="text-sm text-gray-500">Response time: 24-48 hours</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="text-color5 text-xl mt-1">
                                            <FaHeadset />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Phone Support</h4>
                                            <p className="text-gray-600">+1 (800) 123-4567</p>
                                            <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm EST</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="text-color5 text-xl mt-1">
                                            <FaComments />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Live Chat</h4>
                                            <p className="text-gray-600">Available on website</p>
                                            <p className="text-sm text-gray-500">Mon-Fri, 9am-7pm EST</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-color2/20 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-color6 mb-4">Support Hours</h3>
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span>Monday - Friday:</span>
                                        <span className="font-medium">9:00 AM - 8:00 PM EST</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Saturday:</span>
                                        <span className="font-medium">10:00 AM - 6:00 PM EST</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Sunday:</span>
                                        <span className="font-medium">Closed</span>
                                    </li>
                                </ul>
                                <div className="divider"></div>
                                <p className="text-sm text-gray-600">
                                    For urgent issues outside of business hours, please submit a ticket and we'll respond as soon as possible.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Support;