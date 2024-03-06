import { P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import React from "react";
import type { Element } from "p5";

export function PolygonSketch() {
    function sketch(p5: P5CanvasInstance) {

        const canvasSize = 350;
        const size = 175;
        let label: Element;
        let slider: Element;
        let approx: number;;
        function start() {

            p5.clear();
            p5.removeElements();
            p5.createCanvas(canvasSize, canvasSize, p5.WEBGL);
            p5.background(255, 204, 0);
            p5.arc(0, 0, size, size, 0, p5.TWO_PI, p5.OPEN, 50);


            let div = p5.createDiv();
            div.size(canvasSize, 50);
            div.style("background-color", "black");
            div.style("color", "white");
            div.style("display", "flex");
            div.style("align-items", "center");
            div.style("justify-content", "space-between");
            div.style("padding", "10px");
            label = p5.createP("");
            slider = p5.createSlider(3, 80, 3);
            label.style("margin", "10px 0px");
            label.style("font-size", "14px");
            slider.size(150);
            label.parent(div);
            slider.parent(div);


        }


        function polygon(x: number, y: number, radius: number, npoints: number, inscribed: boolean) {
            let angle = p5.TWO_PI / npoints;
            let dist = (radius / p5.cos((angle / 2)));

            p5.beginShape();
            for (let a = p5.QUARTER_PI; a < p5.TWO_PI + p5.QUARTER_PI; a += angle) {
                if (inscribed) {
                    let sx = x + p5.cos(a) * radius;
                    let sy = y + p5.sin(a) * radius;
                    p5.vertex(sx, sy);
                } else {
                    let sx =  x + (p5.cos(a) * dist);
                    let sy = y + (p5.sin(a) * dist);
                    p5.vertex(sx, sy);

                }


            }
            p5.endShape(p5.CLOSE);

            if (inscribed) {
                let x1 = radius;
                let x2 = p5.cos(angle) * radius;
                let y1 = 0;
                let y2 = p5.sin(angle) * radius;

                return p5.dist(x1, y1, x2, y2);
            } else {
                return 2 * dist * p5.sin( angle / 2);
            }

        }




        p5.setup = () => {
            start();
        };

        p5.draw = () => {
            let g = slider.value();
            p5.background(185, 202, 222);

            p5.fill(96, 124, 141)
            let outsideLength = polygon(0, 0, size / 2, +g, false);
            p5.stroke('black');

            p5.fill(121, 158, 196)
            p5.arc(0, 0, size, size, 0, p5.TWO_PI, p5.OPEN, 50);

            p5.fill(174, 194, 198)
            let insideLength = polygon(0, 0, size / 2, +g, true);

            let avgCircumference = (outsideLength + insideLength) / 2;
            label.html("π ≈ " + ((avgCircumference * +g) / (size)).toString());
        };


    }

    return <div id="archimedes"><NextReactP5Wrapper sketch={sketch}/> </div>   ;
}




