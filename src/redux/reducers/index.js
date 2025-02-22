import { ADD_TOURNAMENT_REGISTRATION } from '../actions';

const initialState = [];

export default function registrationsReducer(state = initialState, action) {
  switch (action.type) {
      case ADD_TOURNAMENT_REGISTRATION:
          return [...state, action.payload];
      default:
          return state;
  }
}
