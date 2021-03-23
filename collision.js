function calcFlyThroughRectCollision(rect, circle) {
    let rectLines = {
        0: {x1: rect.rectX, y1: rect.rectY, x2: rect.rectX + rect.rectWidth, y2: rect.rectY + rect.rectHeight},
        1: {x1: rect.rectX, y1: rect.rectY + rect.rectHeight, x2: rect.rectX + rect.rectWidth, y2: rect.rectY}
        // 0: {x1: rect.rectX, y1: rect.rectY, x2: rect.rectX + rect.rectWidth, y2: rect.rectY},
        // 1: {x1: rect.rectX + rect.rectWidth, y1: rect.rectY, x2: rect.rectX + rect.rectWidth, y2: rect.rectY + rect.rectHeight},
        // 2: {x1: rect.rectX, y1: rect.rectY, x2: rect.rectX, y2: rect.rectY + rect.height},
        // 3: {x1: rect.rectX, y1: rect.rectY + rect.rectHeight, x2: rect.rectX + rect.rectWidth, y2: rect.rectY + rect.rectHeight}
    }
    let circleLines = {
        0: {x1: circle.circleX, y1: circle.circleY - circle.circleRadius, x2: circle.circleXBeforeMove, y2: circle.circleYBeforeMove - circle.circleRadius},
        1: {x1: circle.circleX + circle.circleRadius, y1: circle.circleY, x2: circle.circleXBeforeMove + circle.circleRadius, y2: circle.circleYBeforeMove},
        2: {x1: circle.circleX, y1: circle.circleY + circle.circleRadius, x2: circle.circleXBeforeMove, y2: circle.circleYBeforeMove + circle.circleRadius},
        3: {x1: circle.circleX - circle.circleRadius, y1: circle.circleY, x2: circle.circleXBeforeMove - circle.circleRadius, y2: circle.circleYBeforeMove}
        // 0: {x1: circle.circleX, y1: circle.circleY, x2: circle.circleXBeforeMove, y2: circle.circleYBeforeMove}
    }
    let collisionResult = false
    for (let i = 0; rectLines.hasOwnProperty(i); i++) {
        for (let j = 0; circleLines.hasOwnProperty(j); j++) {
            collisionResult = lineIntersect(
                rectLines[i]['x1'],
                rectLines[i]['y1'],
                rectLines[i]['x2'],
                rectLines[i]['y2'],
                circleLines[j]['x1'],
                circleLines[j]['y1'],
                circleLines[j]['x2'],
                circleLines[j]['y2']
            )
            if (collisionResult) {
                break
            }
        }
        if (collisionResult) {
            break
        }
    }

    return collisionResult
}

function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1<=x2) {
            if (!(x2>=x&&x>=x1)) {return false;}
        } else {
            if (!(x1>=x&&x>=x2)) {return false;}
        }
        if (y1<=y2) {
            if (!(y2>=y&&y>=y1)) {return false;}
        } else {
            if (!(y1>=y&&y>=y2)) {return false;}
        }
        if (x3<=x4) {
            if (!(x4>=x&&x>=x3)) {return false;}
        } else {
            if (!(x3>=x&&x>=x4)) {return false;}
        }
        if (y3<=y4) {
            if (!(y4>=y&&y>=y3)) {return false;}
        } else {
            if (!(y3>=y&&y>=y4)) {return false;}
        }
    }

    // if (!getCrossPoint(x1,y1,x2,y2, x3,y3,x4,y4)) {
    //     return false
    // }

    return true;
}

// function getCrossPoint(x1,y1,x2,y2, x3,y3,x4,y4) {
//     if ( Math.min(x1, x2) >= x3 || Math.max(x1, x2) <= x3
//         || Math.min(y3, y4) >= y1 || Math.max(y3, y4) <= y1) {
//         return false
//     } else
//         return true
// }

function calcCollision(rect, circle) {
    var iter = 0
    // if (collision(rect, circle).length === 0) {
    //     while (calcFlyThroughRectCollision(rect, circle)) {
    if (calcFlyThroughRectCollision(rect, circle)) {
        let tempX = circle.circleXBeforeMove
        let tempY = circle.circleYBeforeMove
        while (collision(rect, circle).length === 0) {
            debugMode ? console.log(`FlyThrough. ${rect.name} rX ${rect.rectX} cY ${circle.circleY} cX ${circle.circleX} cXspeed ${circle.speedX} loop ${iter}`) : null
            debugMode ? iter++ : null
            // circle.speedX = circle.speedX * speedCollisionDecelerateIndex
            // circle.speedY = circle.speedY * speedCollisionDecelerateIndex
            // circle.circleX = circle.circleXBeforeMove + circle.speedX
            // circle.circleY = circle.circleYBeforeMove + circle.speedY
            circle.circleX = tempX + circle.speedX / 10
            circle.circleY = tempY + circle.speedY / 10
            tempX = circle.circleX
            tempY = circle.circleY
            debugMode ? console.log(`Change into ${rect.name} cY ${circle.circleY} cX ${circle.circleX} cXspeed ${circle.speedX} loop ${iter}`) : null
            iter++
            // }
            // }
        }
    }
    let collisions = collision(rect, circle)
    if (collisions.length) {
        collisions = sortByMainCollision(collisions, circle)
        let collisionType = parseInt(collisions.pop())

        debugMode ? console.log(`collisionType: ${collisionType} with ${rect.name}`) : null

        switch (collisionType) {
            case collisionTypes.top:
                circle.speedY = -circle.speedY * speedDecelerateIndexY
                circle.circleY = rect.rectY - circle.circleRadius
                if (circle.circleYBeforeMove === circle.circleY) {
                    circle.speedX = circle.speedX * frictionF
                }
                circle.collisionFromStart++
                circle.onTop = true
                break
            case collisionTypes.right:
                circle.speedX = -circle.speedX * speedDecelerateIndexX
                if (circle.collisionFromStart === 0) {
                    debugMode ? console.log('spin') : null
                    circle.speedY = -circle.speedY * spinYIndex
                    circle.speedX = circle.speedX * spinXIndex
                }
                circle.circleX = rect.rectX + rect.rectWidth + circle.circleRadius + 1
                circle.collisionFromStart++
                break
            case collisionTypes.bottom:
                circle.speedY = -circle.speedY * speedDecelerateIndexY
                circle.circleY = rect.rectY + rect.rectHeight + circle.circleRadius
                circle.collisionFromStart++
                break
            case collisionTypes.left:
                circle.speedX = -circle.speedX * speedDecelerateIndexX
                debugMode ? console.log(`collision from start: ${circle.collisionFromStart}`) : null
                if (circle.collisionFromStart === 0) {
                    debugMode ? console.log('spin') : null
                    circle.speedY = -circle.speedY * spinYIndex
                    circle.speedX = circle.speedX * spinXIndex
                }
                circle.circleX = rect.rectX - circle.circleRadius - 1
                circle.collisionFromStart++
                break
            case collisionTypes.c_inside_r:
                var iter = 0
                var tempX = circle.circleXBeforeMove
                var tempY = circle.circleYBeforeMove
                do {
                    debugMode ? console.log(`Inside ${rect.name} rX ${rect.rectX} cY ${circle.circleY} cX ${circle.circleX + circle.circleRadius} cXspeed ${circle.speedX} loop ${iter}`) : null
                    debugMode ? iter++ : null
                    circle.circleX = tempX + circle.speedX / (iter > 2 ? 10 : 10 * iter)
                    circle.circleY = tempY + circle.speedY / (iter > 2 ? 10 : 10 * iter)
                    tempX = circle.circleX
                    tempY = circle.circleY
                    debugMode ? console.log(`Change into ${rect.name} cY ${circle.circleY} cX ${circle.circleX} cXspeed ${circle.speedX} loop ${iter}`) : null
                    iter++
                } while (collision(rect, circle).hasOwnProperty('top')
                    || collision(rect, circle).hasOwnProperty('right')
                    || collision(rect, circle).hasOwnProperty('bottom')
                    || collision(rect, circle).hasOwnProperty('left')
                    )
                // circle.speedX = circle.speedX * speedDecelerateIndexX
                // circle.speedY = circle.speedY * speedDecelerateIndexY
                // circle.circleX = circle.circleXBeforeMove
                // circle.circleY = circle.circleYBeforeMove
                // calcCollision(rect, circle)
                calcCollision(rect, circle)
                break
            // case collisionTypes.r_inside_c_angle:
            case collisionTypes.r_inside_c:
                var iter = 0
                var tempX = circle.circleXBeforeMove
                var tempY = circle.circleYBeforeMove
                do {
                    debugMode ? console.log(`${rect.name} inside rX ${rect.rectX} cY ${circle.circleY} cX ${circle.circleX + circle.circleRadius} cXspeed ${circle.speedX} loop ${iter}`) : null
                    debugMode ? iter++ : null
                    circle.circleX = tempX + circle.speedX / (iter > 2 ? 10 : 10 * iter)
                    circle.circleY = tempY + circle.speedY / (iter > 2 ? 10 : 10 * iter)
                    tempX = circle.circleX
                    tempY = circle.circleY
                    debugMode ? console.log(`Change into ${rect.name} cY ${circle.circleY} cX ${circle.circleX} cXspeed ${circle.speedX} loop ${iter}`) : null
                    iter++
                } while (collision(rect, circle).hasOwnProperty('top')
                    || collision(rect, circle).hasOwnProperty('right')
                    || collision(rect, circle).hasOwnProperty('bottom')
                    || collision(rect, circle).hasOwnProperty('left')
                    )
                // circle.speedX = circle.speedX * speedCollisionAngleAccelerateXIndex
                // circle.speedY = circle.speedY * speedCollisionDecelerateIndex
                // circle.circleX = circle.circleXBeforeMove
                // circle.circleY = circle.circleYBeforeMove
                calcCollision(rect, circle)
                break
            case collisionTypes.angle:
                // circle.speedY = -circle.speedY * speedDecelerateIndexY
                circle.speedX = -circle.speedX * speedDecelerateIndexY
                circle.circleX = rect.rectX + rect.rectWidth + circle.circleRadius
                circle.collisionFromStart++
                break
            // }
        }
    }

    function collision(rect, circle) {
        // let nearAngleX
        // let nearAngleY
        // let distanceX
        // let distanceY
        // let distance
        let collisions = []

        // collision with top
        if (circle.circleX > rect.rectX
            && circle.circleX < rect.rectX + rect.rectWidth
            && circle.circleY + circle.circleRadius >= rect.rectY
            && circle.circleY - circle.circleRadius <= rect.rectY
        ) {
            collisions[collisionTypes.top] = collisionTypes.top
        }
        // collision with bottom
        if (circle.circleX > rect.rectX
            && circle.circleX < rect.rectX + rect.rectWidth
            && circle.circleY - circle.circleRadius <= rect.rectY + rect.rectHeight
            && circle.circleY + circle.circleRadius >= rect.rectY + rect.rectHeight
        ) {
            collisions[collisionTypes.bottom] = collisionTypes.bottom
        }
        // collision with left
        if (circle.circleY > rect.rectY
            && circle.circleY < rect.rectY + rect.rectHeight
            && circle.circleX + circle.circleRadius > rect.rectX
            && circle.circleX - circle.circleRadius < rect.rectX
        ) {
            collisions[collisionTypes.left] = collisionTypes.left
        }
        // collision with right
        if (circle.circleY > rect.rectY
            && circle.circleY < rect.rectY + rect.rectHeight
            && circle.circleX - circle.circleRadius <= rect.rectX + rect.rectWidth
            && circle.circleX + circle.circleRadius >= rect.rectX + rect.rectWidth
        ) {
            collisions[collisionTypes.right] = collisionTypes.right
        }
        // collision rect inside circle
        if (collisions.hasOwnProperty('top')
            && collisions.hasOwnProperty('right')
            && collisions.hasOwnProperty('bottom')
            && collisions.hasOwnProperty('left')
        ) {
            collisions[collisionTypes.r_inside_c] = collisionTypes.r_inside_c
        }
        // collision circle inside rect
        if (circle.circleX > rect.rectX
            && circle.circleX < rect.rectX + rect.rectWidth
            && circle.circleY > rect.rectY
            && circle.circleY < rect.rectY + rect.rectHeight
        ) {
            collisions[collisionTypes.c_inside_r] = collisionTypes.c_inside_r
        }
        if (circle.circleX < rect.rectX
            || circle.circleX - rect.rectX < rect.rectX + rect.rectWidth - circle.circleX
        ) {
            nearAngleX = rect.rectX
        } else if (circle.circleX > rect.rectX + rect.rectWidth
            || circle.circleX - rect.rectX >= rect.rectX + rect.rectWidth - circle.circleX
        ) {
            nearAngleX = rect.rectX + rect.rectWidth
        }
        if (circle.circleY < rect.rectY
            || circle.circleY - rect.rectY < rect.rectY + rect.rectHeight - circle.circleY
        ) {
            nearAngleY = rect.rectY
        } else if (circle.circleY > rect.rectY + rect.rectHeight
            || circle.circleY - rect.rectY >= rect.rectY + rect.rectHeight - circle.circleY
        ) {
            nearAngleY = rect.rectY + rect.rectHeight
        }
        distanceX = circle.circleX - nearAngleX
        distanceY = circle.circleY - nearAngleY
        distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))

        // collision angle
        if (distance <= circle.circleRadius && !collisions.hasOwnProperty(collisionTypes.c_inside_r)) {
            collisions[collisionTypes.angle] = collisionTypes.angle
        }

        return collisions
    }

    function sortByMainCollision(collisions, circle) {
        // moving up
        if (circle.speedY < 0 && circle.speedX === 0) {
            if (collisions[collisionTypes.bottom]) {
                collisions.splice(0, collisions.length)
                collisions[collisionTypes.bottom] = collisionTypes.bottom
            }

            // return
        }
        // moving right and up
        if (circle.speedY < 0 && circle.speedX > 0) {
            if (collisions[collisionTypes.left]) {
                collisions.splice(0, collisions.length)
                collisions[collisionTypes.left] = collisionTypes.left
            }

            // return collisions
        }
        // moving right
        if (circle.speedY === 0 && circle.speedX > 0) {
            if (collisions[collisionTypes.left]) {
                collisions.splice(0, collisions.length)
                collisions[collisionTypes.left] = collisionTypes.left
            }

            // return collisions
        }
        // moving right and down
        if (circle.speedY > 0 && circle.speedX > 0) {
            if (collisions[collisionTypes.left]) {
                collisions.splice(0, collisions.length)
                collisions[collisionTypes.left] = collisionTypes.left
            }

            // return collisions
        }
        // moving down
        if (circle.speedY > 0 && circle.speedX === 0) {
            if (collisions[collisionTypes.top]) {
                collisions.splice(0, collisions.length)
                collisions[collisionTypes.top] = collisionTypes.top
            }

            // return collisions
        }
        // moving left and down
        if (circle.speedY > 0 && circle.speedX < 0) {
            if (collisions[collisionTypes.right]) {
                collisions.splice(0, collisions.length)
                collisions[collisionTypes.right] = collisionTypes.right
            }

            // return collisions
        }
        // moving left
        if (circle.speedY === 0 && circle.speedX < 0) {
            if (collisions[collisionTypes.right]) {
                collisions.splice(0, collisions.length)
                collisions[collisionTypes.right] = collisionTypes.right
            }

            // return collisions
        }
        // moving left and up
        if (circle.speedY < 0 && circle.speedX < 0) {
            if (collisions[collisionTypes.right]) {
                collisions.splice(0, collisions.length)
                collisions[collisionTypes.right] = collisionTypes.right
            }

            // return collisions
        }
        // set angle collision
        // if (collisions[collisionTypes.r_inside_c_angle]) {
        //     // debugger
        //     collisions.splice(0, collisions.length)
        //     collisions[collisionTypes.r_inside_c_angle] = collisionTypes.r_inside_c_angle
        // }

        return collisions
    }
}