/**
 * @author Bilal Cinarli
 */

'use strict';

class Cell {
    constructor(options) {
        this.alive       = options.alive === true;
        this.coordinates = options.coordinates;
        this.borders     = options.borders;
        this.neighbours  = [];
    }

    findNeighbours() {
        let neighbours = [],
            x          = this.coordinates[0],
            y          = this.coordinates[1];

        for(let i = x - 1; i <= x + 1; i++) {
            for(let j = y - 1; j <= y + 1; j++) {
                if(this.isInWorld(i, j)) {
                    neighbours.push([i, j]);
                }
            }
        }

        this.neighbours = neighbours;
    }

    isInWorld(x, y) {
        if(x < 0 || y < 0) {
            return false;
        }

        else if(x >= this.borders || y >= this.borders) {
            return false;
        }

        return true;
    }

    willDie(aliveNeighbours) {
        return aliveNeighbours < 2 || aliveNeighbours > 3;
    }

    willBorn(aliveNeighbours) {
        return aliveNeighbours === 3;
    }

    die() {
        this.alive = false;
    }

    born() {
        this.alive = true;
    }

    isAlive() {
        return this.alive;
    }
}

export default Cell;