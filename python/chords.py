import numpy as np
import matplotlib.pyplot as plt
from math import gcd
from functools import reduce


def GCD(*numbers):
    return reduce(gcd, numbers)


def LCM(*numbers):
    def lcm(a, b):
        return abs(a * b) // gcd(a, b)
    return reduce(lcm, numbers, 1)


print(GCD(12, 15, 30), LCM(12, 15, 30))


def odd_part(arr):
    arr = np.array(arr).astype(int)
    while np.any(arr % 2 == 0):
        arr[arr % 2 == 0] //= 2
    return arr


def evaluate_ratio(norm_pitches, ratio):
    # Calculate Error
    interval = np.log2(ratio)*12
    average_pitch = np.mean(norm_pitches - interval)

    error = average_pitch + interval - norm_pitches
    mse = np.mean(error**2)
    rmse = np.sqrt(mse)

    if rmse > 0.15:
        return False, {}

    # Calculate Other Merit Functions
    lcm = LCM(*ratio)
    log_complexity = np.log2(lcm)

    if log_complexity > 20:
        return False, {}

    r_ratio = lcm//ratio

    log_min_complexity = np.log2(LCM(*odd_part(ratio)))

    log_r0 = np.log2(min(np.min(ratio), np.min(r_ratio)))

    if log_r0 > 5:
        return False, {}

    log_r1 = np.log2(min(np.mean(ratio), np.mean(r_ratio)))
    log_r2 = np.log2(min(np.max(ratio), np.max(r_ratio)))

    # (Xenharmonic 2016) the Kees height
    log_kh = np.log2(np.max(odd_part(ratio)))

    # Calculate Pairwise Complexity
    log_pairwise_complexity = 0
    num = 0

    for i in range(len(ratio)-1):
        for j in range(i, len(ratio)):
            A = ratio[i]
            B = ratio[j]
            log_pairwise_complexity += np.log2(
                LCM(A, B) / GCD(A, B))
            num += 1

    log_pairwise_complexity /= num

    merit = (
        + mse * 6.62147155e-04
        + rmse * 3.90018849e-03
        + log_complexity * 9.70659758e-01
        + log_min_complexity * 1.00000000e+00
        + log_pairwise_complexity * 3.54419905e-01
        + log_r0 * 2.82815240e-01
        + log_r1 * 2.84792302e-01
        + log_r2 * 2.83385978e-01
        + log_kh * 1.97172432e-01
    )

    return True, {
        "merit": merit,
        "merits": {
            # "mse": mse,
            "rmse": rmse,
            "log_complexity": log_complexity,
            "log_min_complexity": log_min_complexity,
            # "log_pairwise_complexity": log_pairwise_complexity,
            'log_r0': log_r0,
            'log_r1': log_r1,
            # 'log_r2': log_r2,
            # 'log_kh': log_kh,
        },
        "ratio_tuple1": tuple(ratio),
        "ratio_tuple2": tuple(r_ratio),
    }


def find_ratio_from_pitches(pitches):
    result = []
    cache = set()
    pitches = np.array(pitches)

    for is_overtone in [True, False]:
        base_pitch = np.min(pitches)
        norm_pitches = pitches - base_pitch
        ratio = np.round(2 ** (pitches / 12)).astype(int)

        for iteration in range(60):
            # frequency / (ratio + 1) => take maximum as common frequency
            common_pitch = np.max(norm_pitches - np.log2(ratio+1) * 12)

            # new ratio = frequency / common frequency
            ratio = np.round(2**((norm_pitches - common_pitch)/12)).astype(int)
            ratio = np.maximum(1, ratio)

            # average frequency = mean(frequency/ratio)

            gcd = GCD(*ratio)

            if gcd > 1:
                continue

            simple_ratio = ratio // gcd
            ratio_hash1 = tuple(sorted(simple_ratio))

            if ratio_hash1 in cache:
                continue

            valid, merit = evaluate_ratio(norm_pitches, simple_ratio)

            if not valid:
                continue

            ratio_tuple1 = merit['ratio_tuple1']
            ratio_tuple2 = merit['ratio_tuple2']

            ratio_result = ratio_tuple1 if is_overtone else ratio_tuple2

            ratio_hash2 = tuple(sorted(ratio_tuple2))

            cache.add(ratio_hash1)
            cache.add(ratio_hash2)

            result.append({
                "ratio": ratio_result,
                "ratio1": ratio_tuple1,
                "ratio2": ratio_tuple2,
                "common_pitch": common_pitch + base_pitch if is_overtone else - common_pitch - base_pitch,
                "is_overtone": is_overtone,
                "merit": merit['merit'],
                "iteration": iteration,
                "merits": merit['merits']
            })

        # invert the pitches
        pitches = -pitches

    result.sort(key=lambda x: x["merit"])
    return result


test_set = [
    [[0, 7], [2, 3]],  # perfect fifth
    [[0, 4, 7], [4, 5, 6]],  # Major
    [[0, 3, 7], [10, 12, 15]],  # Minor
    [[0, 5, 7], [6, 8, 9]],  # sus 4
    [[0, 2, 7], [8, 9, 12]],  # sus 2
    [[0, 3, 6], [5, 6, 7]],  # Diminished
    [[0, 4, 8], [16, 20, 25]],  # Augmented
    [[0, 4, 7, 11], [8, 10, 12, 15]],  # M7
    [[0, 3, 7, 10], [10, 12, 15, 18]],  # m7
    [[0, 4, 7, 10], [4, 5, 6, 7]],  # 7
    [[0, 4, 7, 9], [12, 15, 18, 20]],  # M6

    [[0, 4, 8, 10], [112, 140, 175, 200]],  # Aug7
    [[0, 3, 7, 9], [70, 84, 105, 120]],  # m6
    # [[0, 3, 7, 9], [10, 12, 15, 17]],  # m6
    [[0, 3, 7, 11], [40, 48, 60, 75]],  # mM7
    [[0, 3, 6, 9], [30, 35, 42, 50]],  # Dim7
    # [[0, 3, 6, 10], [5, 6, 7, 9]],  # HalfDim7
    [[0, 3, 6, 10], [60, 70, 84, 105]],  # HalfDim7
    [[0, 3, 7, 14], [20, 24, 30, 45]],  # m add 9

    [[0, 3, 7, 10, 14], [20, 24, 30, 36, 45]],  # m9
    [[0, 4, 7, 11, 14], [8, 10, 12, 15, 18]],  # M9
    [[0, 3, 7, 11, 14], [20, 24, 30, 38, 45]],  # mM9

    [[0, 4, 7, 10, 14, 17], [8, 10, 12, 14, 18, 21]],  # 11
    [[0, 3, 7, 10, 14, 17], [20, 24, 30, 36, 45, 54]],  # m11
    [[0, 4, 7, 11, 14, 17], [8, 10, 12, 15, 18, 21]],  # M11
    [[0, 3, 7, 11, 14, 17], [20, 24, 30, 38, 45, 54]],  # mM11

    [[0, 4, 7, 10, 14, 21], [8, 10, 12, 14, 18, 27]],  # 13
    [[0, 3, 7, 10, 14, 21], [40, 48, 60, 72, 90, 135]],  # m13
    [[0, 3, 7, 11, 14, 21], [350, 420, 525, 672, 800, 1200]],  # mM13

    # Other
    [[0, 15, 19, 22, 26], [10, 24, 30, 36, 45]],

]

correct = []
size = []
merits = {}


for pitches, good_ratio in test_set:
    good_ratio = tuple(good_ratio)
    result = find_ratio_from_pitches(pitches)

    good_r = None
    good_i = None

    print()
    print("solving", pitches, "----------------------")

    # Find good result
    for i, r in enumerate(result):
        if r['ratio'] == good_ratio:
            print('fount at', i, ", is overtone:",
                  r['is_overtone'], "iteration", r['iteration'])
            good_r = r
            good_i = i
            break

    if good_r is None:
        print("answer not found")
        for j in range(len(result)):
            print(result[j]['ratio'],
                  LCM(*result[j]['ratio']) / np.array(result[j]['ratio']))
            for key, value in result[j]['merits'].items():
                print("  ", key, value)

        continue

    if good_i > 0:
        for j in range(good_i+1):
            print(result[j]['ratio'],
                  LCM(*result[j]['ratio']) / np.array(result[j]['ratio']))
            for key, value in result[j]['merits'].items():
                print("  ", key, value)

    for r in result:

        size.append(50 if (r['ratio'] == good_ratio) else 5)

        correct.append(r['ratio'] == good_ratio)

        flag = True
        for key, value in r['merits'].items():
            if key not in merits:
                merits[key] = {'value': [], 'delta': []}
            merits[key]['delta'].append(value - good_r['merits'][key])
            merits[key]['value'].append(value)

            if value - good_r['merits'][key] == 0 and not r['ratio'] == good_ratio:
                pass
            else:
                flag = False

        if flag:
            pass
v = []

correct = np.array(correct)

for key, value in merits.items():
    merits[key]['value'] = np.array(value['value'])
    merits[key]['delta'] = np.array(value['delta'])

    print(key, np.max(merits[key]['value'][correct]),
          np.max(merits[key]['value']))

    v.append(merits[key]['delta'][~correct])

input("enter to run weight optimization")

v = np.array(v)
v = v / np.sqrt(np.sum(v**2, 0, keepdims=True))


def differential_evolution(fitness_func, n_dim, NP=40, CR=0.75, F=0.8, N_iter=200000):
    population = np.random.uniform(-5, 5, (NP, n_dim))
    for i in range(NP):
        x = population[i]
        x = x / np.sqrt(np.sum(x**2))
        x = np.abs(x)
        population[i] = x

    best = 0
    besty = 0

    for iter in range(N_iter):
        for i in range(NP):
            x = population[i]

            idx = np.random.choice(
                [j for j in range(NP) if j != i], 3, replace=False)
            a, b, c = population[idx]
            R = np.random.randint(0, n_dim)

            y = np.where(np.random.rand(n_dim) < CR, a + F * (b - c), x)
            y[R] = a[R] + F * (b[R] - c[R])

            y = y / np.sqrt(np.sum(y**2))
            y = np.abs(y)

            fy = fitness_func(y)

            if fy >= fitness_func(x):
                if fy > best:
                    best = fy
                    besty = y/np.max(np.abs(y))

                population[i] = y

        if iter % 100 == 0:
            print(iter, best, besty)

    return population[np.argmin([fitness_func(agent) for agent in population])]


def fitness_func(x):
    x = x / np.sqrt(np.sum(x**2))
    dot_result = np.sum(v * x[:, None], 0)
    mean_score = np.mean(np.minimum(1, np.maximum(-1, dot_result)))
    score = np.mean(dot_result > 0) + mean_score/dot_result.shape[0]/2

    return score


best = differential_evolution(fitness_func, v.shape[0])

print(best/np.max(np.abs(best)))
print(best/np.min(np.abs(best)))
