import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorMainRef = useRef(null);
    const cursorAuraRef = useRef(null);

    useEffect(() => {
        const cursorMain = cursorMainRef.current;
        const cursorAura = cursorAuraRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Instantly move the main difference cursor
            gsap.set(cursorMain, {
                x: clientX,
                y: clientY,
            });

            // Smoothly animate the glowing aura
            gsap.to(cursorAura, {
                x: clientX,
                y: clientY,
                duration: 0.8,
                ease: "power3.out"
            });
        };

        const onMouseEnterLink = () => {
            // Main cursor expands significantly when hovering
            gsap.to(cursorMain, {
                scale: 3,
                duration: 0.3,
                ease: "back.out(1.5)"
            });
            // Aura gets brighter and slightly larger
            gsap.to(cursorAura, {
                scale: 2,
                opacity: 0.6,
                duration: 0.3
            });
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursorMain, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(cursorAura, {
                scale: 1,
                opacity: 0.25,
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        const addListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
                el.addEventListener('mouseenter', onMouseEnterLink);
                el.addEventListener('mouseleave', onMouseLeaveLink);
            });
        };

        addListeners();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    addListeners();
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    return (
        <div className="hidden md:block pointer-events-none">
            {/* The main inverse cursor */}
            <div 
                ref={cursorMainRef}
                className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ></div>
            
            {/* The solar flare aura */}
            <div 
                ref={cursorAuraRef}
                className="fixed top-0 left-0 w-32 h-32 rounded-full z-[9998] transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 blur-[30px] opacity-25"
            ></div>
        </div>
    );
};

export default CustomCursor;
