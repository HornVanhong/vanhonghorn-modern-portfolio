import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;

    // Center the cursor dot on the mouse pointer
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!hover) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    const dataCursorElements = document.querySelectorAll("[data-cursor]");

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();

      if (target.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        hover = true;
        
        // Remove offset percentage and align to the boundary of the social button
        gsap.to(cursor, {
          x: rect.left,
          y: rect.top,
          xPercent: 0,
          yPercent: 0,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto"
        });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
      }
      if (target.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
      
      // Return percentage offsets to center the cursor on mouse pointer
      gsap.to(cursor, {
        xPercent: -50,
        yPercent: -50,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    dataCursorElements.forEach((item) => {
      item.addEventListener("mouseover", handleMouseOver as EventListener);
      item.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      dataCursorElements.forEach((item) => {
        item.removeEventListener("mouseover", handleMouseOver as EventListener);
        item.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
