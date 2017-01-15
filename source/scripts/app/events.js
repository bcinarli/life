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