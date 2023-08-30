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



function analyzeRatio(frequencies = [], ratio = [], frequencyDifferenceThreshold = 0.01) {
    let results = []



    if (ratio === null || ratio.length == 0)
        ratio = frequencies.map(() => 1)

    if (frequencies.length == 0) return []
    if (frequencies.length == 1) {
        results.push({
            ratio: [1], commonFrequency: frequencies[0], mse: 0
        })

    } else {

        let guessFrequency = frequencies.reduce((a, b) => Math.min(a, b))

        let ratio_cache = {}
        let best_mse = null

        for (let iteration = 0; iteration < 30; iteration++) {
            ratio = frequencies.map(x => Math.round(x / guessFrequency))

            const g = gcd(ratio)
            let simple_ratio = ratio.map(x => x / g)
            if (simple_ratio.some(x => x > 35)) break

            const ratio_hash = simple_ratio.join(':')

            if (!ratio_cache[ratio_hash]) {

                ratio_cache[ratio_hash] = true

                const f = frequencies.map((f, i) => f / simple_ratio[i])
                const commonFrequency = f.reduce((a, b) => a + b, 0) / f.length
                const error = frequencies.map((f, i) => Math.log2(f / (commonFrequency * simple_ratio[i])) * 12)
                const mse = Math.sqrt(error.map(x => x * x).reduce((a, b) => a + b, 0))

                if (best_mse === null || mse < best_mse) {
                    if (mse < 1) {
                        results.push({
                            ratio: simple_ratio.map(x => x), commonFrequency, mse
                        })
                    }
                    best_mse = mse
                }

                if (mse < frequencyDifferenceThreshold) {
                    // console.log('break at', iteration)
                    break
                }

            }

            // guessFrequency = frequencies.map(x => x % guessFrequency).reduce((a, b) => Math.max(a, b))
            guessFrequency = frequencies.map((x, i) => x / (ratio[i] + 1)).reduce((a, b) => Math.max(a, b))
        }
    }

    results.sort((a, b) => {
        const mse_diff = a.mse - b.mse
        if (Math.abs(mse_diff) < 0.1) return -a.commonFrequency + b.commonFrequency
        return mse_diff
    })

    // harmonize
    let new_results = []
    for (let result of results) {

        // if (last_mse !== null && result.mse > last_mse) continue
        new_results.push({
            ratio: result.ratio.map(x => x), commonFrequency: result.commonFrequency, mse: result.mse, harmonized: false
        })

        for (let harmonics = 2; harmonics <= Math.min(35 / result.ratio[result.ratio.length - 1], 4); harmonics++) {
            new_results.push({
                ratio: result.ratio.map(x => x * harmonics), commonFrequency: result.commonFrequency / harmonics, mse: result.mse, harmonized: true
            })
        }
    }

    results = new_results


    for (let result of results) {
        result.key = piano.frequency2index(result.commonFrequency)
        result.keyName = piano.nearestToneName(result.key)
    }



    return results
}


function analyze(frequencies = []) {
    let results = analyzeRatio(frequencies)
    let hints = []

    for (let result of results) {
        let nodes = []

        for (let i = 1; i <= Math.max(result.ratio[result.ratio.length - 1], 100); i++) {
            const frequency = i * result.commonFrequency
            const index = piano.frequency2index(frequency)
            const isKey = result.ratio.includes(i)
            if (index < piano.keyid_start - 1 || index > piano.keyid_end + 1) continue

            nodes.push({
                ratio: i,
                // frequency,
                // index,
                // isKey,
                style: {
                    position: "absolute",
                    left: piano.index2Xoffset(index + 0.5) + "px"
                },
                cssClass: {
                    "node_is_key": isKey,
                    "node_is_minimize": !isKey && i > 35 || result.harmonized
                }
            })
        }
        Object.freeze(nodes)

        hints.push({
            nodes,
            frequencies: result.ratio.map(x => x * result.commonFrequency),
            harmonized: result.harmonized
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