import { P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import React from "react";
import { Element, Vector } from "p5";


function sketch(p5: P5CanvasInstance) {

    const canvasSize = 350;
    let label: Element;
    let slider: Element;
    let s: Square;
    let radius: number = 170;
    let threshold: number = 0.1;
    let totalArea = 0;

    p5.preload = () => {

    };


    p5.setup = () => {

        p5.createCanvas(canvasSize, canvasSize, p5.WEBGL);
        p5.background(0);

        p5.rectMode(p5.RADIUS);

        let div = p5.createDiv();
        div.size(canvasSize, 50);
        div.style("background-color", "black");
        div.style("color", "white");
        div.style("display", "flex");
        div.style("align-items", "center");
        div.style("justify-content", "space-between");
        div.style("padding", "10px");
        label = p5.createP("");
        slider = p5.createSlider(0.04, 20, 3, 0.01);
        label.style("margin", "10px 0px");
        label.style("font-size", "14px");
        slider.size(150);
        label.parent(div);
        slider.parent(div);

        p5.angleMode(p5.DEGREES);
        p5.rectMode(p5.RADIUS);
        p5.frameRate(1);
        // p5.arc(0, 0, radius * 2, radius * 2, 0,360, p5.OPEN, 50);

    };

    p5.draw = () => {
        threshold = +slider.value();
        p5.background("#EFDBB2");
        totalArea = 0;
        s = new Square(0, 0, radius);
        s.fillFirstFour();
        label.html("π ≈ " + (totalArea / (radius * radius)).toString());

    };


    class Square {
        pos: Vector;
        r: number;

        constructor(x: number, y: number, r: number) {
            this.pos = p5.createVector(x, y);
            this.r = r / p5.sqrt(2);
            totalArea += this.area();
        }

        draw() {
            p5.fill(p5.random(255), p5.random(255), p5.random(255));
            p5.square(this.pos.x, this.pos.y, this.r);
        }

        fillFirstFour() {
            this.draw();

            this.fillMiddleSquares(0, -1);
            this.fillMiddleSquares(1, 0);
            this.fillMiddleSquares(-1, 0);
            this.fillMiddleSquares(0, 1);

        }

        fillMiddleSquares(dirx: number, diry: number) {
            if (this.r < threshold) {
                return;
            }
            let ang = 63.435;
            let x = p5.asin(((p5.sin(90 + ang) ) / (radius)) * (p5.dist(this.pos.x + (this.r * dirx), this.pos.y + (this.r * diry), 0, 0)));
            let newL = (p5.sin(180 - x - (90 + ang)) * radius) / p5.sin(90 + ang);
            let newR = newL * p5.cos(ang);

            let square= new Square(this.pos.x + ((this.r + newR) * dirx), this.pos.y + ((this.r + newR) * diry), newR * p5.sqrt(2));
            square.draw();


            if (dirx === 0 && diry === -1) {
                square.fillSquares(1, 1);
                square.fillSquares(-1, 1);
            } else if (dirx === 1 && diry === 0) {
                square.fillSquares(1, 1);
                square.fillSquares(1, -1);
            } else if (dirx === 0 && diry === 1) {
                square.fillSquares(1, -1);
                square.fillSquares(-1, -1);
            } else if (dirx === -1 && diry === 0) {
                square.fillSquares(-1, 1);
                square.fillSquares(-1, -1);
            }


            square.fillMiddleSquares(dirx, diry);

        }

        area() {
            return this.r * this.r * 4;
        }

        fillSquares(dirx: number, diry: number) {
            if (this.r < threshold) {
                return;
            }

            this.draw();


            let lower = p5.createVector(this.pos.x + (this.r * dirx), this.pos.y + (this.r * diry));
            let distLower = p5.dist(lower.x, lower.y, 0, 0);
            let angleLower = p5.asin((lower.x * dirx) / distLower) + 135;
            let term1 = (distLower * p5.cos(angleLower))
            let term2 = p5.sqrt(  (distLower * distLower * p5.cos(angleLower) * p5.cos(angleLower)) - (distLower * distLower) + (radius * radius)  );
            let newL = (term1 + term2) / 2;
            let newR = newL / p5.sqrt(2);
            let lowerSquare = new Square(this.pos.x + ((newR + this.r) * dirx), this.pos.y + ((this.r - newR) * diry), newR * p5.sqrt(2));
            lowerSquare.draw();
            lowerSquare.fillSquares(dirx, diry);


            let upper = p5.createVector(this.pos.x - (this.r * dirx), this.pos.y - (this.r * diry));
            let distUpper = p5.dist(upper.x, upper.y, 0, 0);
            let angleUpper = p5.asin((upper.x * dirx) / distUpper) + 135;

            let term3 = (distUpper * p5.cos(angleUpper))
            let term4 = p5.sqrt(  (distUpper * distUpper * p5.cos(angleUpper) * p5.cos(angleUpper)) - (distUpper * distUpper) + (radius * radius)  );
            let newLU = (term3 + term4) / 2;
            let newRU = newLU / p5.sqrt(2);

            let upperSquare = new Square(this.pos.x - ((this.r - newRU) * dirx), this.pos.y - ((this.r + newRU) * diry), newRU * p5.sqrt(2));
            upperSquare.draw();
            upperSquare.fillSquares(dirx, diry);




        }
    }


}


export function SquarePackingSketch() {
    return <div id="packing"><NextReactP5Wrapper sketch={sketch}/></div>;
}




