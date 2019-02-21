const OPENING = 0, CLOSING = 1;

module.exports = function check(str, bracketsConfig) {
  str = str.split("");
  if (str.length < 2) {
    return false;
  }
  let brackets = [], currBracketParam, lastBracketParam;
  for (let i = 0; i < str.length; i++) {
    currBracketParam = setBracketParam.call(bracketsConfig, str[i]);
    if (i > 0) {
      lastBracketParam = setBracketParam.call(bracketsConfig, brackets[brackets.length - 1]);
      if (isPair.call(bracketsConfig, lastBracketParam, currBracketParam)) {
        brackets.pop();
        continue;
      }
    }
    if (currBracketParam.state == OPENING) 
      brackets.push(str[i]);
    else 
      return false;
  }
  return !(brackets.length > 0);
}

function setBracketParam(bracket) {
  for (let i = 0; i < this.length; i++) {
    switch(bracket) {
      case (this[i][OPENING]):
        return {type: i, state: OPENING};
      case (this[i][CLOSING]):
        return {type: i, state: CLOSING};
    }
  }
  return {type: -1, state: undefined};
}

function isPair(first, second) {
  if (first.type != second.type)
    return false;
  if (this[first.type][OPENING] == this[second.type][CLOSING])
    return true;
  return first.state == OPENING && second.state == CLOSING;
}