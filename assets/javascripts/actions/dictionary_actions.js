export const RECEIVE_DICTIONARY = 'RECEIVE_DICTIONARY';

export const receiveDictionary = (dictionary, structure) => {
  return {
    type: RECEIVE_DICTIONARY,
    dictionary,
    structure,
  };
};
