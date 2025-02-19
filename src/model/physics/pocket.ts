import { Ball, State } from "../ball"
import { TableGeometry } from "../../view/tablegeometry"
import { Vector3 } from "three"

export class Pocket {
  pos: Vector3
  radius: number

  constructor(pos, radius) {
    this.pos = pos
    this.radius = radius
  }

  private static willFall(pocket, futurePosition) {
    return futurePosition.distanceTo(pocket.pos) < 0.5 + pocket.radius
  }

  public fall(ball, t) {
    const kb = ball.pos
      .clone()
      .sub(this.pos)
      .normalize()
    ball.vel.addScaledVector(kb, 1 * t)
    ball.vel.z = -1
    ball.state = State.Falling
  }

  static willFallAny(ball: Ball, t: number) {
    let futurePosition = ball.futurePosition(t)
    return (
      ball.onTable() &&
      TableGeometry.pocketCenters.find(p => Pocket.willFall(p, futurePosition))
    )
  }
}
