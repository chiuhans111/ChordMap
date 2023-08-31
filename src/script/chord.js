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

function GCD(a, b) {
    if (Array.isArray(a)) {
        if (a.length == 0) return 1
        if (a.length == 1) return a[0]
        return GCD(a[0], GCD(a.slice(1)))
    }
    if (b === 0) {
        return a
    }
    return GCD(b, a % b)
}

function LCM(a, b) {
    if (Array.isArray(a)) {
        if (a.length == 0) return 0
        if (a.length == 1) return a[0]
        return LCM(a[0], LCM(a.slice(1)))
    }
    return a * b / GCD(a, b)
}

function evaluateRatio(frequencies, simple_ratio) {
    const lcm = LCM(simple_ratio)
    const complexity = Math.log2(lcm)

    const pitch = frequencies.map(f => Math.log2(f) * 12)
    const interval = simple_ratio.map(r => Math.log2(r) * 12)
    const commonPitch = pitch.map((p, i) => p - interval[i]).reduce((a, b) => a + b, 0) / pitch.length
    const commonFrequency = 2 ** (commonPitch / 12)


    const error = pitch.map((p, i) => p - commonPitch - interval[i])
    const rmse = Math.sqrt(error.map(x => x * x).reduce((a, b) => a + b, 0) / error.length)

    const llcm = complexity * 12
    // const meanInterval = interval.reduce((a, b) => a + b, 0) / interval.length
    const isOvertone = Math.min(...interval) <= llcm / 2
    const isUndertone = Math.max(...interval) >= llcm / 2

    // const r0 = Math.min(...ratio)
    const r0 = Math.min(...simple_ratio, ...simple_ratio.map(x => lcm / x))
    const valid = rmse < 0.2 && complexity < 14 && r0 < 20
    const merit = rmse * 98 + r0 + complexity * 0.8

    return { lcm, rmse, r0, complexity, isOvertone, isUndertone, valid, merit, commonFrequency }
}

function analyzeRatio(frequencies = []) {
    let results = []


    if (frequencies.length == 0) return []
    if (frequencies.length == 1) {
        results.push({
            ratio: [1],
            lcm: 1,
            commonFrequency: frequencies[0],
            rmse: 0,
            merit: 0,
            isOvertone: true,
            isUndertone: true
        })
    } else {

        let ratio_cache = {}
        const min_frequency = Math.min(...frequencies)
        let ratio = frequencies.map(f => Math.floor(f / min_frequency))

        // find overtone
        for (let iteration = 0; iteration < 20; iteration++) {
            const guessFrequency = Math.max(...frequencies.map((x, i) => x / (ratio[i] + 1)))
            ratio = frequencies.map(x => Math.round(x / guessFrequency))

            const gcd = GCD(ratio)
            const simple_ratio = ratio.map(x => x / gcd)
            const ratio_hash = simple_ratio.join(':')

            if (!ratio_cache[ratio_hash]) {

                ratio_cache[ratio_hash] = true
                const result = evaluateRatio(frequencies, simple_ratio)

                // console.log(ratio, rmse, complexity, r0)
                if (result.valid) {
                    results.push({
                        ratio: simple_ratio.map(x => x),
                        lcm: result.lcm,
                        commonFrequency: result.commonFrequency,
                        rmse: result.rmse,
                        merit: result.merit,
                        isOvertone: result.isOvertone,
                        isUndertone: result.isUndertone,
                    })
                }
            }
        }

        // find undertone
        const max_frequency = Math.max(...frequencies)
        ratio = frequencies.map(f => Math.floor(max_frequency / f))
        for (let iteration = 0; iteration < 20; iteration++) {
            const guessFrequency = Math.min(...frequencies.map((x, i) => x * (ratio[i] + 1)))
            ratio = frequencies.map(x => Math.round(guessFrequency / x))
            const fake_lcm = ratio.reduce((a, b) => a * b, 1)
            const overtoneRatio = ratio.map(x => Math.round(fake_lcm / x))
            const gcd = GCD(overtoneRatio)
            const simple_ratio = overtoneRatio.map(x => x / gcd)
            const ratio_hash = simple_ratio.join(':')

            if (!ratio_cache[ratio_hash]) {

                ratio_cache[ratio_hash] = true
                const result = evaluateRatio(frequencies, simple_ratio)

                // console.log(ratio, rmse, complexity, r0)
                if (result.valid) {
                    results.push({
                        ratio: simple_ratio.map(x => x),
                        lcm: result.lcm,
                        commonFrequency: result.commonFrequency,
                        rmse: result.rmse,
                        merit: result.merit,
                        isOvertone: result.isOvertone,
                        isUndertone: result.isUndertone,
                    })
                }
            }
        }
    }

    results.sort((a, b) => {
        return a.merit - b.merit
    })

    return results.splice(0, 3)
}


function analyze(frequencies = []) {
    let results = analyzeRatio(frequencies)
    let new_results = []

    // Generate Harmonics
    for (let i = 0; i < results.length; i++) {
        const result = results[i]
        const max_harmonics = i == 0 ? 4 : 1


        if (result.isOvertone)
            for (let harmonics = 1; harmonics <= max_harmonics; harmonics++) {
                new_results.push({
                    ratio: result.ratio.map(r => r * harmonics),
                    lcm: result.lcm,
                    commonFrequency: result.commonFrequency / harmonics,
                    isHigherHarmonics: harmonics > 1,
                    isOvertone: true,
                    isUndertone: false
                })
            }
        if (result.isUndertone)
            for (let harmonics = 1; harmonics <= max_harmonics; harmonics++) {
                new_results.push({
                    ratio: result.ratio,
                    lcm: result.lcm * harmonics,
                    commonFrequency: result.commonFrequency,
                    isHigherHarmonics: harmonics > 1,
                    isOvertone: false,
                    isUndertone: true
                })
            }
    }

    // Generate Hints
    let hints = []
    for (let result of new_results) {

        if (result.isOvertone) {
            let nodes = []
            for (let i = 1; i <= Math.max(result.ratio[result.ratio.length - 1], 35); i++) {
                const frequency = i * result.commonFrequency
                const index = piano.frequency2index(frequency)
                const isKey = result.ratio.includes(i)
                if (index < piano.keyid_start - 1 || index > piano.keyid_end + 1) continue

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
                        "node_is_key": isKey,
                        "node_is_minimize": !isKey && i > 35 || result.isHigherHarmonics,
                        "node_is_overtone": true,
                    }
                })
            }
            hints.push({
                nodes,
                frequencies: result.ratio.map(x => x * result.commonFrequency),
                isHigherHarmonics: result.isHigherHarmonics
            })
        }

        if (result.isUndertone) {
            let nodes = []
            const undertoneRatio = result.ratio.map(x => result.lcm / x)
            for (let i = 1; i <= Math.max(undertoneRatio[undertoneRatio.length - 1], 35); i++) {
                const ratio = result.lcm / i
                const frequency = ratio * result.commonFrequency
                const index = piano.frequency2index(frequency)
                const isKey = undertoneRatio.includes(i)
                if (index < piano.keyid_start - 1 || index > piano.keyid_end + 1) continue

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
                        "node_is_key": isKey,
                        "node_is_minimize": !isKey && i > 35 || result.isHigherHarmonics,
                        "node_is_undertone": true
                    }
                })
            }
            hints.push({
                nodes,
                frequencies: result.ratio.map(x => x * result.commonFrequency),
                isHigherHarmonics: result.isHigherHarmonics
            })
        }



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