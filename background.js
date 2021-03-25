class Background {
    constructor(ctx, color, image) {
        this.ctx = ctx
        this.color = color
        this.image = image
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.5
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.image, this.ctx.canvas.width / 2 - this.image.width / 2, 90);
    }
}
