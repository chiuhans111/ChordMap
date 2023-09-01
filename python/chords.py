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

        if rmse < 0.2 and complexity < 14 and ratio[0] < 20:
            result.append({
                "ratio": tuple(ratio),
                "max_error": max_error,
                "rmse": rmse,
                "merit": rmse * 101.314 + ratio[0] + complexity*1.155,
                "complexity": complexity,
                "common_pitch": common_pitch,
            })

    result.sort(key=lambda x: x["merit"])
    return result


test_set = [
    [[0, 7], [2, 3]],  # perfect fifth
    [[0, 4, 7], [4, 5, 6]],  # Major
    [[0, 3, 7], [10, 12, 15]],  # Minor
    [[0, 5, 7], [6, 8, 9]],  # sus 4
    [[0, 2, 7], [8, 9, 12]],  # sus 2
    [[0, 3, 6], [5, 6, 7]],  # Diminished
    [[0, 4, 8], [12, 15, 19]],  # Augmented
    [[0, 4, 7, 11], [8, 10, 12, 15]],  # M7
    [[0, 3, 7, 10], [10, 12, 15, 18]],  # m7
    [[0, 4, 7, 10], [12, 15, 18, 20]],  # 7
    [[0, 4, 7, 9], [12, 15, 18, 20]],  # M6

    [[0, 4, 8, 10], [12, 15, 19, 21]],  # Aug7
    [[0, 3, 7, 9], [10, 12, 15, 17]],  # m6
    [[0, 3, 7, 11], [10, 12, 15, 19]],  # mM7
    [[0, 3, 6, 9], [10, 12, 14, 17]],  # Dim7
    [[0, 3, 6, 10], [5, 6, 7, 9]],  # HalfDim7
    [[0, 3, 7, 14], [20, 24, 30, 45]],  # m add 9

    [[0, 3, 7, 10, 14], [20, 24, 30, 36, 45]],  # m9
    [[0, 4, 7, 11, 14], [8, 10, 12, 15, 18]],  # M9
    [[0, 3, 7, 11, 14], [16, 19, 24, 30, 36]],  # mM9

    [[0, 4, 7, 10, 14, 17], [8, 10, 12, 14, 18, 21]],  # 11
    [[0, 3, 7, 10, 14, 17], [10, 12, 15, 18, 23, 27]],  # m11
    [[0, 4, 7, 11, 14, 17], [8, 10, 12, 15, 18, 21]],  # M11
    [[0, 3, 7, 11, 14, 17], [16, 19, 24, 30, 36, 42]],  # mM11

    [[0, 4, 7, 10, 14, 21], [8, 10, 12, 14, 18, 27]],  # 13
    [[0, 3, 7, 10, 14, 21], [12, 14, 18, 21, 27, 40]],  # m13
    [[0, 3, 7, 11, 14, 21], [16, 19, 24, 30, 36, 54]],  # mM13
    # Other
    [[0, 15, 19, 22, 26], [5, 12, 15, 18, 23]],

]

correct = []
max_error = []
rmse = []
complexity = []
common_frequency = []
r0 = []
merit = []
size = []

for pitches, good_ratio in test_set:
    good_ratio = tuple(good_ratio)
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

        size.append(50 if (r['ratio'] == good_ratio) else 5)

        correct.append(r['ratio'] == good_ratio)
        rmse.append(r['rmse'] - good_r['rmse'])
        r0.append(r['ratio'][0] - good_r['ratio'][0])
        merit.append(r['merit'] - good_r['merit'])
        complexity.append(r['complexity'] - good_r['complexity'])

        # correct.append(r['ratio'] == good_ratio)
        # rmse.append(r['rmse'])
        # r0.append(r['ratio'][0])
        # merit.append(r['merit'])
        # complexity.append(r['complexity'])

correct = np.array(correct)
rmse = np.array(rmse)
r0 = np.array(r0)
complexity = np.array(complexity)


v = np.array([
    rmse,
    r0,
    complexity
])[:, ~correct]


v_candidates = []

for i in range(5000):
    vp = np.random.standard_normal(3)*2+[98, 1, 0.798]
    vp = vp / np.sqrt(np.sum(vp**2))

    if np.all(np.sum(v * vp[:, None], 0) > 0):
        v_candidates.append(vp)

print("average over", len(v_candidates), "candidates")
weights = np.mean(v_candidates, 0)
print(weights / weights[1])

plt.scatter(rmse, r0, c=correct, s=size)
plt.show()
