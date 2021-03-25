let backgroundImage = new Image();
backgroundImage.src = "images/gsv.png";
let rectImage = new Image();
rectImage.src = "images/rect2.jpg";
let circleImage = new Image();
circleImage.src = "images/circle.jpg";
setTimeout(start, 100)

function start() {
    let ctx = document.getElementById("circle_rect").getContext("2d");
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight

    let background = new Background(ctx, '#005580', backgroundImage)
    let circle = new Circle(
        ctx,
        circleImage,
        17,
        (ctx.canvas.width / 2) - (17 / 2) - 70,
        17 + 500
    )
    let rimX = (ctx.canvas.width / 2) - (1200 / 2) + 1200 - 280
    let rimY = ctx.canvas.height - 50 - 376 - 143 + 105
    let rimHeight = 20
    let boardX = (ctx.canvas.width / 2) - (1200 / 2) + 1200 - 200
    let rects = [
        // bottom
        new Rect(ctx, 1200, 50, (ctx.canvas.width / 2) - (1200 / 2), ctx.canvas.height - groundYShift, rectImage, 'bottom'),
        // top
        new Rect(ctx, 1200, 50, (ctx.canvas.width / 2) - (1200 / 2), ctx.canvas.height - 890, rectImage, 'top'),
        // right
        new Rect(ctx, 50, 890, (ctx.canvas.width / 2) - (1200 / 2) + 1200 - 50, ctx.canvas.height - 890, rectImage, 'right'),
        // board
        new Rect(ctx, 10, 133, boardX, ctx.canvas.height - 50 - 376 - 143, rectImage, 'board'),
        // rim
        new Rect(ctx, 3, rimHeight,  rimX, rimY, rectImage, 'rim'),
        // left
        new Rect(ctx, 50, 890, (ctx.canvas.width / 2) - (1200 / 2), ctx.canvas.height - 890, rectImage, 'left')
    ]
    let time = {start: 0, elapsed: 0, frequency: frequency}
    time.start = performance.now();
    let arrow = new Arrow(
        ctx,
        circle,
        circle.circleX,
        circle.circleY,
        120,
    )
    document.onmousemove = handleMouseMove
    document.addEventListener("click", function (event) {
        arrow.handleMouseClick()
    })
    function handleMouseMove(event) {
        arrow.handleMouseMove(event)
    }

    requestAnimationFrame(gameLoop)

    function gameLoop(timeStamp) {
        if (loopNumber === 0) {
            debugMode ? console.log(
                `Initial loop: ${loopNumber}; circleX: ${circle.circleX}; circleY: ${circle.circleY}; Distance: ${circle.distanceAboveTheGround.toFixed(2)} m; SpeedX: ${circle.speedX.toFixed(2)} m/s; SpeedY: ${circle.speedY.toFixed(2)} m/s; Time: ${(time.start / 1000).toFixed(2)}`
            ) : null
        }

        time.elapsed = (timeStamp - time.start) / 100
        if (time.elapsed > time.frequency) {
            loopNumber++
            time.start = timeStamp
            if (arrow.isPowerChosen) update()
            draw()
        }
        if (!die) {
            requestAnimationFrame(gameLoop);
        }
    }

    function update() {
        circle.update(time)
        rects.forEach(rect => calcCollision(rect, circle))
        circle.updateDistanceAboveTheGround()
        circle.roundSpeedToZero()
        if (circle.speedY === 0
            && circle.speedX === 0
            && circle.circleY + circle.circleRadius === ctx.canvas.height - groundYShift
        ) {
            die = true

            debugMode ? console.log(
                `Last loop: ${loopNumber}; Distance: ${circle.distanceAboveTheGround.toFixed(2)} m; SpeedX: ${circle.speedX.toFixed(2)} m/s; SpeedY: ${circle.speedY.toFixed(2)} m/s; Time: ${(time.start / 1000).toFixed(2)}`
            ) : null

            return
        }
        debugMode ? console.log(
            `Loop: ${loopNumber}; circleX: ${circle.circleX}; circleY: ${circle.circleY}; Distance: ${circle.distanceAboveTheGround.toFixed(2)} m; SpeedX: ${circle.speedX.toFixed(2)} m/s; SpeedY: ${circle.speedY.toFixed(2)} m/s; Time: ${(time.start / 1000).toFixed(2)}`
        ) : null
        checkScore()
    }

    function checkScore() {
        if (!stopScoreChecking
            && circle.circleX > rimX
            && circle.circleX < boardX
            && circle.circleY > rimY
            && circle.circleY < rimY + rimHeight
            && circle.speedY > 0
        ) {
            debugMode ? console.log('SCORE') : null
            score++
            stopScoreChecking = true
        }
    }

    function draw() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        // draw background
        background.draw()
        // draw rects
        rects.forEach(rect => rect.draw())
        // draw arrow
        arrow.draw()
        // draw circle
        circle.draw()
    }
}
