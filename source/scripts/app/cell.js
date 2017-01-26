/**
 * @author Bilal Cinarli
 */

(function(app) {
    'use strict';

    var Cell = function(options) {
        this.alive       = options.alive === true;
        this.coordinates = options.coordinates;
        this.neighbours  = [];
    };

    Cell.prototype.findNeighbours = function() {
        var neighbours = [],
            x          = this.coordinates[0],
            y          = this.coordinates[1];

        for(var i = x - 1; i <= x + 1; i++) {
            for(var j = y - 1; j <= y + 1; j++) {
                neighbours.push([i, j]);
            }
        }

        // remove itself
        neighbours.splice(4, 1);

        this.neighbours = neighbours;
    };

    Cell.prototype.willDie = function(currentWorld) {
        var aliveNeighbours = this.aliveNeighbours(currentWorld);

        return aliveNeighbours < 2 || aliveNeighbours > 3;
    };

    Cell.prototype.willBorn = function(currentWorld) {
        var aliveNeighbours = this.aliveNeighbours(currentWorld);

        return aliveNeighbours === 3;
    };

    Cell.prototype.aliveNeighbours = function(currentWorld) {
        var aliveNeighbours = 0;

        if(this.neighbours.length === 0) {
            this.findNeighbours();
        }

        this.neighbours.map(function(neighbour) {
            if(typeof currentWorld[neighbour[0]] !== 'undefined' && typeof currentWorld[neighbour[0]][neighbour[1]] !== 'undefined') {
                if(currentWorld[neighbour[0]][neighbour[1]].isAlive()) {
                    aliveNeighbours++;
                }
            }
        });

        return aliveNeighbours;
    };

    Cell.prototype.die = function() {
        this.alive = false;
    };

    Cell.prototype.born = function() {
        this.alive = true;
    };

    Cell.prototype.isAlive = function() {
        return this.alive;
    };

    app.cell = Cell;
})(life);