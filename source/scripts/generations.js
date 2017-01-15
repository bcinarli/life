/**
 * @author Bilal Cinarli
 */

'use strict';

class Generations {
    static nextGeneration(world) {
        let nextGen = [];

        world.cells.map((row, index) => {
            nextGen[index] = row.map(cell => {
                let aliveNeighbours = Generations.aliveNeighbours(world, cell);

                if(cell.willDie(aliveNeighbours)) {
                    cell.die();
                }

                if(cell.willBorn(aliveNeighbours)) {
                    cell.born();
                }

                return cell;
            });
        });

        return world;
    }

    static aliveNeighbours(world, cell) {
        let aliveNeighbours = 0;

        if(cell.neighbours.length === 0) {
            cell.findNeighbours();
        }

        cell.neighbours.map(neighbour => {
            let neighbourCell = world.cells[neighbour[0]][neighbour[1]];

            if(neighbourCell == cell) {
                return;
            }

            if(neighbourCell.isAlive()) {
                aliveNeighbours++;
            }
        });

        return aliveNeighbours;
    }
}

export default Generations;