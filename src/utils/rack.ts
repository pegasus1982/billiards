import { Ball } from "../model/ball"
import { TableGeometry } from "../view/tablegeometry"
import { Vector3 } from "three"

export class Rack {
  static readonly noise = 0.02
  static readonly gap = 1.0 + 2 * Rack.noise
  static readonly up = new Vector3(0, 0, -1)

  private static jitter(pos) {
    return pos
      .clone()
      .add(
        new Vector3(
          Rack.noise * (Math.random() - 0.5),
          Rack.noise * (Math.random() - 0.5),
          0
        )
      )
  }

  static cueBall() {
    return new Ball(new Vector3(-11, 0.0, 0))
  }

  static diamond() {
    let across = new Vector3(0, Rack.gap, 0)
    let diagonal = across.clone().applyAxisAngle(Rack.up, (Math.PI * 1) / 3)
    let pos = new Vector3(TableGeometry.tableX / 2, 0, 0)
    let diamond: Ball[] = []
    
    diamond.push(Rack.cueBall())
    diamond.push(new Ball(Rack.jitter(pos)))
    pos.add(diagonal)
    diamond.push(new Ball(Rack.jitter(pos)))
    pos.sub(across)
    diamond.push(new Ball(Rack.jitter(pos)))
    pos.add(diagonal)
    diamond.push(new Ball(Rack.jitter(pos)))
    pos.sub(across)
    diamond.push(new Ball(Rack.jitter(pos)))
    pos.add(across)
    pos.add(across)
    diamond.push(new Ball(Rack.jitter(pos)))
    pos.add(diagonal).sub(across)
    diamond.push(new Ball(Rack.jitter(pos)))
    pos.sub(across)
    diamond.push(new Ball(Rack.jitter(pos)))
    pos.add(diagonal)
    diamond.push(new Ball(Rack.jitter(pos)))
    return diamond
  }

  static cushion3() {
    let across = new Vector3(0, Rack.gap, 0)
    let diagonal = across.clone().applyAxisAngle(Rack.up, (Math.PI * 1) / 3)
    let pos = new Vector3(TableGeometry.tableX / 2, 0, 0)
    let cushion3: Ball[] = []
    
    cushion3.push(Rack.cueBall())

    cushion3.push(new Ball(Rack.jitter(pos)))
    
    pos.add(diagonal).sub(across)
    cushion3.push(new Ball(Rack.jitter(pos)))
    return cushion3
  }
}
