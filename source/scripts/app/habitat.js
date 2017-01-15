/**
 * @author Bilal Cinarli
 */

(function(app) {
    'use strict';

    app.habitat = (function() {
        var publicMethods = {},
            initialized   = false,
            root          = {},
            cells         = [];

        publicMethods.init = function() {
            initialized = true;
            root.app    = document.getElementById('life-app');
            root.world  = document.getElementById('life-app-world');

            publicMethods.nextGeneration();
        };

        publicMethods.nextGeneration = function() {
            clearWorld();
            renderWorld();
        };

        var renderWorld = function() {
            cells = [];

            app.World.cells.map(function(row) {
                row.map(function(cell) {
                    var _cell = document.createElement('span');

                    _cell.classList.add('single-cell');

                    if(cell.alive) {
                        _cell.classList.add('is-alive');
                    }

                    _cell.cellData = cell;
                    cells.push(_cell);
                });
            });

            cells.forEach(function(cell) {
                root.world.appendChild(cell);
            });
        };

        var clearWorld = function() {
            root.world.innerHTML = '';
        };

        publicMethods.isInitialized = function() {
            return initialized;
        };

        return publicMethods;
    })();

    app.registerInit('habitat');
})(life);