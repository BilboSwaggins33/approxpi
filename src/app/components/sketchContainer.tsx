import "../../../public/stylesheets/styles.css";
import { ReactNode, useRef, ElementType, ReactElement } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

interface Description {
    description: string;
    title: string;
}

export default function SketchContainer({sketch, description}: {
    sketch: () => ReactElement,
    description: Description
}) {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({target: ref});
    const y = useParallax(scrollYProgress, 100);

    //let opacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.9, 1], [0, 1, 1, 1, 0]);

    return (
        <motion.div>
            <section>
                <div ref={ref}>
                    {sketch()}
                </div>
                <motion.h3 id="label" className="mt-[50px] mb-2" style={{y}}>
                    {description.title}
                    <p className="mt-2">{description.description}</p>
                </motion.h3>
            </section>
        </motion.div>

    );
}


