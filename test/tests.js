/**
 * @author Bilal Cinarli
 */

var expect = chai.expect;

describe('Testing Life of Cells', function() {


    before(function() {
        life.World = new life.world(20, true);

        life.init();
    });

    describe('World', function() {
        it('has a size of 20', function() {
            expect(life.World.size).to.be.equal(20);
        });

        it('has 400 cells', function() {
            var total = 0;

            life.World.cells.map(function(row) {
                total += row.length;
            });

            expect(total).to.be.equal(400);
        });

        it('is a random one', function() {
            expect(life.World.random).to.be.equal(true);
        });
    });

    describe('Single Cell', function() {
        it('is either live or dead', function() {
            expect(life.World.cells[0][0].alive).to.be.boolean;
        });

        it('should have 8 programmatic neighbours (whether they are present in World or not)', function() {
            var cell = life.World.cells[0][0];

            cell.findNeighbours();

            expect(cell.neighbours.length).to.be.equal(8);
        });

        it('will going to die if it has neighbours fewer than 2 or more then 3', function() {
            var cell            = life.World.cells[10][10];
            var aliveNeighbours = cell.aliveNeighbours();
            var isGoingToDie    = cell.willDie();

            var willDie = aliveNeighbours < 2 || aliveNeighbours > 3;

            expect(isGoingToDie).to.be.equal(willDie);
        });

        it('will going to reborn it it has exact 3 neighbours', function() {
            var cell            = life.World.cells[10][10];
            var aliveNeighbours = cell.aliveNeighbours();
            var isGoingToBorn   = cell.willBorn();

            var willBorn = aliveNeighbours === 3;

            expect(isGoingToBorn).to.be.equal(willBorn);
        });
    });
});