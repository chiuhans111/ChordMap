import piano from './piano'

function ratio2emoji(largest_ratio) {
    let ratio_emoji = "😄"
    if (largest_ratio > 2.5) ratio_emoji = "😀"
    if (largest_ratio > 4.5) ratio_emoji = "😊"
    if (largest_ratio > 5.5) ratio_emoji = "😔"
    if (largest_ratio > 8.5) ratio_emoji = "😞"
    if (largest_ratio > 12.5) ratio_emoji = "😢"
    return ratio_emoji
}

function gcd(a, b) {
    if (Array.isArray(a)) {
        if (a.length <= 1) return a[0]
        return gcd(a[0], gcd(a.slice(1)))
    }
    if (b === 0) {
        return a
    }
    return gcd(b, a % b)
}

function analyzeRatio(frequencies = [], ratio = [], frequencyDifferenceThreshold = 2) {
    let results = []
    let best_mse = null

    if (ratio === null || ratio.length == 0)
        ratio = frequencies.map(() => 1)

    if (frequencies.length == 0) return []
    if (frequencies.length == 1) {
        results.push({
            ratio: [1], commonFrequency: frequencies[0], mse: 0
        })

    } else {

        let commonFrequency = frequencies.reduce((a, b) => Math.min(a, b))
        ratio = frequencies.map(x => Math.floor(x / commonFrequency))


        for (let iteration = 0; iteration < 100; iteration++) {
            let largest_i = 0
            let largest_f = 0
            for (let i = 0; i < frequencies.length; i++) {
                const f = frequencies[i] / (ratio[i] + 1)
                if (f > largest_f) {
                    largest_i = i
                    largest_f = f
                }
            }

            ratio[largest_i] += 1

            const f = frequencies.map((f, i) => f / ratio[i])
            const commonFrequency = f.reduce((a, b) => a + b, 0) / f.length

            const error = frequencies.map((f, i) => f - commonFrequency * ratio[i])
            const mse = Math.sqrt(error.map(x => x * x).reduce((a, b) => a + b, 0))

            if (best_mse == null || mse <= best_mse) {
                if (gcd(ratio) == 1 && mse < 20) {
                    results.push({
                        ratio: ratio.map(x => x), commonFrequency, mse
                    })
                }
                if (best_mse == null || mse < best_mse)
                    best_mse = mse
            }

            if (mse < frequencyDifferenceThreshold) break
        }
    }


    // harmonize
    let new_results = []
    for (let result of results) {

        // if (last_mse !== null && result.mse > last_mse) continue
        for (let harmonics = 1; harmonics <= 20 / result.ratio[result.ratio.length - 1]; harmonics++) {
            new_results.push({
                ratio: result.ratio.map(x => x * harmonics), commonFrequency: result.commonFrequency / harmonics, mse: result.mse
            })
        }
    }

    results = new_results


    for (let result of results) {
        result.key = piano.frequency2index(result.commonFrequency)
        result.keyName = piano.nearestToneName(result.key)
    }

    results.sort((a, b) => {
        return a.mse - b.mse //+ (-a.commonFrequency + b.commonFrequency) * 0.1
    })

    return results.slice(0, 10)
}


function analyze(frequencies = []) {
    let results = analyzeRatio(frequencies)
    let hints = []

    for (let result of results) {
        let nodes = []

        for (let i = 1; i <= result.ratio[result.ratio.length - 1] + 3; i++) {
            const frequency = i * result.commonFrequency
            const index = piano.frequency2index(frequency)
            const isKey = result.ratio.includes(i)
            if (index < piano.keyid_start || index > piano.keyid_end) continue

            nodes.push({
                ratio: i,
                frequency,
                index,
                isKey,
                style: {
                    position: "absolute",
                    left: piano.index2Xoffset(index + 0.5) + "px"
                },
                cssClass: {
                    "node_is_key": isKey
                }
            })
        }

        hints.push({
            nodes
        })

    }


    return {
        frequencies,
        results,
        hints
    }
}

export default {
    analyze, ratio2emoji
}