import words from '../data/profane-words';

function deprofane(input: string): string {
    return words.reduce((a,c ) => a.replace(new RegExp(c, 'ig'), Array(c.length).fill('*').join('')), input)
}

export default deprofane;
