export default function toUpperFistLetter(string) {
    let [str] = string.split(' ');
    // console.log(str)
    str = `${str.slice(0,1).toUpperCase()}${str.slice(1)}`
    return str
}

export function test() {
    console.log('testing...')
}