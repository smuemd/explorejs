var expect = require("chai").expect;
var DiffRangeSet = require("../src/DiffRangeSet");

function rng(...items) {
    if (items.length == 1 && typeof items[0] == 'string') {
        items = items[0].split(' ').map(Number);
    }
    var r = [];
    if (items.length % 2 == 1) {
        throw new Error('Odd number of numbers, cannot create ranges');
    }
    for (var i = 0; i < items.length; i += 2) {
        r.push({start: items[i], end: items[i + 1]});
    }
    return r;
}

describe("DiffRangeSet", ()=> {
    before(()=> {
    });
    describe('_computeNextStep test', ()=> {
        var leftSet = [];
        var rightSet = [];
        var A, B, C, D, E, F, G, K, L, M, N, O, P;
        before(()=> {
            /*
             *  1    / K
             *  2   A  K
             *  3   A  K
             *      A\
             *  5   A  L
             *         L
             *       / L
             *  8   B  L
             *  9   B  L
             *      |  L
             * 11   C  L
             * 12   C  L
             *      |  L
             * 14   D  L
             * 15   D  L
             *      |  L
             * 17   E  L
             * 18   E
             *      |
             * 20   F
             * 21   F\ M
             * 22   F  M
             * 23   F  N
             * 24   F  N
             *       /
             * 26   G
             *      G
             * 28   G
             *       \
             * 30      O
             * 31      O
             *         |
             * 33      P
             * 34      P
             *
             */
            var addLeft = (start, end) => {
                var x = rng(start, end);
                leftSet = leftSet.concat(x);
                return leftSet.length - 1;
            };
            var addRight = (start, end) => {
                var x = rng(start, end);
                rightSet = rightSet.concat(x);
                return rightSet.length - 1;
            };
            A = addLeft(2, 5);
            B = addLeft(8, 9);
            C = addLeft(11, 12);
            D = addLeft(14, 15);
            E = addLeft(17, 18);
            F = addLeft(20, 24);
            G = addLeft(26, 28);
            K = addRight(1, 3);
            L = addRight(5, 17);
            M = addRight(21, 22);
            N = addRight(23, 24);
            O = addRight(31, 31);
            P = addRight(33, 34);
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, -1, -1)).to.have.property('kind', 'right');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, -1, K)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, A, K)).to.have.property('kind', 'right');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, A, L)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, B, L)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, C, L)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, D, L)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, E, L)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, F, L)).to.have.property('kind', 'right');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, F, M)).to.have.property('kind', 'right');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, F, N)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, G, N)).to.have.property('kind', 'right');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, G, O)).to.have.property('kind', 'right');
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, G, P)).to.be.null;
        });
        it('_computeNextStep should move to closer element', ()=> {
            expect(DiffRangeSet._computeNextStep(leftSet, rightSet, F, K)).to.have.property('kind', 'right');
        });
        it('_computeNextStep should move to closer element when next are equal', ()=> {
            expect(DiffRangeSet._computeNextStep(rng('6 7 10 11'), rng('8 9 10 11'), 0, 0)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should move to closer element when next are equal', ()=> {
            expect(DiffRangeSet._computeNextStep(rng('8 9 10 11'), rng('6 7 10 11'), 0, 0)).to.have.property('kind', 'right');
        });
        it('_computeNextStep should move to closer element when next and prev are equal', ()=> {
            expect(DiffRangeSet._computeNextStep(rng('8 9 10 11'), rng('8 9 10 11'), 0, 0)).to.have.property('kind', 'left');
        });
        it('_computeNextStep should return null for empty sets', ()=> {
            expect(DiffRangeSet._computeNextStep([], [], 0, 0)).to.be.null;
        });
        it('_computeNextStep should return null for empty left set', ()=> {
            expect(DiffRangeSet._computeNextStep([], rng('0 1 2 3'), 0, 0)).to.have.property('kind', 'right');
            expect(DiffRangeSet._computeNextStep([], rng('0 1 2 3'), 0, 1)).to.be.null;
        });
        it('_computeNextStep should return good firection at start', ()=> {
            expect(DiffRangeSet._computeNextStep(rng('0 1'), rng('2 3'), -1, -1)).to.have.property('kind', 'left');
            expect(DiffRangeSet._computeNextStep(rng('2 3'), rng('0 1'), -1, -1)).to.have.property('kind', 'right');
        });
    });
    describe("_getUnionRelation test", ()=> {
        it('basic test', ()=> {
            expect(DiffRangeSet._computeUnionRelation({start: 0, end: 3}, {start: 2, end: 4}))
                .to.be.deep.equal({isResizing: true, start: 0, end: 4, isEndChanged: true});
            expect(DiffRangeSet._computeUnionRelation({start: 0, end: 3}, {start: 4, end: 5}))
                .to.be.deep.equal({isAfter: true});
            expect(DiffRangeSet._computeUnionRelation({start: 3, end: 4}, {start: 0, end: 2}))
                .to.be.deep.equal({isBefore: true});
            expect(DiffRangeSet._computeUnionRelation({start: 4, end: 5}, {start: 3, end: 7}))
                .to.be.deep.equal({start: 3, end: 7, isStartChanged: true, isEndChanged: true, isResizing: true});
            expect(DiffRangeSet._computeUnionRelation({start: 0, end: 4}, {start: 4, end: 5}))
                .to.be.deep.equal({isResizing: true, start: 0, end: 5, isEndChanged: true});
            expect(DiffRangeSet._computeUnionRelation({start: 0, end: 4}, {start: 0, end: 5}))
                .to.be.deep.equal({isResizing: true, start: 0, end: 5, isEndChanged: true});
            expect(DiffRangeSet._computeUnionRelation({start: 4, end: 5}, {start: 0, end: 5}))
                .to.be.deep.equal({isResizing: true, start: 0, end: 5, isStartChanged: true});
            expect(DiffRangeSet._computeUnionRelation({start: 2, end: 5}, {start: 3, end: 4}))
                .to.be.deep.equal({isIncluded: true});
            expect(DiffRangeSet._computeUnionRelation({start: 2, end: 5}, {start: 0, end: 4}))
                .to.be.deep.equal({isResizing: true, start: 0, end: 5, isStartChanged: true});
            expect(DiffRangeSet._computeUnionRelation({start: 2, end: 3}, {start: 0, end: 5}))
                .to.be.deep.equal({isResizing: true, start: 0, end: 5, isStartChanged: true, isEndChanged: true});
            expect(DiffRangeSet._computeUnionRelation({start: 10, end: 11}, {start: 10, end: 11}))
                .to.be.deep.equal({isEqual: true});

        });
    });
    describe("Add test", ()=> {
        it("simple two non-overlapping ranges", ()=> {
            expect(DiffRangeSet.add(rng('0 2'), rng('3 5'))).to.have.property('added').that.deep.equals(rng('3 5'));
        });
        it('new ranges "inside" old, non-overlapping', ()=> {
            expect(DiffRangeSet.add(rng('0 1 4 5'), rng('2 3'))).to.have.property('added').that.deep.equals(rng('2 3'));
        });
        it('new ranges "inside" old, non-overlapping v2', ()=> {
            expect(DiffRangeSet.add(rng('0 1 4 5 8 9'), rng('2 3 6 7'))).to.have.property('added').that.deep.equals(rng('2 3 6 7'));
        });
        it('new ranges include earlier and latter, non-overlapping', ()=> {
            expect(DiffRangeSet.add(rng('2 3 6 7 10 11'), rng('0 1 4 5 8 9 12 13'))).to.have.property('added').that.deep.equals(rng('0 1 4 5 8 9 12 13'));
        });
        it('new ranges are included in existing ranges, touching', ()=> {
            expect(DiffRangeSet.add(rng('2 10'), rng('2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10'))).to.have.property('added').that.is.empty;
        });
        it('new ranges include earlier and latter, some are included in existing ranges', ()=> {
            expect(DiffRangeSet.add(rng('2 3 6 7 10 11'), rng('0 1 4 5 6.4 6.5 8 9 10 11 12 13'))).to.have.property('added').that.deep.equals(rng('0 1 4 5 8 9 12 13'));
        });
        it('new ranges are quals to the existing ones', ()=> {
            expect(DiffRangeSet.add(rng('0 1 2 3 4 5'), rng('0 1 2 3 4 5'))).to.have.property('added').that.is.empty;
        });
        it('new ranges have quals to the existing ones', ()=> {
            expect(DiffRangeSet.add(rng('0 1 4 5'), rng('0 1 2 3 4 5'))).to.have.property('added').that.deep.equals(rng('2 3'))
        });
        it("should return info about resized and removed ranges", ()=> {
        });
        it("should return info about resized ranges", ()=> {
            expect(DiffRangeSet.add(rng('0 1 4 5'), rng('1 2 3 7'))).to.have.property('resized').that.is.deep.equal([
                {range: {start: 0, end: 1}, start: 0, end: 2, isEndChanged: true},
                {range: {start: 4, end: 5}, start: 3, end: 7, isStartChanged: true, isEndChanged: true}
            ]);
        });
        it('should merge two ranges', ()=> {
            var ret = DiffRangeSet.add(rng('1 2 4 5'), rng('0 3 3 6'));
            expect(ret.resized).to.be.deep.equal([
                {range: {start: 1, end: 2}, start: 0, end: 6, isStartChanged: true, isEndChanged: true}
            ]);
            expect(ret.removed).to.be.deep.equal([
                {start: 4, end: 5}
            ]);
        });
        it("one item resized, one removed due to union", ()=> {
            var test1 = DiffRangeSet.add(rng('0 3'), rng('2 5'))

        });

    });
});