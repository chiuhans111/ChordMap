let pianoKeys = []

const toneNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const toneNumber = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6]
const toneIsBlack = [false, true, false, true, false, false, true, false, true, false, true, false]
const f0 = 440 // A4
const toneMap = {}
let keyWidth = 35
for (let i = 0; i < 12; i++) {
    const name = toneNames[i]
    toneMap[name] = i
}

function name2index(key, octave) {
    return toneMap[key] + octave * 12
}

// Create Keys -------------------
const keyid_start = name2index("C", 3)
const keyid_end = name2index("B", 6)

const keyid_A4 = name2index("A", 4)

for (let i = keyid_start; i <= keyid_end; i++) {
    const name = toneNames[i % 12]
    const isBlackKey = toneIsBlack[i % 12]

    const key = {
        name,
        index: i,
        octave: Math.floor(i / 12),
        isWhiteKey: !isBlackKey,
        isBlackKey,
        frequency: f0 * (2 ** ((i - keyid_A4) / 12)),
        enable: false,
        containerStyle: {
            position: "absolute",
        },
        keyStyle: {
            position: "absolute"
        },
        cssClass: {
            "note_is_white": !isBlackKey,
            "note_is_black": isBlackKey,
        }
    }
    pianoKeys.push(key)
}

function index2Xoffset(id) {
    return (id - keyid_start) * keyWidth
}

function updateStyle() {
    const octaveWidth = keyWidth * 12
    const whiteKeyWidth = octaveWidth / 7

    for (let key of pianoKeys) {
        let x = index2Xoffset(key.index)

        // Container x offset
        key.containerStyle.left = x + "px"
        key.containerStyle.width = keyWidth + "px"

        // White key x offset
        if (key.isWhiteKey) {
            const x1 = toneNumber[key.index % 12] * whiteKeyWidth
            const x2 = key.index % 12 * keyWidth
            key.keyStyle.left = x + x1 - x2 + "px"
            key.keyStyle.width = whiteKeyWidth + "px"
        } else {
            key.keyStyle.left = x + "px"
            key.keyStyle.width = keyWidth + "px"
        }
    }
}

updateStyle()

export default {
    pianoKeys: pianoKeys
}