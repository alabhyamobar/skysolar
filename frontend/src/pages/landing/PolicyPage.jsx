import { Helmet } from "react-helmet-async";

export default function PolicyPage() {
    return (
        <>
            <Helmet>
                <html lang="en" />

                <title>
                    Privacy Policy | Sky Renewable Energy
                </title>

                <meta
                    name="description"
                    content="Read the Privacy Policy of Sky Renewable Energy. Learn how we collect, use, store, and protect your personal information when using our website and services."
                />

                <meta
                    name="keywords"
                    content="Sky Renewable Energy, Privacy Policy, Solar Company India, Data Protection, Solar Installation, Renewable Energy"
                />

                <meta
                    name="robots"
                    content="index, follow"
                />

                <meta
                    name="author"
                    content="Sky Renewable Energy"
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                {/* Canonical URL */}
                <link
                    rel="canonical"
                    href="https://www.skyrenewableenergy.in/privacy-policy"
                />

                {/* Open Graph */}
                <meta
                    property="og:type"
                    content="website"
                />

                <meta
                    property="og:title"
                    content="Privacy Policy | Sky Renewable Energy"
                />

                <meta
                    property="og:description"
                    content="Learn how Sky Renewable Energy collects, uses, stores, and protects your personal information."
                />

                <meta
                    property="og:url"
                    content="https://www.skyrenewableenergy.in/privacy-policy"
                />

                <meta
                    property="og:site_name"
                    content="Sky Renewable Energy"
                />

                <meta
                    property="og:image"
                    content="https://www.skyrenewableenergy.in/og-image.jpg"
                />

                {/* Twitter */}
                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />

                <meta
                    name="twitter:title"
                    content="Privacy Policy | Sky Renewable Energy"
                />

                <meta
                    name="twitter:description"
                    content="Read the Privacy Policy of Sky Renewable Energy."
                />

                <meta
                    name="twitter:image"
                    content="https://www.skyrenewableenergy.in/og-image.jpg"
                />
            </Helmet>

            <section className="min-h-screen bg-[#070B14] text-white py-28 relative overflow-hidden">

                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
          linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
        `,
                            backgroundSize: "80px 80px",
                        }}
                    />

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#E8A56A]/10 blur-[180px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6">

                    {/* Heading */}

                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#E8A56A] mr-2" />
                        <span className="uppercase tracking-[3px] text-sm font-semibold text-[#E8A56A]">
                            Legal
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase mt-8 leading-none">
                        Privacy
                        <span className="block text-[#E8A56A] mt-2">
                            Policy
                        </span>
                    </h1>

                    <p className="mt-8 text-gray-400 text-lg leading-8 max-w-3xl">
                        At Sky Renewable Energy, protecting your personal information is one of
                        our highest priorities. This Privacy Policy explains how we collect,
                        use, store, and safeguard the information you provide when using our
                        website and services.
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                        Last Updated: July 26, 2026
                    </p>

                    {/* Content */}

                    <div className="mt-16 space-y-8">

                        {[
                            {
                                title: "1. Information We Collect",
                                body:
                                    "We may collect your name, email address, phone number, project details, and any information you voluntarily submit through our contact forms. We may also collect technical information such as your browser type, IP address, device information, pages visited, and cookies to improve website performance."
                            },
                            {
                                title: "2. How We Use Your Information",
                                body:
                                    "Your information is used to respond to enquiries, prepare quotations, schedule consultations, deliver our services, improve our website, communicate project updates, comply with legal obligations, and prevent fraudulent activities."
                            },
                            {
                                title: "3. Cookies & Analytics",
                                body:
                                    "Our website may use cookies and analytics tools such as Google Analytics to improve website functionality, understand visitor behavior, and enhance user experience. You can disable cookies through your browser settings at any time."
                            },
                            {
                                title: "4. Information Sharing",
                                body:
                                    "We never sell, rent, or trade your personal information. Information is shared only with trusted partners who assist in operating our business or when required by law."
                            },
                            {
                                title: "5. Data Security",
                                body:
                                    "We implement industry-standard security measures including encrypted communication, secure hosting infrastructure, controlled access, and regular security updates to protect your personal information."
                            },
                            {
                                title: "6. Third-Party Services",
                                body:
                                    "Our website may include links or integrations with third-party services such as Google Maps and social media platforms. Their privacy practices are governed by their respective privacy policies."
                            },
                            {
                                title: "7. Your Rights",
                                body:
                                    "You may request access to your personal information, request corrections, request deletion where legally applicable, or withdraw your consent by contacting us."
                            },
                            {
                                title: "8. Children's Privacy",
                                body:
                                    "Our services are intended for individuals aged 18 years or older. We do not knowingly collect personal information from children."
                            },
                            {
                                title: "9. Policy Updates",
                                body:
                                    "This Privacy Policy may be updated periodically to reflect changes in our services, legal requirements, or security practices. The latest version will always be available on this page."
                            },
                            {
                                title: "10. Contact Information",
                                body:
                                    "If you have any questions regarding this Privacy Policy or your personal information, please contact Sky Renewable Energy at skyrenewableenergies@gmail.com or call +91 8009998980."
                            }
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="group relative border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 hover:border-[#E8A56A]/50 transition-all duration-500"
                            >
                                <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#E8A56A] group-hover:w-full transition-all duration-700" />

                                <h2 className="text-2xl font-bold text-[#E8A56A] mb-5">
                                    {item.title}
                                </h2>

                                <p className="text-gray-300 leading-8">
                                    {item.body}
                                </p>
                            </div>
                        ))}

                        <div className="border border-[#E8A56A]/30 bg-[#E8A56A]/5 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#E8A56A] mb-4">
                                Your Consent
                            </h2>

                            <p className="text-gray-300 leading-8">
                                By accessing or using the Sky Renewable Energy website, submitting
                                an enquiry, requesting a quotation, or communicating with us, you
                                acknowledge that you have read, understood, and agreed to this
                                Privacy Policy and consent to the collection and processing of your
                                information as described above.
                            </p>
                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}