import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import img1 from '../../assets/undraw_contract_upwc.png';
import png1 from '../../assets/e-01.png';
import png2 from '../../assets/Untitled-2-01.png';
import png3 from '../../assets/c-01.png';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

export const ContactUs = () => {
    const form = useRef();
    const [imageUrl, setImageUrl] = useState("");

    // Handle Image Upload to ImgBB
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("https://api.imgbb.com/1/upload?key=7184d4d0cc210ac09f545d7688fa5876", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setImageUrl(data.data.url); // Set the image URL
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    // Send Email using EmailJS
    const sendEmail = (e) => {
        e.preventDefault();

        if (!imageUrl) {
            Swal.fire({
                title: "Image Upload Required",
                text: "Please wait for the image to upload before sending.",
                icon: "warning",
            });
            return;
        }

        // Extract form values manually
        const formData = {
            user_name: form.current.user_name.value,
            user_email: form.current.user_email.value,
            user_categoris: form.current.user_categoris.value,
            message: form.current.message.value,
            image_url: imageUrl, // Pass the uploaded image URL
        };

        emailjs
            .send('service_7t0yshj', 'template_cxusvkk', formData, 'siVG8IMv9HLqNG40E')
            .then(() => {
                Swal.fire({
                    title: "Message Sent!",
                    text: "Thank you for reaching out. We'll get back to you soon.",
                    icon: "success",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                form.current.reset();
                setImageUrl(""); // Reset image URL after sending
            })
            .catch((error) => {
                console.log('FAILED...', error.text);
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
                    <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-white text-gray-800">
                        <div className="flex flex-col justify-between">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let's talk!</h2>
                                <p className="text-gray-500">
                                    Have questions or need assistance? We're here to help! Reach out to us via phone, email, or our contact form.
                                </p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <img src={img1} alt="Contact" className="p-6 w-72" />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="text-sm">Full Name</label>
                                <input type="text" name="user_name" className="w-full p-3 rounded bg-gray-100" required />
                            </div>

                            <div>
                                <label htmlFor="user_categoris" className="text-sm">Type of Inquiry</label>
                                <select name="user_categoris" className="w-full p-3 rounded bg-gray-100">
                                    <option value="general">Issue with Payment</option>
                                    <option value="support">Seller Dispute</option>
                                    <option value="business">Technical Issue</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="email" className="text-sm">Email</label>
                                <input type="email" name="user_email" className="w-full p-3 rounded bg-gray-100" required />
                            </div>

                            <div>
                                <label htmlFor="message" className="text-sm">Message</label>
                                <textarea name="message" rows="3" className="w-full p-3 rounded bg-gray-100" required></textarea>
                            </div>

                            <div>
                                <label htmlFor="photo" className="text-sm">Screenshot of Problems</label>
                                <input 
                                    type="file" 
                                    name='photo'
                                    onChange={(e) => handleImageUpload(e.target.files[0])}
                                    className="file-input file-input-ghost" 
                                    required 
                                />
                            </div>
                            
                            {imageUrl && <p className="text-sm text-green-500">Image uploaded successfully!</p>}
                            
                            <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-color5 text-gray-50">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Floating Animated Images */}
                <motion.img
                    src={png1}
                    alt=""
                    className="w-32 absolute bottom-40 left-10"
                    animate={{ rotate: [0, 360], y: [0, -100, 0, 100, 0] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                />
                <motion.img
                    src={png2}
                    className="w-20 absolute top-40 right-10"
                    animate={{ rotate: [0, 360], y: [0, -100, 0, 100, 0] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                />
                <motion.img
                    src={png3}
                    className="w-32 absolute bottom-0 right-40"
                    animate={{ rotate: [0, 360], x: [0, -100, 0, 100, 0] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                />
            </section>
        </div>
    );
};

export default ContactUs;
