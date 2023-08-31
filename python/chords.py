import numpy as np
import matplotlib.pyplot as plt


def GCD(*numbers):
    if len(numbers) == 0:
        return 1
    if len(numbers) == 1:
        return numbers[0]
    if len(numbers) == 2:
        if numbers[0] == 0:
            return numbers[1]
        return GCD(numbers[1] % numbers[0], numbers[0])
    return GCD(numbers[0], GCD(*numbers[1:]))


def LCM(*numbers):
    if len(numbers) == 0:
        return 0
    if len(numbers) == 1:
        return numbers[0]
    if len(numbers) == 2:
        gcd = GCD(*numbers)
        return numbers[0] * numbers[1] // gcd
    return LCM(numbers[0], LCM(*numbers[1:]))


print(GCD(12, 15, 30), LCM(12, 15, 30))


def find_ratio_from_pitches(pitches):
    result = []
    pitches = np.array(pitches)
    ratio = np.ones(pitches.shape, int)

    best = None

    for iter in range(40):
        # frequency / (ratio + 1) => take maximum as common frequency
        common_pitch = np.max(pitches - np.log2(ratio+1) * 12)

        # new ratio = frequency / common frequency
        ratio = np.round(2**((pitches - common_pitch)/12)).astype(int)

        # average frequency = mean(frequency/ratio)
        interval = np.log2(ratio)*12
        average_pitch = np.mean(pitches - interval)

        error = average_pitch + interval - pitches

        rmse = np.sqrt(np.mean(error**2))

        gcd = GCD(*ratio)
        lcm = LCM(*ratio)
        complexity = np.log2(lcm/gcd)

        if best is None or rmse < best:
            best = rmse

            if rmse < 0.15 and complexity < 15 and ratio[0] < 15:
                result.append({
                    "ratio": tuple(ratio),
                    "max_error": max_error,
                    "rmse": rmse,
                    "merit": rmse * 77.543 + ratio[0] - 2*complexity,
                    "complexity": complexity,
                    "common_pitch": common_pitch,
                })

    result.sort(key=lambda x: x["merit"])
    return result


test_set = [
    [(0, 4, 7), (4, 5, 6)],
    [(0, 3, 7), (10, 12, 15)],
    [(0, 3, 6), (5, 6, 7)],
    [(0, 4, 8), (12, 15, 19)],
    [(0, 4, 7, 11), (8, 10, 12, 15)],
    [(0, 3, 7, 10), (10, 12, 15, 18)],
    [(0, 4, 7, 9), (12, 15, 18, 20)],

    [(0, 4, 8, 10), (12, 15, 19, 21)],
    [(0, 3, 7, 9), (10, 12, 15, 17)],
    [(0, 3, 7, 11), (10, 12, 15, 19)],
    [(0, 3, 6, 9), (10, 12, 14, 17)],
    [(0, 3, 6, 10), (5, 6, 7, 9)],
]

correct = []
max_error = []
rmse = []
complexity = []
common_frequency = []
r0 = []
merit = []

for pitches, good_ratio in test_set:
    result = find_ratio_from_pitches(pitches)

    good_r = None

    for i, r in enumerate(result):
        if r['ratio'] == good_ratio:
            print('fount at', i)
            good_r = r
            break

    if good_r is None:
        print(result, good_ratio)
        print("answer not found")

    for r in result:
        correct.append(r['ratio'] == good_ratio)
        rmse.append(r['rmse'] - good_r['rmse'])
        r0.append(r['ratio'][0] - good_r['ratio'][0])
        merit.append(r['merit'] - good_r['merit'])
        complexity.append(r['complexity'] - good_r['complexity'])

        if not r['ratio'] == good_ratio:
            print(r['rmse'] - good_r['rmse'])
            print(r['ratio'][0] - good_r['ratio'][0])
            print(r['complexity'] - good_r['complexity'])
            print('  ')
        # correct.append(r['ratio'] == good_ratio)
        # rmse.append(r['rmse'])
        # r0.append(r['ratio'][0])
        # merit.append(r['merit'])
        # complexity.append(r['complexity'])
