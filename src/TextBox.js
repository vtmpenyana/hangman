import React from 'react';

const TextBox = ({onSearchChange}) => {  
    return(
        <div>
            <input 
            id='inputField'
            onChange={onSearchChange}
            className='input-reset ba b--black-20 pa2 mb2'
            type='text' 
            placeholder='guess the word'
             />
        </div>
    )
}

export default TextBox;