import {INPUT_WORD} from './constants';

const initialState = {
    usersWord: ''
}


export const userInput = (state=initialState, action={}) => {
    switch(action.type){
        case INPUT_WORD:
            return Object.assign({}, state, {usersWord : action.payload});
        default:
            return state;
    }
}
