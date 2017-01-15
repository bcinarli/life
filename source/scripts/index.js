/**
 * @author Bilal Cinarli
 */

'use strict';

import World from './world';
import Life from './life';
import '../styles/styles.scss';

let world = new World(20, true);
let life  = new Life(world);