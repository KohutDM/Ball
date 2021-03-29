class Circle {
    constructor(ctx, image, circleImageWidth, circleImageHeight, circleRadius, circleX, circleY, speedX = 0, speedY = 0) {
        this.ctx = ctx
        this.circleRadius = circleRadius
        this.circleX = circleX
        this.circleY = circleY
        this.speedX = speedX
        this.speedY = speedY
        this.circleXBeforeMove = this.circleX
        this.circleYBeforeMove = this.circleY
        this.image = image
        this.circleImageWidth = circleImageWidth
        this.circleImageHeight = circleImageHeight
        this.collisionFromStart = 0
        this.rad = 1
        this.updateDistanceAboveTheGround()
    }

    updateDistanceAboveTheGround() {
        this.distanceAboveTheGround = ((this.ctx.canvas.height - 50) - (this.circleY + this.circleRadius)) / 100
    }

    roundSpeedToZero() {
        if (Math.abs(this.speedY) < 0.1) {
            this.speedY = 0
        }
        if (Math.abs(this.speedX) < 0.1) {
            this.speedX = 0
        }
    }

    update (time) {
        if (this.distanceAboveTheGround >= 0) {
            this.speedY += g * time.elapsed / 10
        }
        let circleSY = (this.speedY * 10) * time.elapsed
        let circleSX = (this.speedX * 10) * time.elapsed
        this.circleYBeforeMove = this.circleY
        this.circleXBeforeMove = this.circleX
        this.circleY += circleSY
        this.circleX += circleSX
    }

    draw() {
        let deg = this.speedX * 4
        this.ctx.beginPath();
        this.ctx.globalAlpha = 1;
        // Store the current context state (i.e. rotation, translation etc..)
        this.ctx.save()
        //Convert degrees to radian
        this.rad += deg * Math.PI / 180;
        //Set the origin to the center of the image
        this.ctx.translate(
            this.circleX + this.circleImageWidth / 2 - this.circleRadius,
            this.circleY + this.circleImageHeight / 2 - this.circleRadius
        )
        //Rotate the canvas around the origin
        this.ctx.rotate(this.rad);
        //draw the image
        this.ctx.drawImage(
            this.image,
            this.circleImageWidth / 2 * (-1),
            this.circleImageHeight / 2 * (-1),
            this.circleImageWidth,
            this.circleImageHeight
        )
        // Restore canvas state as saved from above
        this.ctx.restore()
    }
}
