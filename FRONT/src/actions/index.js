export const CHANGE_INPUT = 'CHANGE_INPUT';

export const changeInput = (value, name) => ({
  type: CHANGE_INPUT,
  payload: {
    value,
    name,
  },
});
