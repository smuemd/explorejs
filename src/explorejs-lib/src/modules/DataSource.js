import DynamicProjection from './DynamicProjection';
import WrapperDisplayCache from './WrapperDisplayCache';
/**
 * @typedef {{added:WrapperType[], removed:WrapperType[], resized:WrapperType[]}} WrapperDiffType
 */
export default class DataSource {
    /**
     * @param {SerieCache} serieCache
     * @param callback
     */
    constructor(serieCache, callback) {
        this.serieCache = serieCache;
        this._callback = callback;
        this.onProjectionChange = this.onProjectionChange.bind(this);
        this.dynamicProjection = new DynamicProjection();
        this.dynamicProjection.SerieCache = serieCache;
        this.dynamicProjection.setup(this.onProjectionChange);
        this.wrapperCache = new WrapperDisplayCache(serieCache);
    }

    /**
     * Get data sufficient to update a chart
     * @param diff
     * @return {WrapperDiffType}
     * for new data - special data wrapper: which level, actual range (note that it may be different than aggregation range after projeciton compilation), and actual data point
     */
    getWrapperDiffForProjectionDiff(diff) {
        return this.wrapperCache.update(diff);
    }

    onProjectionChange(diff) {
        //todo gather data from cache for new and resized ranges
        // todo gather only data visible for this viewport (when diff contains ranges exceeding this viewport + padding)
        // every range fill with "data" field with data gathered form cache
        this._callback(diff);
    }

    updateViewState(start, end, width) {
        return this.updateViewStateWithScale(start, end, (end - start) / width);
    }

    updateViewStateWithScale(start, end, scale) {
        // call dynamic projection to rebind for another projection and range
        this.dynamicProjection.updateViewStateWithScale(start, end, scale);
        // call prediction engine to allow it to request new data at specific levels
        // TODO this.predictionEngine.updateViewStateWithScale(start, end, scale);
        // TODO gain already existing cache - to juz sie powiadomi po zaloadowaniu skoro juz zaladowal
        // this is required to have projection range-scoped

    }
}
