import React, { useRef, useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin,  FaLocationDot, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {
    const [content, setContent] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Mapping EmailJS names to state keys
        const stateKeys = {
            from_name: 'name',
            from_email: 'email',
            from_subject: 'subject',
            message: 'message'
        };

        const stateKey = stateKeys[name];

        setContent((prevContent) => ({
            ...prevContent,
            [stateKey]: value
        }));
    };

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);

        emailjs
            .sendForm('service_fsjbhwa', 'template_u6799yf', form.current, {
                publicKey: 'cQy9gREYWZVfcP4P7',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    toast.success('Message Sent Successfully', {
                        style: {
                            borderRadius: '10px',
                            background: '#000000',
                            color: '#fff',
                            border: '1px solid #21944b'
                          },
                    })
                    // Reset form fields
                    setContent({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                    });
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    toast.error('Failed to send message. Please try again.', {
                        style: {
                            borderRadius: '10px',
                            background: '#000000',
                            color: '#fff',
                            border: '1px solid #ef4444'
                          },
                    });
                }
            )
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="py-16 px-5 md:px-24 flex justify-center items-center" id='Contact'>
            <div className="w-full md:w-[60%]">
                <h3 className="text-green uppercase text-center pb-5">Contact Me</h3>
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="w-full flex flex-col gap-5 justify-center items-center"
                >
                    <div className="flex flex-col w-full">
                        <label htmlFor="name">Your Name</label>
                        <input
                            value={content.name}
                            onChange={handleChange}
                            type="text"
                            required
                            id="name"
                            name="from_name" // EmailJS name attribute
                            className="bg-white/10 rounded-md h-12"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email">Email Address</label>
                        <input
                            value={content.email}
                            onChange={handleChange}
                            type="email"
                            required
                            id="email"
                            name="from_email" // EmailJS name attribute
                            className="bg-white/10 rounded-md h-12"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="subject">Subject</label>
                        <input
                            value={content.subject}
                            onChange={handleChange}
                            type="text"
                            required
                            id="subject"
                            name="from_subject" // EmailJS name attribute
                            className="bg-white/10 rounded-md h-12"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message" // EmailJS name attribute
                            value={content.message}
                            onChange={handleChange}
                            required
                            id="message"
                            rows={5}
                            className="bg-white/10 rounded-md"
                            disabled={isLoading}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`font-bold px-10 py-4 rounded-lg transition-all duration-200 ${
                            isLoading 
                                ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                                : 'bg-green text-black cursor-pointer hover:scale-105'
                        }`}
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
                <div className="flex flex-col justify-center items-center pt-10">
                    <p className="connect">Connect with me</p>
                    <div className="flex gap-10 text-4xl py-5">
                        <a
                            href="https://x.com/StudioChaz?s=08"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 sm:p-5 bg-green icon rounded-full text-black"
                        >
                            <FaXTwitter />
                        </a>
                        <a
                            href="https://ng.linkedin.com/in/chidera-nwosu-383539228"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 sm:p-5 bg-green icon rounded-full text-black"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://github.com/NwosuTy"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 sm:p-5 bg-green icon rounded-full text-black"
                        >
                            <FaGithub />
                        </a>
                         <a
                            href="https://www.youtube.com/@DevConceited"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 sm:p-5 bg-green icon rounded-full text-black"
                        >
                            <FaYoutube />
                        </a>
                        
                    </div>
                    <div className="">
                        <p className='flex gap-5 items-center justify-center'>
                            <span className='bg-green p-2 rounded-full text-black'><FaEnvelope/></span>
                            <span>tthompson3012@gmail.com</span>
                        </p>
                        <p className='flex gap-5 items-center justify-center'>
                            <span className='bg-green p-2 rounded-full text-black'><FaLocationDot/></span>
                            <span>Lagos, Nigeria</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;