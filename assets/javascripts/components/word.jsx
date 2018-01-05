import React from 'react';

const Word = (props) => {
  let className = "word";
  if (props.inspecting === props.index) {
    className = "word active";
  } else if (props.inspecting !== null && props.startIdx <= props.index && props.endIdx >= props.index) {
    className = "word range"
  }

  return (
    <li className={className}>{props.word}</li>
  )
}

export default Word;
