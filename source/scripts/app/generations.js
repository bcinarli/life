/**
 * @author Bilal Cinarli
 */

(function(app) {
    'use strict';

    app.generations = (function() {
        var publicMethods = {};

        publicMethods.nextGeneration = function() {
            var nextGen = [];

            app.World.cells.map(function(row, index) {
                nextGen[index] = row.map(function(cell, index) {
                    if(cell.willDie()) {
                        cell.die();
                    }

                    if(cell.willBorn()) {
                        cell.born();
                    }

                    return cell;
                });
            });
        };

        return publicMethods;
    })();
})(life);