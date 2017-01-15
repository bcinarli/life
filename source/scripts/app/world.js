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