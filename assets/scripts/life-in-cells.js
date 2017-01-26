/**
 * @author Bilal Cinarli
 */

(function() {
    'use strict';

    var app = (function() {
        var modules = [];

        var registerInit = function(module) {
            modules.push(module);
        };

        var init = function() {
            initModules();
        };

        var initModules = function() {
            if(modules.length > 0) {
                modules.forEach(function(module) {
                    if(typeof app[module] !== 'undefined' && !app[module].isInitialized()) {
                        app[module].init();
                    }
                });
            }
        };

        var ready = function(fn) {
            if(document.readyState !== 'loading') {
                fn();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            }
        };

        return {
            init:         init,
            registerInit: registerInit,
            ready:        ready
        };
    })();

    window.life = app;
})();
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
/**
 * @author Bilal Cinarli
 */

(function(app) {
    'use strict';

    app.events = (function() {
        var initialized   = false,
            publicMethods = {},
            actionButtons,
            buttonNext,
            buttonPlayPause,
            buttonRandom,
            isRunning     = false,
            interval;

        publicMethods.init = function() {
            initialized = true;

            actionButtons   = document.getElementById('life-app-actions');
            buttonNext      = actionButtons.querySelector('.next-generation');
            buttonPlayPause = actionButtons.querySelector('.run-generations');
            buttonRandom    = actionButtons.querySelector('.random-habitat');

            bindEvents();
        };

        publicMethods.isInitialized = function() {
            return initialized;
        };

        var bindEvents = function() {
            buttonNext.addEventListener('click', nextGenerationAction);
            buttonPlayPause.addEventListener('click', runGenerations);
            buttonRandom.addEventListener('click', randomHabitat);
        };

        var nextGenerationAction = function() {
            app.generations.nextGeneration();
            app.habitat.nextGeneration();
        };

        var runGenerations = function() {
            if(isRunning) {
                clearInterval(interval);
                isRunning = false;
            }

            else {
                isRunning = true;
                interval  = setInterval(nextGenerationAction, 500);
            }
        };

        var randomHabitat = function() {
            if(isRunning) {
                clearInterval(interval);
                isRunning = false;
            }

            app.World = new app.world(app.World.size, true);
            app.habitat.nextGeneration();
        };

        return publicMethods;
    })();

    app.registerInit('events');
})(life);
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
/**
 * @author Bilal Cinarli
 */

(function(app) {
    'use strict';

    var World = function(size, random) {
        this.size   = size;
        this.random = random === true;
        this.cells  = [];

        this.init();
    };

    World.prototype.init = function() {
        this.getCells();
    };

    World.prototype.getCells = function() {
        for(var i = 0; i < this.size; i++) {
            this.cells[i] = [];

            for(var j = 0; j < this.size; j++) {
                var isAlive = false;

                if(this.random) {
                    isAlive = Math.random() >= 0.8;
                }

                this.cells[i][j] = new app.cell({coordinates: [i, j], alive: isAlive});
            }
        }
    };

    app.world = World;
})(life);
//# sourceMappingURL=life-in-cells.js.map