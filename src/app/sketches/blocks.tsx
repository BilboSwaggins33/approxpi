
import { P5CanvasInstance } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import React from "react";
import { Element, Vector } from "p5";

let collisions: number = 0;
let font: string | object;
let div: Element;
function sketch(p5: P5CanvasInstance) {

    const canvasSize = 350;
    let label: Element;
    let block1: Block;
    let block2: Block;
    let calcs: number = 20000;
    let button: Element;

    function start(mass: number) {
        collisions = 0;

        block1.xpos = 10;
        block2.xpos = 100;

        block1.speed = 0;
        block2.speed = -2 / calcs;

        block2.mass = mass;
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
            start(100);
        });
        label.parent(div);
        button.parent(div);
    }

    p5.setup = () => {
        p5.createCanvas(canvasSize, canvasSize, p5.WEBGL);
        p5.background(250);

        block1 = new Block(10, 100, 1, 30, 0,);
        block2 = new Block(100, 100, 100, 70, -2 / calcs);
        collisions = 0;

        createDom();

        font = p5.loadFont("Inter/static/Inter-Regular.ttf");
        p5.textFont(font);
    };

    p5.draw = () => {
        p5.background(250)
        p5.stroke(0);
        p5.line(-p5.width / 2, 100, p5.width / 2, 100);
        for (let i = 0; i < calcs; i++) {

            if (Block.detectCollision(block1, block2)) {
                let m1 = block1.mass;
                let m2 = block2.mass;
                let v1i = block1.speed;
                let v2i = block2.speed;

                let v1f = (m1 - m2) * v1i / (m1 + m2) + v2i * (2 * m2) / (m1 + m2);
                let v2f = v2i * (m2 - m1) / (m1 + m2) + v1i * (2 * m1) / (m1 + m2);

                block1.speed = v1f;
                block2.speed = v2f;
                collisions++;
            }
            block1.update();
            block2.update();

        }


        block1.draw();
        block2.draw();

        label.html("π ≈ " + collisions.toString());

        if (block2.finishSketch()) {
            if (block2.mass > 100000000) {
                start(100);
            } else {
                start(block2.mass * 100);
            }
        }

    };

    class Block {

        xpos: number
        ypos: number
        mass: number
        size: number
        speed: number
        constructor(xpos: number, ypos: number, mass: number, size: number, speed: number,) {
            this.xpos = xpos;
            this.ypos = ypos;
            this.mass = mass;
            this.size = size;
            this.speed = speed

        }

        draw() {
            p5.rectMode(p5.CORNER);
            p5.fill(127);
            p5.stroke(0);
            p5.strokeWeight(2);
            p5.push();
            p5.rectMode(p5.CORNERS);
            p5.rect(this.xpos, this.ypos, this.xpos + this.size, this.ypos - this.size);
            p5.pop();
            p5.text(this.mass.toString() + " kg", this.xpos, this.ypos + 20);
        }

        update() {
            if (this.detectWall()) {
                this.speed *= -1;
                collisions++;
            }
            this.xpos += this.speed;
        }

        detectWall() {
            return this.xpos < -p5.width / 2;
        }

        finishSketch() {
            return this.xpos > p5.width / 2;
        }

        static detectCollision(block1: Block, block2: Block) {
            return block1.xpos + block1.size > block2.xpos;
        }


    }

}





export function BlocksSketch() {
    return <div id="blocks"><NextReactP5Wrapper sketch={sketch} /></div>;
}




