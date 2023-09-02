import numpy as np
points = np.array([[0.059446638383760644,  -4,  -0.6951454184715793],
                   [-4.996003610813204e-16, 2,  0.0],
                   [-5.273559366969494e-16, 4, 1.0]])


p1 = points[0] - points[1]
p2 = points[0] - points[2]

v = np.cross(p1, p2)
# v = v / np.sqrt(np.sum(v**2))
v = v/v[1]
print(v)
