import React from 'react';

const About = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden py-20 px-6 lg:px-16">
            {/* Background glowing effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-teal-500/10 blur-[120px]"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-yellow-500/10 blur-[120px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Text Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                        <span className="text-teal-400 font-semibold tracking-wider text-xs sm:text-sm uppercase">About Sky Renewable Energies</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                        Harness the Power of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Sun</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                        We are committed to illuminating your world with clean, sustainable, and highly efficient solar energy. 
                        Whether for your home or your business, Sky Renewable Energies delivers state-of-the-art solar installations tailored to your unique energy needs.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group cursor-default shadow-xl">
                            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                                <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Domestic Installations</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Empower your home with energy independence and significantly reduce utility bills with our elegant residential solar systems.</p>
                        </div>
                        
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group cursor-default shadow-xl">
                            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                                <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Commercial Solutions</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Boost your bottom line and corporate sustainability with our scalable, high-yield commercial solar panel installations.</p>
                        </div>
                    </div>
                </div>

                {/* Visual Graphic */}
                <div className="relative w-full h-[500px] lg:h-[650px] rounded-[2.5rem] overflow-hidden group border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 pointer-events-none"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop" 
                        alt="Solar Panels at Sunset" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                            <div className="flex items-center space-x-5">
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">10+</div>
                                <div className="text-sm text-slate-200 font-medium tracking-wide">
                                    <span className="block text-white font-bold text-base">Years of Experience</span>
                                    in Solar Excellence
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;