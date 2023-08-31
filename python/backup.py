import numpy as np
import matplotlib.pyplot as plt


def find_ratio_from_pitches1(pitches):
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

        max_error = np.max(error)
        rmse = np.sqrt(np.mean(error**2))

        if best is None or max_error < best:
            best = max_error

            result.append({
                "ratio": ratio,
                "max_error": max_error,
                "rmse": rmse,
                "common_pitch": common_pitch
            })
    return result


def find_ratio_from_pitches2(pitches):
    result = []
    pitches = np.array(pitches)
    ratio = np.ones(pitches.shape, int)

    # frequency / (ratio + 1) => take maximum as common frequency
    common_pitch = np.max(pitches - np.log2(ratio+1) * 12)

    for iter in range(40):

        # new ratio = frequency / common frequency
        ratio = np.floor(2**((pitches - common_pitch)/12)).astype(int)

        # average frequency = mean(frequency/ratio)
        interval = np.log2(ratio)*12
        average_pitch = np.mean(pitches - interval)

        error = average_pitch + interval - pitches

        max_error = np.max(error)
        rmse = np.sqrt(np.mean(error**2))

        result.append({
            "ratio": ratio,
            "max_error": max_error,
            "rmse": rmse,
            "common_pitch": common_pitch
        })

        common_pitch = np.log2(
            np.max(2**(pitches/12) - ratio*2**(common_pitch/12)))*12

    return result


result = find_ratio_from_pitches1([0, 4])
plt.scatter(
    [r["ratio"][0] for r in result],
    [r["ratio"][1] for r in result]
)

result = find_ratio_from_pitches2([0, 4])
plt.scatter(
    [r["ratio"][0] for r in result],
    [r["ratio"][1] for r in result]
)

plt.grid()

plt.plot(
    [0, 2**(0/12)*40],
    [0, 2**(4/12)*40]
)
plt.xlim(0, 40)
plt.ylim(0, 40)


plt.show()
