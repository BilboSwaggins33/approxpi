"use client";

import { MonteCarloSketch } from "@/app/sketches/monte_carlo";
import { PolygonSketch } from "@/app/sketches/polygon";
import { BlocksSketch } from "@/app/sketches/blocks";
import { BuffonsNeedlesSketch } from "@/app/sketches/buffons_needles";
import { SquarePackingSketch } from "@/app/sketches/square_packing";
import { MandelbrotSketch } from "@/app/sketches/mandelbrot";
import { SpirographSketch } from "@/app/sketches/spirograph";

import { motion, useScroll, useSpring } from "framer-motion";
import SketchContainer from "@/app/components/sketchContainer";
import { Footer } from "@/app/components/footer";
import { descriptions } from "@/app/components/descriptions";
import { Navigation } from "@/app/components/navigation";
import TitleContainer from "@/app/components/titleContainer";


export default function Home() {
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 30,
        restDelta: 0.1
    });


    //Monte Carlo DONE
    //buffon's needle DONE
    //archimedes approx DONE
    //sliding blocks DONE
    //square packing DONE
    //mandelbrot DONE
    //spirograph DONE
    //mobius transformation

    let sketches = [
        MonteCarloSketch,
        BuffonsNeedlesSketch,
        PolygonSketch,
        BlocksSketch,
        SquarePackingSketch,
        MandelbrotSketch,
        SpirographSketch
    ];


    const titleDesc = {
        title: "This is about ~ pi.",
        description: "Epic, unnecessary methods to calculate our favorite number! Let's get started, shall we?"
    };

    const conclusionDesc = {
        title: "That's all, folks!",
        description: "I hoped you enjoyed some pi today 🥧. Visualizations were made with the p5.js library. " +
            "Feel free to check out the source code on Github by clicking the footer!"
    }

    return (
        <div className="flex flex-col items-center">

            <TitleContainer description={titleDesc}/>

            <>
                {sketches.map((sketch, idx) => (
                    <SketchContainer key={idx} sketch={sketch} description={descriptions[idx]}/>)
                )}
                <motion.div className="progress" style={{scaleX}}/>
            </>
            <TitleContainer description={conclusionDesc}/>

            <Navigation/>

            <Footer title={"Made with ❤️ and 🥧 by Aaron Zhang"}/>

        </div>
    );
}


