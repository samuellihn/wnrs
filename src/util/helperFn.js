import seedrandom from "seedrandom";
import * as DECKS from "@src/decks"

export const shuffle = (array, seed) => {
  if (!Array.isArray(array)) return []
  const copy = array.slice(0)
  const rng = new seedrandom(seed)
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const encodeDecks = (decks) => {
  return parseInt(
    Object
    .keys(DECKS)
    .reduce((onehot, deck) => 
      `${decks[deck] ? '1' : '0'}${onehot}`
    , '')
  , 2)
}

export const decodeDecks = (dec) => {
  if (typeof dec === 'string') dec = Math.floor(Number(dec))
  if (isNaN(dec) || dec < 0 || dec > Math.pow(2, DECKS.length)) dec = 1
  const onehot = Math.floor(dec).toString(2).split('')
  return Object
    .keys(DECKS)
    .reduce((acc, deck, idx) => ({
      ...acc,
      [deck]: onehot[onehot.length - idx - 1] === '1'
    }), {})
}

export const getRawQuestion = question => {
  const _question = question.replaceAll('\n', '')
  const _ownItRegex = new RegExp('\\[([^\\]]+)\\]\\(([^)]+)\\)', 'g')
  _question = _question.replaceAll(_ownItRegex, (match, p1, p2) => p2)
  const _hboRegex = new RegExp(' <(.+)>', 'g')
  return _question.replaceAll(_hboRegex, '')
}