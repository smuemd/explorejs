import schema from '../orm/schema';
import {createSelector} from 'reselect';
import {createSelector as ormCreateSelector} from 'redux-orm';

export const ormSelector = state => state.orm;
export const createSession = state => schema.session(ormSelector(state));
const createSessionSelector = (func) => createSelector(ormSelector, ormCreateSelector(schema, func));

export const availableScoreSelector = (state) => state.testing.totalScore - sessionSelector(state).reduce((sum, session) => sum + session.score, 0);

export const scenarioSelector = createSessionSelector(session => session.Scenario.all().toModelArray().map(scenarioModel => ({
  ...scenarioModel.ref,
  sessions: scenarioModel.sessions.all().toRefArray()
})));
export const sessionSelector = createSessionSelector(session => session.Session.all().toRefArray());

/* It's very important to read all ORM models inside ormCreateSelector, otherwise memoization will not notice
 * changed models because no models were marked as accessed.
 * Propably its safe to access outside models referred by sessionBoundModel relations only when you provide
 * refs merged with iterated relations as pure object.
 */

export const scenarioByIdSelector = (state, id) => schema.session(ormSelector(state)).Scenario.withId(id);
export const sessionByIdSelector = (state, id) => schema.session(ormSelector(state)).Session.withId(id);


export const getFirstWhichHasToBeScored = (state) => schema.session(ormSelector(state)).Scenario.all().toModelArray().find(scenario => {
  const sessions = scenario.sessions.all().toRefArray();
  if (sessions.length === 0) {
    return true;
  }
  return sessions[sessions.length - 1].score === null;
});

export const canSurveyBeSent = ({sendState: {loading, completed, error}}) => loading === false && completed === false;
export const isSurveySentInProgress = state => state.sendState.loading;
export const isSurveySent = state => state.sendState.completed;
export const isSurveySendFailed = state => state.sendState.error !== null;
