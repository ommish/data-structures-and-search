import React from 'react';

const Word = (props) => {
  return (
    <li className={props.inspecting === props.index ? "word active" : "word"}>{props.word}</li>
  )
}

export default Word;
