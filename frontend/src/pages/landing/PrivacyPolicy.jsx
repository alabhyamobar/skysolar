import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const viewportOptions = {
    once: true,
    amount: 0.2,
};

const sections = [
    {
        title: "1. Introduction",
        content: [
            "Welcome to Sky Renewable Energy. We respect your privacy and are committed to protecting the personal information you share with us.",
            "This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or communicate with us.",
        ],
    },
    {
        title: "2. Information We Collect",
        content: [
            "Full Name",
            "Email Address",
            "Phone Number",
            "Project or property details you provide",
            "Messages submitted through our contact form",
            "Technical information such as browser type, device information, IP address, and website usage statistics.",
        ],
    },
    {
        title: "3. How We Use Your Information",
        content: [
            "Respond to your enquiries and consultation requests.",
            "Provide quotations and project estimates.",
            "Improve our products, services, and customer support.",
            "Communicate important project updates.",
            "Comply with legal obligations.",
            "Prevent fraud or misuse of our services.",
        ],
    },
    {
        title: "4. Cookies & Analytics",
        content: [
            "Our website may use cookies to improve your browsing experience.",
            "Cookies help us understand how visitors use our website and enable us to improve website performance.",
            "We may use analytics tools such as Google Analytics to understand visitor behavior.",
        ],
    },
    {
        title: "5. Information Sharing",
        content: [
            "We never sell your personal information.",
            "We may share information only with trusted service providers who help us operate our business.",
            "Information may also be disclosed when required by law or government authorities.",
        ],
    },
    {
        title: "6. Data Security",
        content: [
            "We implement appropriate administrative, technical, and physical security measures to protect your personal information.",
            "Although we strive to use commercially acceptable methods to protect your data, no method of transmission over the Internet is completely secure.",
        ],
    },
    {
        title: "7. Third-Party Services",
        content: [
            "Our website may include Google Maps, social media links, or links to third-party websites.",
            "Those websites have their own privacy policies, and we are not responsible for their practices.",
        ],
    },
    {
        title: "8. Your Rights",
        content: [
            "You may request access to your personal information.",
            "You may request correction of inaccurate information.",
            "You may request deletion of your information where legally permitted.",
            "You may withdraw your consent to communication at any time.",
        ],
    },
    {
        title: "9. Data Retention",
        content: [
            "We retain personal information only for as long as necessary to provide our services, fulfill legal obligations, resolve disputes, and enforce our agreements.",
        ],
    },
    {
        title: "10. Children's Privacy",
        content: [
            "Our services are not intended for individuals under 18 years of age.",
            "We do not knowingly collect personal information from children.",
        ],
    },
    {
        title: "11. Changes to this Policy",
        content: [
            "We may update this Privacy Policy from time to time.",
            "Any changes will be posted on this page with the updated revision date.",
        ],
    },
    {
        title: "12. Contact Us",
        content: [
            "Sky Renewable Energy",
            "Email: skyrenewableenergies@gmail.com",
            "Phone: +91 8009998980",
            "Location: Prayagraj, Uttar Pradesh, India",
        ],
    },
];

export default function PrivacyPolicy({ onAccept }) {
    const [checked, setChecked] = useState(false);
    const [closing, setClosing] = useState(false);

    const handleContinue = () => {
        if (!checked) return;

        setClosing(true);

        setTimeout(() => {
            onAccept();
        }, 500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
        >
            <div className="w-full max-w-2xl border border-white/10 bg-[#0B111D]/95 backdrop-blur-xl rounded-2xl overflow-hidden">

                {/* Gold Line */}
                <div className="h-[3px] bg-[#E8A56A]" />

                <div className="p-8">

                    <span className="text-[#E8A56A] uppercase tracking-[3px] text-xs font-semibold">
                        Privacy Notice
                    </span>

                    <h2 className="text-4xl font-black mt-4">
                        Your Privacy Matters
                    </h2>

                    <p className="mt-6 text-gray-400 leading-8">
                        We collect only the information you voluntarily provide, such as
                        your name, email address, phone number, and project details. This
                        information is used solely to respond to enquiries, prepare
                        quotations, and provide our solar solutions.
                    </p>

                    <div className="mt-8 space-y-4 text-gray-300">

                        <div className="flex gap-3">
                            <span className="text-[#E8A56A]">✓</span>
                            <span>We never sell your personal data.</span>
                        </div>

                        <div className="flex gap-3">
                            <span className="text-[#E8A56A]">✓</span>
                            <span>Your information is securely stored.</span>
                        </div>

                        <div className="flex gap-3">
                            <span className="text-[#E8A56A]">✓</span>
                            <span>Cookies may be used to improve website performance.</span>
                        </div>

                        <div className="flex gap-3">
                            <span className="text-[#E8A56A]">✓</span>
                            <span>
                                Read our complete{" "}
                                <a
                                    href="/privacy-policy"
                                    target="_blank"
                                    className="text-[#E8A56A] underline"
                                >
                                    Privacy Policy
                                </a>.
                            </span>
                        </div>

                    </div>

                    <label className="flex items-start gap-3 mt-10 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            className="accent-[#E8A56A] mt-1"
                        />

                        <span className="text-sm text-gray-400">
                            I have read and agree to the Privacy Policy and consent to the
                            processing of my information.
                        </span>
                    </label>

                    <button
                        disabled={!checked}
                        onClick={handleContinue}
                        className="mt-8 w-full bg-[#E8A56A] py-4 text-black font-black uppercase tracking-wider disabled:opacity-40 hover:scale-[1.02] transition"
                    >
                        Agree & Continue
                    </button>

                </div>
            </div>
        </motion.div>
    );
}