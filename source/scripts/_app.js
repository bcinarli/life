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