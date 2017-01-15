/**
 * @author Bilal Cinarli
 */

'use strict';

import Generations from './generations';
import World from './world';

class Life {
    constructor(world) {
        this._world   = world;
        this.interval = 0;
        this.running  = false;

        this.els = {};

        this.els.app             = document.getElementById('life-app');
        this.els.world           = document.getElementById('life-app-world');
        this.els.buttonNext      = this.els.app.querySelector('.next-generation');
        this.els.buttonPlayPause = this.els.app.querySelector('.run-generations');
        this.els.buttonRandom    = this.els.app.querySelector('.random-habitat');

        this.nextGeneration   = this.nextGeneration.bind(this);
        this.runGenerations   = this.runGenerations.bind(this);
        this.startRandomWorld = this.startRandomWorld.bind(this);

        this.bindEvents();
        this.generateWorld();
    }

    bindEvents() {
        this.els.buttonNext.addEventListener('click', this.nextGeneration);
        this.els.buttonPlayPause.addEventListener('click', this.runGenerations);
        this.els.buttonRandom.addEventListener('click', this.startRandomWorld);
    }

    generateWorld() {
        let cells = [];

        this._world.cells.map(row => {
            row.map(cell => {
                let _cell = document.createElement('span');

                _cell.classList.add('single-cell');

                if(cell.alive) {
                    _cell.classList.add('is-alive');
                }

                _cell.cellData = cell;
                cells.push(_cell);
            });
        });

        cells.forEach(cell => {
            this.els.world.appendChild(cell);
        });
    }

    nextGeneration() {
        let nextGeneration = Generations.nextGeneration(this._world);
        this.clearWorld();

        this._world = nextGeneration;
        this.generateWorld();
    }

    runGenerations() {
        if(this.running) {
            clearInterval(this.interval);
            this.running = false;
        }

        else {
            this.interval = setInterval(this.nextGeneration, 500);
            this.running  = true;
        }
    }

    startRandomWorld() {
        let size = this._world.worldSize();

        this._world = new World(size, true);
        this.clearWorld();
        this.generateWorld();
    }

    clearWorld() {
        this.els.world.innerHTML = '';
    }
}

export default Life;