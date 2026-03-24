import React, { useState } from 'react'

const NAV = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 py-3">

      {/* Main Bar */}
      <div className="
        max-w-6xl mx-auto
        flex items-center justify-between
        px-4 py-3
        rounded-2xl
        bg-white/10
        backdrop-blur-md
        border border-white/20
        shadow-lg
      ">

        <h1 className="text-white text-lg md:text-xl font-semibold">
          SKY Renewable Energy
        </h1>

        <div className="hidden md:flex gap-6 text-white/80">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Services</a>
          <a href="#" className="hover:text-white transition">Calculator</a>
        </div>

        <button className="
          hidden md:block
          px-4 py-2 rounded-xl
          bg-white/20 hover:bg-white/30
          text-white transition
        ">
          Contact us
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden
        mt-2
        mx-auto max-w-6xl
        overflow-hidden
        transition-all duration-300
        ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="
          flex flex-col gap-4
          px-4 py-4
          rounded-2xl
          bg-white/10
          backdrop-blur-md
          border border-white/20
          shadow-lg
          text-white
        ">
          <a href="#" onClick={()=>setOpen(false)}>About</a>
          <a href="#" onClick={()=>setOpen(false)}>Services</a>
          <a href="#" onClick={()=>setOpen(false)}>Solar Calculator</a>

          <button className="
            mt-2 px-4 py-2 rounded-xl
            bg-white/20 hover:bg-white/30
          ">
            Contact Us
          </button>
        </div>
      </div>

    </div>
  )
}

export default NAV