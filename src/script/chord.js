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

function odd_part(arr) {
    return arr.map(x => {
        while (x % 2 == 0) x = x >> 1
        return x
    })
}

function evaluateRatio(frequencies, simple_ratio) {
    const lcm = LCM(simple_ratio)
    const log_complexity = Math.log2(lcm)

    const pitch = frequencies.map(f => Math.log2(f) * 12)
    const interval = simple_ratio.map(r => Math.log2(r) * 12)
    const commonPitch = pitch.map((p, i) => p - interval[i]).reduce((a, b) => a + b, 0) / pitch.length
    const commonFrequency = 2 ** (commonPitch / 12)


    const error = pitch.map((p, i) => p - commonPitch - interval[i])
    const rmse = Math.sqrt(error.map(x => x * x).reduce((a, b) => a + b, 0) / error.length)

    const llcm = log_complexity * 12
    // const meanInterval = interval.reduce((a, b) => a + b, 0) / interval.length
    const isOvertone = Math.min(...interval) <= llcm / 2
    const isUndertone = Math.max(...interval) >= llcm / 2

    const reverse_ratio = simple_ratio.map(x => lcm / x)

    const log_min_complexity = Math.log2(LCM(odd_part(simple_ratio)))

    const log_r0 = Math.log2(Math.min(...simple_ratio, ...reverse_ratio))
    const log_r1 = Math.log2(Math.min(
        simple_ratio.reduce((a, b) => a + b) / simple_ratio.length,
        reverse_ratio.reduce((a, b) => a + b) / reverse_ratio.length
    ))

    const valid = rmse < 0.15 && log_complexity < 20 && log_r0 < 6
    const merit =
        + rmse * 0.0025919
        + log_complexity * 0.97270508
        + log_min_complexity * 1.
        + log_r0 * 0.25572689
        + log_r1 * 0.25703505

    return {
        valid,
        merits: {
            rmse, log_complexity, log_min_complexity, log_r0, log_r1
        },
        lcm,
        isOvertone,
        isUndertone,
        merit,
        commonFrequency
    }
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
        for (let iteration = 0; iteration < 50; iteration++) {
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
                        merit: result.merit,
                        isOvertone: result.isOvertone,
                        isUndertone: result.isUndertone,
                        merits: result.merits,
                    })
                }
            }
        }

        // find undertone
        const max_frequency = Math.max(...frequencies)
        ratio = frequencies.map(f => Math.floor(max_frequency / f))
        for (let iteration = 0; iteration < 40; iteration++) {
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

    Object.freeze(results)

    return results.slice(0, 4)
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
                    lcm: result.lcm * harmonics,
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
            const maxRatio = Math.max(35, ...result.ratio)
            for (let i = 1; i <= maxRatio; i++) {
                const frequency = i * result.commonFrequency
                const index = piano.frequency2index(frequency)
                const isKey = result.ratio.includes(i)
                if (index < piano.keyid_start - 1 || index > piano.keyid_end + 1) continue
                if (isKey || i < 100)
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
                            "node_is_factor": result.lcm % i == 0
                        }
                    })
            }
            hints.push({
                nodes, ratio: result.ratio,
                frequencies: result.ratio.map(x => x * result.commonFrequency),
                isHigherHarmonics: result.isHigherHarmonics
            })
        }

        if (result.isUndertone) {
            let nodes = []
            const undertoneRatio = result.ratio.map(x => result.lcm / x)
            const maxRatio = Math.max(35, ...undertoneRatio)
            for (let i = 1; i <= maxRatio; i++) {
                const ratio = result.lcm / i
                const frequency = ratio * result.commonFrequency
                const index = piano.frequency2index(frequency)
                const isKey = undertoneRatio.includes(i)
                if (index < piano.keyid_start - 1 || index > piano.keyid_end + 1) continue

                if (isKey || i < 100)
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
                            "node_is_undertone": true,
                            "node_is_factor": result.lcm % i == 0
                        }
                    })
            }
            hints.push({
                nodes, ratio: result.ratio,
                frequencies: result.ratio.map(x => x * result.commonFrequency),
                isHigherHarmonics: result.isHigherHarmonics
            })
        }



    }

    const result = {
        frequencies,
        results,
        hints
    }

    Object.freeze(result)

    return result
}

export default {
    analyze, ratio2emoji
}