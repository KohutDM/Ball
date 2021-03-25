class Rect {
    constructor(ctx, rectWidth, rectHeight, rectX, rectY, image, name) {
        this.ctx = ctx
        this.rectWidth = rectWidth
        this.rectHeight = rectHeight
        this.rectX = rectX
        this.rectY = rectY
        this.image = image
        this.imagePattern = this.ctx.createPattern(this.image, 'repeat');
        this.name = name
    }

    draw () {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = this.imagePattern
        this.ctx.fillRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    }
}
