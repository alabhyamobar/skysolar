import React, { useEffect, useRef, useState, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollProvider } from "../Context/ScrollContext";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Residential Solar",
    desc: "Install rooftop solar systems for homes and reduce electricity bills.",
    icon: "🏠",
  },
  {
    title: "Commercial Solar",
    desc: "Custom solar solutions for businesses and industries.",
    icon: "🏢",
  },
  {
    title: "Subsidy Assistance",
    desc: "We help you apply for government subsidies.",
    icon: "💰",
  },
  {
    title: "Installation (EPC)",
    desc: "End-to-end solar installation with high-quality components.",
    icon: "🔧",
  },
  {
    title: "Maintenance",
    desc: "Servicing and monitoring for maximum efficiency.",
    icon: "🛠️",
  },
];

const images = [
  `${import.meta.env.BASE_URL}/images/service1.png`,
  `${import.meta.env.BASE_URL}/images/service2.png`,
  `${import.meta.env.BASE_URL}/images/service3.png`,
  `${import.meta.env.BASE_URL}/images/service4.png`,
  `${import.meta.env.BASE_URL}/images/service5.png`,
];

const Services = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const imageRef2 = useRef(null);
  const { serviceRef } = useContext(ScrollProvider);
  const servicesItemsRef = useRef([]);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "top -40%",
            scrub: true,
          },
        });

        tl.to(imageRef.current, {
          y: "80vh",
          x: "41vw",
          display: "none",
          ease: "power3.inOut",
        });

        servicesItemsRef.current.forEach((el, index) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentImage(index),
            onEnterBack: () => setCurrentImage(index),
          });
        });

        gsap.fromTo(
          servicesItemsRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            stagger: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: serviceRef.current,
              start: "top 40%",
              end: "bottom center",
              scrub: true,
            },
          }
        );

        gsap.to(imageRef2.current, {
          display: "block",
          ease: "power3.out",
          scrollTrigger: {
            trigger: serviceRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(imageRef.current, { clearProps: "all" });

        ScrollTrigger.create({
          trigger: serviceRef.current,
          start: "top 5%",
          end: "bottom center",
          pin: true,
          scrub: 2,
        });

        servicesItemsRef.current.forEach((el, index) => {
          const isEven = index % 2 === 0;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 60%",
              end: "top 40%",
              scrub: 1.2,
            },
          });

          tl.fromTo(
            el,
            {
              opacity: 0,
              x: isEven ? 80 : -80,
            },
            {
              opacity: 1,
              x: 0,
              ease: "power3.out",
            }
          );

          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentImage(index),
            onEnterBack: () => setCurrentImage(index),
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [serviceRef]);

  return (
    <div
      ref={containerRef}
      className="w-screen relative bg-black text-white overflow-x-hidden"
    >

      <div className="lg:h-[70vh] flex items-center lg:justify-end justify-start lg:p-70 mb-10">
        <span className="text-7xl lg:text-9xl w-[70vh] font-bold lg:p-0 p-5">
          What we offer?
        </span>
      </div>

      <div
        ref={imageRef}
        className="w-full hidden lg:block lg:absolute h-[40vh] top-10 lg:w-[60%] lg:h-[70vh] p-10"
      >
        <img
          src={images[0]}
          alt="Solar"
          className="w-full h-full object-contain"
        />
      </div>
      <div
        ref={serviceRef} 
        className="w-full h-screen flex flex-col-reverse lg:pl-30 lg:flex-row lg:items-center lg:justify-between gap-10"
      >
        <div className="flex flex-col justify-content h-[70vh]">
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={(el) => (servicesItemsRef.current[index] = el)}
              className="max-w-xl"
            >
              <div className="flex items-center text-xl lg:text-2xl font-bold">
                <span className="text-3xl mr-3">{service.icon}</span>
                {service.title}
              </div>

              <p className="text-gray-400 mt-2 ml-10 w-[80%]">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={imageRef2}
          className="w-full block mt-2 lg:hidden h-[40vh] lg:w-[60%] lg:h-[70vh]"
        >
          <img
            src={images[currentImage]}
            alt="Solar"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;