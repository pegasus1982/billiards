import { Cushion } from "./cushion"
import { Collision } from "./collision"
import { Ball } from "./ball"

export class Table {
  balls: Ball[]
  pairs: any[] = []

  constructor(balls) {
    this.balls = balls
    this.balls.forEach(a => {
      this.balls.forEach(b => {
        if (a != b) {
          this.pairs.push({ a: a, b: b })
        }
      })
    })
  }

  advance(t) {
    while (!this.prepareAdvanceAll(t)) {}
    this.balls.forEach(a => {
      a.update(t)
    })
  }

  prepareAdvanceAll(t) {
    return !this.pairs.some(pair => !this.prepareAdvancePair(pair.a, pair.b, t))
  }

  private prepareAdvancePair(a, b, t) {
    if (Collision.willCollide(a, b, t)) {
      Collision.collide(a, b)
      return false
    }
    if (Cushion.willBounce(a, t)) {
      Cushion.bounce(a, t)
      return false
    }
    return true
  }
}
