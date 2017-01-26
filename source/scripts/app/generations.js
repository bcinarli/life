/**
 * @author Bilal Cinarli
 */

(function(app) {
    'use strict';

    app.generations = (function() {
        var publicMethods = {};

        publicMethods.nextGeneration = function() {
            var nextGen,
                currentWorld = freezeWorld(app.World.cells);

            nextGen = app.World.cells.map(function(row) {
                return row.map(function(cell) {
                    if(cell.willDie(currentWorld)) {
                        cell.die();
                    }

                    if(cell.willBorn(currentWorld)) {
                        cell.born();
                    }

                    return cell;
                });
            });

            app.World.cells = nextGen;
        };

        var freezeWorld = function(cells) {
            return cells.map(function(row) {
                return row.map(function(cell) {
                    return new app.cell({coordinates: cell.coordinates, alive: cell.alive});
                });
            });
        };

        return publicMethods;
    })();
})(life);