import React, { createContext, useRef } from 'react'

export const ScrollProvider = createContext();

const ScrollContext = (props) => {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const serviceRef = useRef(null);
    const testimonialRef = useRef(null);
    const gallaryRef = useRef(null);

    const scrollToView = (ref)=>{
        if(ref && ref.current){
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
  return (
    <ScrollProvider.Provider value={{homeRef, aboutRef, serviceRef, testimonialRef ,gallaryRef, scrollToView}}>
      {props.children}
    </ScrollProvider.Provider>
  )
}

export default ScrollContext