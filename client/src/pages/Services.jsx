import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  {
    title: "Financing",
    desc: "Easy EMI options to make solar affordable.",
    icon: "💳",
  },
  {
    title: "Battery Solutions",
    desc: "Store energy with advanced battery systems.",
    icon: "🔋",
  },
];

const images = [
  "skysolar/images/service1.png",
  "skysolar/images/service2.png",
  "skysolar/images/service3.png",
  "skysolar/images/service4.png",
  "skysolar/images/service5.png",
];

const Services = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const imageRef2 = useRef(null);
  const servicesRef = useRef([]);
  const serviceRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 10%",
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

        ScrollTrigger.create({
          trigger: serviceRef.current,
          start: "top top",
          end: "+=1000",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress; // 0 → 1

            const index = Math.floor(progress * images.length);
            const clampedIndex = Math.min(images.length - 1, index);

            setCurrentImage(clampedIndex);
          },
        });

        gsap.fromTo(
          servicesRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: serviceRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          },"a",
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
        },"a");
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(imageRef.current, { clearProps: "all" });
        gsap.set(servicesRef.current, { opacity: 1, y: 0 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen relative bg-black text-white overflow-x-hidden"
    >
      <div className="lg:h-[70vh] flex items-center lg:justify-end jusitify-start  lg:p-70 ">
        <span className="text-7xl lg:text-9xl w-[70vh]  font-bold sm:ml-20">
          What we offer?
        </span>
      </div>
      <div
        ref={imageRef}
        className="w-full hidden lg:block  lg:absolute h-[40vh] top-10 lg:w-[60%] lg:h-[70vh] p-10"
      >
        <img
          src="skysolar/images/service1.png"
          alt="Solar"
          className="w-full h-full object-contain"
        />
      </div>

      <div
        ref={serviceRef}
        className="w-full h-screen flex flex-col-reverse lg:pl-30 lg:flex-row lg:items-center lg:justify-between gap-10 mt-10"
      >
        <div className="flex flex-col justify-content">
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={(el) => (servicesRef.current[index] = el)}
              className="max-w-xl"
            >
              <div className="flex items-center text-xl lg:text-2xl font-bold">
                <span className="text-3xl mr-3">{service.icon}</span>
                {service.title}
              </div>

              <p className="text-gray-400 mt-2 ml-10">{service.desc}</p>
            </div>
          ))}
        </div>
        <div
          ref={imageRef2}
          className="w-full block lg:hidden h-[40vh] lg:w-[60%] lg:h-[70vh] "
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
