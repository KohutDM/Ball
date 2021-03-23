class Arrow {
    constructor(ctx, fromX, fromY, length, angle) {
        this.ctx = ctx
        this.fromX = fromX
        this.fromY = fromY
        this.length = length
        this.angle = angle
    }

    draw() {
        let toY = this.fromY + Math.sin(this.angle * Math.PI/180) * this.length
        let toX = this.fromX - Math.cos(this.angle * Math.PI/180) * this.length
        let headlen = 10; // length of head in pixels
        let dx = toX - this.fromX;
        let dy = toY - this.fromY;
        let angle = Math.atan2(dy, dx);
        this.ctx.strokeStyle = 'red'
        let startPoint = this.calcStartPoint(this.fromX, this.fromY, toX, toY, 10)
        this.ctx.moveTo(startPoint[0], startPoint[1]);
        this.ctx.lineTo(toX, toY);
        // this.ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        // this.ctx.moveTo(toX, toY);
        // this.ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke()
    }

//     PointF GetOrtogonalPoint(PointF a, PointF b, float bc)
// {
//     float x2x1 = a.X - b.X;
//     float y2y1 = a.Y - b.Y;
//     float ab = (float)Math.Sqrt(x2x1 * x2x1 + y2y1 * y2y1);
//     float v1x = (b.X - a.X) / ab;
//     float v1y = (b.Y - a.Y) / ab;
//     float v3x = (v1y > 0 ? -v1y : v1y) * bc;
//     float v3y = (v1x > 0 ? v1x : -v1x) * bc;
//
//     PointF c = new PointF();
//     c.X = a.X + v3x;
//     c.Y = a.Y + v3y;
//     return c;
// }
    calcStartPoint(aX, aY, bX, bY, bc) {
        let x2x1 = aX - bX
        let y2y1 = aY - bY
        let ab = Math.sqrt(x2x1 * x2x1 + y2y1 *y2y1)
        let v1x = (bX - aX) / ab
        let v1y = (bY - aY) / ab
        let v3x = (v1y > 0 ? -v1y : v1y) * bc
        let v3y = (v1x > 0 ? -v1x : v1x) * bc
        let cX = aX + v3x
        let cY = aX + v3y
// debugger
        return [cX, cY]
    }
}