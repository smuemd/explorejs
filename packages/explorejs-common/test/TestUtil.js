const padding = require('string-padding');
const xspans = require('xspans');

class RandomSwitcher {
    constructor(rand, numItems) {
        this.numItems = numItems;
        this.rand = rand;
        this.lastItem = null;
    }

    next() {
        var randomNumber = this.rand.intBetween(0, this.numItems - 2);

        if (randomNumber === this.lastItem) {
            randomNumber++;
        }
        randomNumber = randomNumber % this.numItems;
        this.lastItem = randomNumber;
        return randomNumber;
    }
}

class TestUtil {
    static rng(...items) {
        if (items.length === 1 && typeof items[0] === 'string') {
            items = items[0].match(/\[.*?]|(?:\d+\.?\d*\s+\d+\.?\d*)/g) || [];
            return items.map((str) => {
                var obj = {};

                if (str.startsWith('[')) {
                    obj.existing = {};
                    const tokens = str.substring(1, str.length - 1).match(/\d+\.?\d*|\->/g);
                    let leftTokens, rightTokens;

                    if (tokens[1] === '->') {
                        leftTokens = tokens.slice(0, 3);
                        rightTokens = tokens.slice(3);
                    } else {
                        leftTokens = tokens.slice(0, 1);
                        rightTokens = tokens.slice(1);
                    }
                    obj.existing.start = Number(leftTokens[0]);
                    obj.existing.end = Number(rightTokens[0]);

                    if (leftTokens.length === 1) {
                        obj.start = Number(leftTokens[0]);
                    } else {
                        obj.start = Number(leftTokens[2]);
                    }
                    if (rightTokens.length === 1) {
                        obj.end = Number(rightTokens[0]);
                    } else {
                        obj.end = Number(rightTokens[2]);
                    }
                    return obj;
                }

                const tokens = str.split(/\s+/g);

                return {
                    start: Number(tokens[0]),
                    end: Number(tokens[1])
                };

            });
        }
        const r = [];

        if (items.length % 2 === 1) {
            throw new Error('Odd number of numbers, cannot create ranges');
        }
        for (let i = 0; i < items.length; i += 2) {
            r.push({start: items[i], end: items[i + 1]});
        }
        return r;
    }

    static rangesFromRaw(str) {
        str = str.trim();
        if (str.length) {
            return str.split(' ').map(a => ({start: Number(a), end: Number(a)}));
        }
        return [];
    }

    static dataFromStream(dataStr, scale) {
        if (scale == null) {
            scale = 1;
        }
        return dataStr.split(';').map(p => {
            var d = p.trim().split(' ');

            if (d.length === 3) {
                return {$s: Number(d[0]) * scale, $e: Number(d[1]) * scale, v: Number(d[2])};
            }
            if (d.length === 2) {
                return {$t: Number(d[0]) * scale, v: Number(d[1])};
            }
            throw new RangeError('bad format');
        });
    }

    static randomRangeSet(size, rand, spaceRange, sizeRange) {
        if (spaceRange == null) {
            spaceRange = {start: 0, end: 3};
        }
        if (sizeRange == null) {
            sizeRange = {start: 1, end: 10};
        }

        const genRange = (range) => {
            if (typeof (range) === 'function') {
                return range();
            }
            return rand.intBetween(range.start, range.end);
        };

        let cnt = 0;
        const output = [];

        function step() {
            var randomSpace = genRange(spaceRange);
            var randomSize = genRange(sizeRange);

            output.push({start: cnt + randomSpace, end: cnt + randomSpace + randomSize});
            cnt += randomSpace + randomSize;
        }

        if (typeof (size) === 'function') {
            do {
                step();
            } while (size(output));
        } else {
            for (let i = 0; i < size; i++) {
                step();
            }
        }
        return output;
    }

    static repeat(str, times) {
        var s = '';

        for (let i = 0; i < times; i++) {
            s += str;
        }
        return s;
    }

    static getRangeDrawing(rangeSets, names, scale) {
        var lines = [];

        scale = scale || 6;
        if (names == null) {
            names = 'ABCDEFGHIJKLMNOPRSTUWXYZ';
        }
        if (typeof names === 'string') {
            names = names.split('');
        }

        const namesWidth = names.reduce((r, a) => Math.max(a.length, r), 0);

        const max = rangeSets.reduce((a, b) => {
            return Math.max(a, b.length === 0 ? 0 : b[b.length - 1].end);
        }, 0);

        function putStringIntoArray(array, pos, string) {
            for (let i = 0; i < string.length; i++) {
                array[pos + i] = string[i];
            }
        }

        for (const rangeSet of rangeSets) {
            const line = [];
            const numbers = [];

            for (let i = 0; i <= max * scale; i++) {
                line[i] = ' ';
                numbers[i] = ' ';

            }
            let previousRangeEnd = -Infinity;

            for (const range of rangeSet) {
                const r = {start: range.start * scale, end: range.end * scale};
                const levelIdLabelWidth = 4;

                if (range.levelId != null && r.end - r.start > levelIdLabelWidth) {
                    putStringIntoArray(numbers,
                        Math.floor((r.start + r.end) / 2) - levelIdLabelWidth / 2,
                        padding(range.levelId, levelIdLabelWidth,
                            ' ',
                            padding.BOTH));
                }

                if (previousRangeEnd === range.start) {
                    line[r.start] = '┳';
                } else {
                    line[r.start] = '┏';
                    putStringIntoArray(numbers, r.start, padding(range.start.toString(), 3, ' ', padding.RIGHT));
                }
                if (r.end === r.start) {
                    line[r.end] = '●';
                    continue;
                } else {
                    putStringIntoArray(numbers, r.end - 2, padding(range.end.toString(), 3, ' ', padding.LEFT));
                }
                line[r.end] = '┓';
                for (let j = r.start + 1; j < r.end; j++) {
                    line[j] = '━';
                }
                previousRangeEnd = range.end;
            }
            line.unshift('├', ' ' + padding(names.shift(), namesWidth, ' ', padding.RIGHT) + ' ');
            numbers.unshift('│  ' + this.repeat(' ', namesWidth));
            numbers.push('  │');
            line.push('  │');

            lines.push(line.join(''));
            lines.push(numbers.join(''));
        }
        const upLine = '┌' + this.repeat('─', (max * scale + namesWidth) + 5) + '┐';
        const dnLine = '└' + this.repeat('─', (max * scale + namesWidth) + 5) + '┘';

        lines.unshift(upLine);
        lines.push(dnLine);
        return lines.join('\n');
    }

    static getDiffDrawing(diff, scale = 7) {
        return this.getRangeDrawing([
            diff.removed,
            diff.resized.map(x => x.existing),
            diff.resized,
            diff.added,
            diff.result
        ], ['DEL', 'RES', 'RES*', 'ADD', '='], scale);
    }

    static getSwitcher(rand, numItems) {
        return new RandomSwitcher(rand, numItems);
    }

    static transformSet(rangeSet, added, removed, resized) {
        function find(range, array) {
            return array.find((a) => a.start === range.start && a.end === range.end);
        }

        let restore = rangeSet.filter((a) => find(a, removed) == null);

        for (const o of resized) {
            const itemInLeft = find(o.existing, rangeSet);

            itemInLeft.start = o.start;
            itemInLeft.end = o.end;
        }

        for (const o of added) {
            restore.push(o);
        }
        restore.sort((a, b) => a.start - b.start);

        restore = xspans.union(restore).toObjects('start', 'end');
        return restore;
    }

    static cleanRange(range) {
        return {start: range.start, end: range.end};
    }

    static cleanRangeOnLevel(range) {
        return {start: range.start, end: range.end, levelId: range.levelId};
    }

    static cleanResizedRangeOnLevel(range) {
        var a = TestUtil.cleanRangeOnLevel(range);

        if (range.existing) {
            a.existing = TestUtil.cleanRangeOnLevel(range.existing);
        }
        return a;
    }

    static rangeOnLevel(levelId, start, end, existingStart, existingEnd) {
        if (typeof levelId === 'string') {
            const args = levelId.split(' ');

            levelId = args[0];
            start = Number(args[1]);
            end = Number(args[2]);
            existingStart = Number(args[3]);
            existingEnd = Number(args[4]);
        }
        const o = {start: start, end: end, levelId: levelId};

        if (!isNaN(existingStart)) {
            o.existing = {start: existingStart, end: existingEnd, levelId: levelId};
        }
        return o;
    }

    static rangeWithoutLevel(start, end, existingStart, existingEnd) {
        if (typeof start === 'string') {
            const args = start.split(' ');

            start = Number(args[0]);
            end = Number(args[1]);
            existingStart = Number(args[2]);
            existingEnd = Number(args[3]);
        }
        const o = {start: start, end: end};

        if (!isNaN(existingStart)) {
            o.existing = {start: existingStart, end: existingEnd};
        }
        return o;
    }

    static rangesOnLevel(ranges, scale) {
        if (scale == null) {
            scale = 1;
        }
        return ranges.split(';').filter(a => a).map(a => {
            var rangeOnLevel = this.rangeOnLevel(a.trim());

            rangeOnLevel.start *= scale;
            rangeOnLevel.end *= scale;
            if (rangeOnLevel.existing) {
                rangeOnLevel.existing.start *= scale;
                rangeOnLevel.existing.end *= scale;
            }
            return rangeOnLevel;
        });
    }

    static rangesWithoutLevel(ranges, scale) {
        if (scale == null) {
            scale = 1;
        }
        return ranges.split(';').filter(a => a).map(a => {
            var rangeOnLevel = this.rangeWithoutLevel(a.trim());

            rangeOnLevel.start *= scale;
            rangeOnLevel.end *= scale;
            if (rangeOnLevel.existing) {
                rangeOnLevel.existing.start *= scale;
                rangeOnLevel.existing.end *= scale;
            }
            return rangeOnLevel;
        });
    }

    static arrayToObject(array, keyGen, valueGen) {
        var res = {};

        for (const item of array) {
            res[keyGen(item)] = valueGen(item);
        }
        return res;
    }

    static mapObject(object, keyMap, valueMap) {
        var a = {};

        for (const key in object) {
            // noinspection JSUnfilteredForInLoop
            const newKey = keyMap ? keyMap(key) : key;

            a[newKey] = valueMap ? valueMap(object[key]) : object[key];
        }
        return a;
    }

    static identity(self) {
        return self;
    }

    static mapObjectValues(object, map) {
        var r = [];

        if (map == null) {
            map = this.identity;
        }
        for (const key in object) {
            r.push(map(object[key]));
        }
        return r;
    }

    // todo move to src, use Array.mergeSorted etc instead of heavy array.sort
    static applyDiff(array, diff, copyFn = a => ({levelId: a.levelId})) {
        var result = array.filter(a => diff.removed.findIndex(b => a.start === b.start && a.end === b.end) === -1);

        for (const res of diff.resized) {
            const resultIndex = result.findIndex(r => r.start === res.existing.start && r.end === res.existing.end);

            if (resultIndex !== -1) {
                const resCopy = copyFn(res);

                resCopy.start = res.start;
                resCopy.end = res.end;
                result[resultIndex] = resCopy;
            }
        }
        result = result.concat(diff.added);
        result.sort((a, b) => a.start - b.start);
        return result;
    }

}

module.exports = TestUtil;
