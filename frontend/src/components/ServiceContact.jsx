import React , {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { X } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ServiceContact = ({ prop , service, onClose }) => {
    const API_URL = import.meta.env.VITE_API_URL
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState(service)

    useEffect(() => {
        setMessage(service);
    }, [service]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/user/query`,
        {
          userName: name,
          Email: email,
          PhoneNumber: phone,
          Message: message || undefined,
        }
      );

      toast.success(response.data.message);

      setName("");
      setEmail("");
      setPhone("");
      if (onClose) onClose();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

    return (
        <AnimatePresence>
            {prop && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="relative border w-full max-w-md rounded-xl border-white/10 bg-[#050914] p-8 sm:p-10 shadow-2xl"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-bold mb-2 text-white">
                            Request Consultation
                        </h3>
                        <p className="text-gray-400 mb-8 text-sm">
                            {service ? `Interested in ${service}? Let's talk.` : "Fill out the form below and we'll get back to you."}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Full Name"
                                required
                                className="w-full bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-[#E8A56A] transition-all text-white rounded-md"
                            />

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-[#E8A56A] transition-all text-white rounded-md"
                            />

                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                placeholder="Phone Number"
                                required
                                className="w-full bg-white/5 border border-white/10 px-5 py-4 outline-none focus:border-[#E8A56A] transition-all text-white rounded-md"
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#E8A56A] text-black py-4 font-black uppercase tracking-wider hover:scale-[1.02] transition-all duration-300 rounded-md mt-4"
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ServiceContact;
