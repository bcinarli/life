/**
 * @author Bilal Cinarli
 */

'use strict';

import Cell from './cell';

class World {
    constructor(size, random) {
        this.size   = size;
        this.random = random === true;

        this.getCells();
    }

    getCells() {
        let rows = Array.from(new Array(this.size));

        this.cells = rows.map((row, index) => {
            let cells = [];

            for(let i = 0; i < this.size; i++) {
                cells.push(this.createCell(index, i));
            }

            return cells;
        });
    }

    createCell(x, y) {
        let alive       = false,
            coordinates = [x, y];

        if(this.random) {
            alive = Math.random() >= 0.8;
        }

        return new Cell({coordinates, alive, borders: this.size});
    }

    worldSize() {
        return this.size;
    }
}

export default World;