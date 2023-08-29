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
    if (b === 0) {
        return a
    }
    return gcd(b, a % b)
}
function analyze(frequencies = []) {
    let ratios = frequencies.map(() => 1)
    let common_frequency = 0
    for (let iteration = 0; iteration < frequencies.length * 20; iteration++) {
        common_frequency = frequencies.map((f, i) => f / ratios[i]).reduce((a, b) => a + b, 0) / frequencies.length

        let error = frequencies.map((f, i) => f - common_frequency * ratios[i])
        let pass = error.every((e) => Math.abs(e) < 5)
        if (pass) break

        let largest_i = 0
        let largest_f = 0
        for (let i = 0; i < frequencies.length; i++) {
            let f = frequencies[i] / (ratios[i] + 1)
            if (f > largest_f) {
                largest_i = i
                largest_f = f
            }
        }
        ratios[largest_i] += 1
    }
    console.log(common_frequency, frequencies)
    console.log(ratios)

    let smallest_ratio = ratios.reduce((a, b) => Math.min(a, b), 0)
    let ratio_emoji = ratio2emoji(smallest_ratio)

    for (let i = 0; i < ratios.length - 1; i++)
        for (let j = i + 1; j < ratios.length; j++) {
            let r1 = ratios[i]
            let r2 = ratios[j]
            let g = gcd(r1, r2)
            r1 /= g
            r2 /= g
            ratio_emoji += ratio2emoji(Math.max(r1, r2))
        }

    return {
        common_frequency,
        ratio_emoji,
        frequencies,
        ratios
    }
}

export default {
    analyze
}