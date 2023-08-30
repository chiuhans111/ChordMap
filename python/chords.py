import numpy as np
import matplotlib.pyplot as plt


def find_ratio_from_pitches(pitches):
    result = []
    pitches = np.array(pitches)
    ratio = np.ones(pitches.shape, int)

    # frequency / (ratio + 1) => take maximum as common frequency
    common_pitch = np.max(pitches - np.log2(ratio+1) * 12)

    for iter in range(40):


        # new ratio = frequency / common frequency
        # ratio = np.round(2**((pitches - common_pitch)/12)).astype(int)
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

        common_pitch = np.max(pitches - common_pitch + interval)

        # frequency / (ratio + 1) => take maximum as common frequency
        # common_pitch = np.max(pitches - np.log2(ratio+1) * 12)
    return result


result = find_ratio_from_pitches([0, 4])
plt.scatter(
    [r["ratio"][0] for r in result],
    [r["ratio"][1] for r in result]
)
plt.xticks(np.arange(20))
plt.yticks(np.arange(20))
plt.grid()

plt.plot(
    [0, 2**(0/12)*20],
    [0, 2**(4/12)*20]
)

plt.show()
