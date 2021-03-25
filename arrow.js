class Arrow {
    constructor(ctx, circle, fromX, fromY, length, angle = 270) {
        this.ctx = ctx
        this.fromX = fromX
        this.fromY = fromY
        this.length = length
        this.angle = angle
        this.circle = circle
        this.toY = this.fromY + Math.sin(this.angle * Math.PI/180) * this.length
        this.toX = this.fromX - Math.cos(this.angle * Math.PI/180) * this.length
        this.isDirectionChosen = false
        this.isPowerChosen = false
        this.powerIter = 1
    }

    draw() {
        if (!this.isDirectionChosen) {
            this.ctx.globalAlpha = 0.6
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = 'red'
            this.ctx.beginPath();
            this.ctx.arc(this.toX, this.toY, 16, 0, 2 * Math.PI);
            this.ctx.stroke()
            this.ctx.beginPath();
            this.ctx.globalAlpha = 0.3
            this.ctx.lineWidth = 2;
            this.ctx.arc(this.toX, this.toY, 12, 0, 2 * Math.PI);
            this.ctx.stroke()
            this.ctx.beginPath();
            this.ctx.arc(this.toX, this.toY, 8, 0, 2 * Math.PI);
            this.ctx.stroke()
            this.ctx.beginPath();
            this.ctx.moveTo(this.fromX, this.fromY);
            this.ctx.lineTo(this.toX, this.toY);
            this.ctx.stroke()

            return
        }
        if (!this.isPowerChosen) {
            this.powerIter > 180 ? this.powerIter = 180 : null
            this.powerIter < 1 ? this.powerIter = 1 : null
            this.powerIter === 180 ? this.powerUp = false : null
            this.powerIter === 1 ? this.powerUp = true : null
            this.ctx.beginPath()
            this.ctx.globalAlpha = 1
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'red'
            this.ctx.rect(this.toX,this.toY, 15, 180);
            this.ctx.stroke()
            this.ctx.beginPath()
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.toX,this.toY + 180, 15, -this.powerIter);
            this.powerUp ? this.powerIter = this.powerIter + 2 : this.powerIter = this.powerIter - 2
        }
    }

    handleMouseMove(event) {
        if (!this.isDirectionChosen) {
            let aSide = event.clientX - this.fromX
            let bSide = this.fromY - event.clientY
            if (event.clientX > this.fromX && bSide > 0) {
                let cSide = Math.sqrt(aSide * aSide + bSide * bSide)
                this.angle = Math.sin(bSide / cSide) * (340 / Math.PI) + 179
                this.toY = this.fromY + Math.sin(this.angle * Math.PI/180) * this.length
                this.toX = this.fromX - Math.cos(this.angle * Math.PI/180) * this.length
                debugMode ? console.log(`MX:${event.clientX} MY:${event.clientY} aS:${aSide.toFixed(0)} bS:${bSide.toFixed(0)} cS:${cSide.toFixed(0)} angle ${this.angle.toFixed(0)}`) : null
            }
        }
    }

    handleMouseClick(event) {
        if (!this.isDirectionChosen) {
            this.isDirectionChosen = true

            return
        }
        let anglePercent = (this.angle - 180) / 100
        this.circle.speedX = this.powerIter / 10 * (1 -anglePercent)
        this.circle.speedY = -this.powerIter / 10 * ((anglePercent))
        debugMode ? console.log(`Angle percent:${anglePercent * 100} cSpeedX:${this.circle.speedX} cSpeedY:${this.circle.speedY}`) : null
        this.isPowerChosen = true
    }
}
