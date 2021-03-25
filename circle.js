class Circle {
    constructor(ctx, image, circleRadius, circleX, circleY, speedX = 0, speedY = 0) {
        this.ctx = ctx
        this.circleRadius = circleRadius
        this.circleX = circleX
        this.circleY = circleY
        this.speedX = speedX
        this.speedY = speedY
        this.circleXBeforeMove = this.circleX
        this.circleYBeforeMove = this.circleY
        this.image = image;
        this.collisionFromStart = 0
        this.imagePattern = this.ctx.createPattern(this.image, 'repeat');
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
        this.ctx.beginPath();
        this.ctx.globalAlpha = 1;
        this.ctx.arc(this.circleX, this.circleY, this.circleRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.imagePattern
        this.ctx.translate(this.circleX + 80, this.circleY + 80);
        this.ctx.fill()
        this.ctx.translate(-this.circleX - 80, -this.circleY - 80);
    }
}
