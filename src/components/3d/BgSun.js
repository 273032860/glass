import {
  vec3,
  mix,
  Fn,
  cos,
  sin,
  mat2,
  abs,
  Loop,
  sign,
  dot,
  float,
  property,
  Break,
  If,
  length,
  mul,
  div,
  vec4,
  normalize,
  cross,
  time,
  screenSize,
  uv,
} from 'three/tsl';

export const palette = /*@__PURE__*/ Fn(
  ([d]) => {
    return mix(vec3(0.2, 0.7, 0.9), vec3(1, 0, 1), d);
  },
  { d: 'float', return: 'vec3' }
);

export const rotate = /*@__PURE__*/ Fn(
  ([p, a]) => {
    const c = cos(a);
    const s = sin(a);

    return p.mul(mat2(c, s, s.negate(), c));
  },
  { p: 'vec2', a: 'float', return: 'vec2' }
);

export const map = /*@__PURE__*/ Fn(
  ([p]) => {
    // const pv =
    const pv = vec3(p).toVar();
    Loop({ start: 0, end: 8 }, () => {
      const t = time.mul(0.2);
      pv.xz.assign(rotate(p.xz, t));
      pv.xy.assign(rotate(p.xy, t.mul(1.89)));
      pv.xz.assign(abs(p.xz));
      pv.xz.subAssign(0.5);
    });

    return dot(sign(pv), pv).div(5);
  },
  { p: 'vec3', return: 'float' }
);

export const rm = /*@__PURE__*/ Fn(
  ([ro, rd]) => {
    const t = float(0);
    const col = vec3(0);
    const d = property('float');

    Loop({ start: 0, end: 64, type: 'float' }, ({ i }) => {
      const p = ro.add(rd.mul(t));
      d.assign(map(p).mul(0.5));

      If(d.lessThan(0.02), () => {
        Break();
      });

      If(d.greaterThan(100), () => {
        Break();
      });

      //col+=vec3(0.6,0.8,0.8)/(400.*(d));

      col.addAssign(palette(length(p).mul(0.1)).div(mul(400, d)));
      t.addAssign(d);
    });

    return vec4(col, div(1, d.mul(100)));
  },
  { ro: 'vec3', rd: 'vec3', return: 'vec4' }
);

export const sun = /*@__PURE__*/ Fn(([fragCoord, res]) => {
  const fragColor = vec4().toVar();
  const uv1 = uv().div(10);
  const ro = vec3(0, 0, -50);
  ro.xz.assign(rotate(ro.xz, time));
  const cf = normalize(ro.negate());
  const cs = normalize(cross(cf, vec3(0, 1, 0)));
  const cu = normalize(cross(cf, cs));
  const uuv = ro.add(cf.mul(3)).add(uv1.x.mul(cs)).add(uv1.y.mul(cu));
  const rd = normalize(uuv.sub(ro));
  const col = rm(ro, rd);
  fragColor.assign(col);

  return fragColor;
});
