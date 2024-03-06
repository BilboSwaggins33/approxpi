import { P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import React from "react";
import { Element, Graphics, Image } from "p5";


function sketch(p5: P5CanvasInstance) {

    const canvasSize = 350;
    let label: Element;
    let slider: Element;
    let epsilon: number = 0.1;
    let canvas2: Image;
    p5.preload = () => {

    };


    p5.setup = () => {

        p5.createCanvas(canvasSize, canvasSize, p5.WEBGL);
        p5.background(250);
        canvas2 = p5.createImage(canvasSize, canvasSize);

        let div = p5.createDiv();
        div.size(canvasSize, 50);
        div.style("background-color", "black");
        div.style("color", "white");
        div.style("display", "flex");
        div.style("align-items", "center");
        div.style("justify-content", "space-between");
        div.style("padding", "10px");
        label = p5.createP("");
        slider = p5.createSlider(1, 3, 1.5, 0);
        label.style("margin", "10px 0px");
        label.style("font-size", "14px");
        slider.size(150);
        label.parent(div);
        slider.parent(div);

        canvas2.loadPixels();
        for (let i = 0; i < canvas2.width; i += 1) {
            for (let j = 0; j < canvas2.height; j += 1) {
                let x = p5.map(i, 0, canvas2.width, 0.22, 0.32);
                let y = p5.map(j, 0, canvas2.height , -0.05, 0.05);
                let pixLocation = (i + (j * canvas2.width)) * 4;
                if (inMandelbrot(x, y)) {

                    canvas2.pixels[pixLocation] = 227;
                    canvas2.pixels[pixLocation + 1] = 132;
                    canvas2.pixels[pixLocation + 2] = 42;
                    canvas2.pixels[pixLocation + 3] = 255;

                } else {
                    canvas2.pixels[pixLocation] = 220;
                    canvas2.pixels[pixLocation + 1] = 160;
                    canvas2.pixels[pixLocation + 2] = 100;
                    canvas2.pixels[pixLocation + 3] = 255;

                }
            }
        }
        canvas2.updatePixels();

    };

    p5.draw = () => {
        epsilon = +slider.value() / Math.pow(10, 10);
        let x = loopUntilConvergence(0.25 + epsilon);
        p5.background(0);
        p5.image(canvas2, -p5.width/2, -p5.height/2);

        p5.circle(epsilon * Math.pow(10, 12) - 150, 0, 6);

        label.html("π ≈ " + x.toString());

    };

    function loopUntilConvergence(x: number) {
        let realCf = 0;
        let imagiCf = 0;
        let n = 0;
        while (n < 100000000) {
            let firstTerm = realCf * realCf - imagiCf * imagiCf;
            let secondTerm = 2 * realCf * imagiCf;
            realCf = firstTerm + x;
            imagiCf = secondTerm;
            if (realCf * realCf + imagiCf * imagiCf > 2) {
                return n;
            }
            n++;
        }
        return 100;
    }

    function inMandelbrot(x: number, y: number) {
        let realCf = 0;
        let imagiCf = 0;
        let n = 0;
        while (n < 100) {
            let firstTerm = realCf * realCf - imagiCf * imagiCf;
            let secondTerm = 2 * realCf * imagiCf;
            realCf = firstTerm + x;
            imagiCf = secondTerm + y;
            if (realCf * realCf + imagiCf * imagiCf > 2) {
                return false;
            }
            n++;
        }
        return true;
    }




}


export function MandelbrotSketch() {
    return <div id="mandelbrot"><NextReactP5Wrapper sketch={sketch}/> </div>;
}




