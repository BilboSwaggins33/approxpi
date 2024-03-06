import { ReactElement, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";


interface Description {
    description: string;
    title: string;
}

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export default function TitleContainer({description}: {
    description: Description
}) {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({target: ref});
    const y = useParallax(scrollYProgress, 100);

    return (
        <motion.div>
            <section className="headerTitle">
                <motion.h1
                    animate={{ scale: [1, 1.1, 1, 0.9, 1], rotate: [0, 120, -100, 60, 0], rotateX: [0, 120, -180, 0], color: ["#ff0080", "#00ff8c", "#7a00ff"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{y}}
                    className="mr-10"
                >
                    &pi;
                </motion.h1>
                <motion.h3 id="label" className="mt-[50px] mb-2" style={{y}}>
                    {description.title}
                    <p className="mt-2">{description.description}</p>
                </motion.h3>
            </section>
        </motion.div>

    );
}