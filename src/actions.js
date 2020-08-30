import {INPUT_WORD} from './constants';

export const guessWord = (text) => ({
    type: INPUT_WORD,
    payload: text
});