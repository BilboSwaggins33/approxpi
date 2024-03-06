import { P5CanvasInstance } from "@p5-wrapper/react";
import { type Element, Graphics } from "p5";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import React, { useEffect } from "react";




export function MonteCarloSketch() {

    function sketch(p5: P5CanvasInstance) {
        let arc: Arc;
        let label: Element;
        let button: Element;
        let numTotal = 0;
        let numInside = 0;
        let size = 350;
        let div: Element;

        function start() {

            numTotal = 0;
            numInside = 0;
            p5.background(250);
            arc = new Arc(-(p5.width / 2), p5.height / 2, p5.height * 2, p5.HALF_PI, 0, 50);
            arc.draw();

        }

        p5.preload = () => {

        };

        function createDom() {
            div = p5.createDiv()
            div.size(size, 50);
            div.style("background-color", "black");
            div.style("color", "white");
            div.style("display", "flex");
            div.style("align-items", "center");
            div.style("justify-content", "space-between");
            div.style("padding", "10px");
            label = p5.createP("");
            label.style("margin", "10px 0px");
            label.style("font-size", "14px");
            button = p5.createButton("Restart");
            button.style("font-size", "14px");
            button.mousePressed(() => {
                start();
            });


            label.parent(div);
            button.parent(div);
        }


        p5.setup = () => {
            p5.createCanvas(size, size, p5.WEBGL);
            start();
            createDom();

        };



        p5.draw = () => {
            for (let i = 0; i < 200; i++) {
                let p = new Point();
                if (arc.contains(p)) {
                    p.draw("#E69A8DFF");
                    numInside++;

                } else {
                    p.draw("#5F4B8BFF");
                }
                numTotal++;
            }
            let labelStr = "π ≈ " + (numInside / numTotal * 4).toPrecision(10).toString();
            label.html(labelStr);

            if (numTotal > 100000) {
                start();
            }
        };



        class Point {
            x: number;
            y: number;

            constructor() {
                this.x = p5.random(-p5.width / 2, p5.width / 2);
                this.y = p5.random(-p5.height / 2, p5.height / 2);
            }

            draw(color: string) {
                p5.stroke(color);
                p5.strokeWeight(1);
                p5.point(this.x, this.y);
            }
        }


        class Arc {

            radius: number;
            startingAngle: number;
            endingAngle: number;
            centerX: number;
            centerY: number;
            detail: number;

            constructor(centerX: number, centerY: number, radius: number, startingAngle: number, endingAngle: number, detail: number) {
                this.radius = radius;
                this.startingAngle = startingAngle;
                this.endingAngle = endingAngle;
                this.centerX = centerX;
                this.centerY = centerY;
                this.detail = detail;

            }

            draw() {
                p5.arc(this.centerX, this.centerY, this.radius, this.radius, this.startingAngle, this.endingAngle, p5.OPEN, this.detail);
            }

            contains(p: Point) {
                let d = p5.dist(p.x, p.y, this.centerX, this.centerY);
                return d < (this.radius / 2);
            }


        }

    };

    return <div id="monte" className=""><NextReactP5Wrapper sketch={sketch} /></div>;
}



