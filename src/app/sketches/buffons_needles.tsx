import { P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import React from "react";
import { Element, Vector } from "p5";

let font: string | object;




export function BuffonsNeedlesSketch() {
    function sketch(p5: P5CanvasInstance) {

        let canvasSize = 350;
        let label: Element;
        let button: Element;
        let d: number = 20;
        let numHit: number = 0;
        let totalHit: number = 0;
        let div: Element;
        function start() {
            p5.background(250);
            totalHit = 0;
            numHit = 0;
            for (let i = -p5.width / 2; i <= p5.width / 2; i += p5.width / d) {
                let line = new Line(i);
                line.draw();
            }

        }

        p5.preload = () => {

        };

        function createDom() {
            div = p5.createDiv()
            div.size(canvasSize, 50);
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
            p5.createCanvas(canvasSize, canvasSize, p5.WEBGL);
            createDom();
            start();
        };

        p5.draw = () => {
            for (let i = 0; i < 1000; i++) {
                let line = new Needle(p5.random(-p5.width / 2, p5.width / 2), p5.random(-p5.width / 2, p5.width / 2), p5.width / d);
                let lineHit = line.draw();
                if (lineHit) {
                    numHit++;
                }
                totalHit++;
            }

            let pi = (2 * totalHit) / numHit;
            label.html("π ≈ " + pi );


            if (totalHit > 1000000) {
                start()
            }

        };

        class Line {
            x: number;

            constructor( x: number) {
                this.x = x;
            }

            draw() {
                p5.line(this.x, -p5.height / 2, this.x, p5.height / 2);
            }


        }

        class Needle {
            x: number;
            y: number;
            angle: number;
            length: number;

            constructor( x: number, y: number, length: number, angle: number = p5.random(0, p5.PI)) {
                this.x = x;
                this.y = y;
                this.angle = angle;
                this.length = length;
            }

            draw() {
                let hit;
                p5.push();
                p5.stroke(p5.random(0, 240), p5.random(0, 240), p5.random(0, 240));
                p5.line(this.x, this.y, this.x + this.length * p5.cos(this.angle), this.y + this.length * p5.sin(this.angle));
                let cx = ((2 * this.x) + (this.length * p5.cos(this.angle))) / 2;
                let dist = p5.abs(0.5 * this.length * (p5.cos(this.angle)));


                let d1 = p5.abs(cx % this.length);
                let d2 = p5.abs(this.length - (cx % this.length));

                if (p5.abs(d1 - this.length) <= dist || p5.abs(d2 - this.length) <= dist) {
                    hit = true;
                } else {
                    hit = false;
                }

                p5.pop();

                return hit;
            }

        }


    }


    return <div id="buffon"><NextReactP5Wrapper sketch={sketch}/></div> ;
}




