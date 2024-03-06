import { P5CanvasInstance } from "@p5-wrapper/react";

const NextReactP5Wrapper = React.lazy(() =>
    import("@p5-wrapper/next").then(module => ({
        default: module.NextReactP5Wrapper
    }))
);
import React, { useEffect } from "react";
import { type Element, type Vector, type Graphics } from "p5";



function sketch(p5: P5CanvasInstance) {


    const canvasSize = 350;
    let label: Element;
    let slider: Element;

    let innerLine: Line;
    let outerLine: Line;

    let canvas2: Graphics;
    let button: Element;

    let drawSpeed: number = 1;

    function start() {
        innerLine.angle = 0;
        outerLine.angle = 0;
        innerLine.numRotations = 0;
        outerLine.numRotations = 0;
        innerLine.update();
        outerLine.setPivot(innerLine.end);
        outerLine.update();
        outerLine.draw();
        canvas2.clear();
    }


    p5.setup = () => {

        p5.createCanvas(canvasSize, canvasSize, p5.WEBGL);
        p5.background(255);

        let div = p5.createDiv();
        div.size(canvasSize, 50);
        div.style("background-color", "black");
        div.style("color", "white");
        div.style("display", "flex");
        div.style("align-items", "center");
        div.style("justify-content", "space-between");
        div.style("padding", "10px");
        let rightContainer = p5.createDiv();

        label = p5.createP("");
        label.style("margin", "10px 0px");
        label.style("font-size", "14px");
        label.parent(div);
        rightContainer.parent(div);
        rightContainer.style("display", "flex");
        rightContainer.style("align-items", "center");
        slider = p5.createSlider(1, 5000, 10, 0);
        slider.size(100);
        slider.parent(rightContainer);
        slider.style("margin", "0 20px 0px 0px");

        button = p5.createButton("Restart");
        button.style("font-size", "14px");
        button.mousePressed(() => start());
        button.parent(rightContainer);

        canvas2 = p5.createGraphics(canvasSize * 2, canvasSize * 2);


        let speed = 0.01;
        innerLine = new Line(p5.createVector(0, 0), 0, 80, speed);
        outerLine = new Line(p5.createVector(innerLine.end.x, innerLine.end.y), 0, 80, p5.PI * speed);

    };


    p5.draw = () => {
        p5.background("#ffedc7");
        p5.image(canvas2, -p5.width / 2, -p5.height / 2);

        drawSpeed = +slider.value();
        innerLine.draw();
        outerLine.draw();

        for (let i = 0; i < drawSpeed; i++) {
            innerLine.update();

            outerLine.setPivot(innerLine.end);
            let outerEnd = outerLine.end;
            outerLine.update();

            outerLine.leaveTrail(outerEnd);
        }


        let pi = outerLine.numRotations / innerLine.numRotations;
        //console.log(innerLine.angle)
        label.html("π ≈ " + pi.toPrecision(10).toString());
    };

    class Line {

        pivot: Vector;
        end: Vector;
        angle: number;
        length: number;
        velocity: number;
        numRotations: number;

        constructor(pivot: Vector, angle: number, length: number, velocity: number) {
            this.pivot = pivot;
            this.angle = angle;
            this.length = length;
            this.velocity = velocity;
            this.end = p5.createVector(this.pivot.x + this.length * p5.cos(this.angle), this.pivot.y + this.length * p5.sin(this.angle));
            this.numRotations = 0;
        }

        draw() {
            p5.stroke(0);
            p5.line(this.pivot.x, this.pivot.y, this.end.x, this.end.y);
        }

        update() {
            this.angle += this.velocity;
            if (this.angle % p5.TWO_PI < this.velocity) {
                this.numRotations++;
            }
            this.end = p5.createVector(this.pivot.x + this.length * p5.cos(this.angle), this.pivot.y + this.length * p5.sin(this.angle));
        }

        setPivot(pivot: Vector) {
            this.pivot = pivot;
        }

        leaveTrail(prevEnd: Vector) {
            let r = p5.abs((p5.sin(this.angle) * 255));
            let g = p5.abs(p5.cos(this.angle)) * 255;
            let b = p5.tan(this.angle) * 255;

            r = p5.map(r, -255, 255, 70, 130);
            g = p5.map(g, -255, 255, 70, 230);
            b = p5.map(b, -255, 255, 70, 150);

            canvas2.stroke(r, g, b);
            canvas2.line(prevEnd.x + canvas2.width / 4, prevEnd.y + canvas2.height / 4, this.end.x + canvas2.width / 4, this.end.y + canvas2.height / 4);
        }
    }


}


export function SpirographSketch() {
    return <div id="spirograph" className="flex justify-center items-center"><NextReactP5Wrapper sketch={sketch}/></div>;
}




