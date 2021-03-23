const g = 9.8
const frictionF = 0.894
const speedDecelerateIndexY = 0.894
const speedDecelerateIndexX = 0.90
const frequency = 1 / 60
const collisionTypes = {
    'top': 1,
    'right': 2,
    'bottom': 3,
    'left': 4,
    'c_inside_r': 5,
    'r_inside_c': 6,
    'angle': 7
}
const collisionTypesNames = [
    'top', 'right', 'bottom', 'left', 'c_inside_r', 'r_inside_c', 'angle'
]
const debugMode = true
const groundYShift = 50
const spinYIndex = 1.7
const spinXIndex = 0.7
let loopNumber = 0
let score = 0
let stopScoreChecking = false
let die = false