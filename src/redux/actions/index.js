export const ADD_TOURNAMENT_REGISTRATION = 'ADD_TOURNAMENT_REGISTRATION';

export function addRegistration(name, email) {
  return { type: ADD_TOURNAMENT_REGISTRATION, payload: { name, email } };
}
