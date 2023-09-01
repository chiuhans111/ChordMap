import jazz from '../../python/data/apassion4jazz.json'

let chords = []


for (let chord of jazz) {
    let keys = []
    for (let i of chord.value) {
        if (keys.length > 0)
            while (i < keys[keys.length - 1]) i += 12
        keys.push(i)
    }
    chords.push({
        name: chord.name,
        keys: [0, keys.map(x => x - 1)]
    })
}

export default { chords }