export default function toUpperFistLetter(string) {
  let [str] = string.split(' ');
  return `${str.slice(0,1).toUpperCase()}${str.slice(1)}`
}