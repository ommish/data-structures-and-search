export const RECEIVE_SELECTION = 'RECEIVE_SELECTION';

export const receiveSelection = (selection) => {
  return {
    type: RECEIVE_SELECTION,
    selection: {
      [selection]: true,
    },
  };
};
