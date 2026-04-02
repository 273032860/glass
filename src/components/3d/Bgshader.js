import {
  abs,
  add,
  atan,
  cos,
  div,
  dot,
  exp,
  float,
  floor,
  Fn,
  fract,
  fwidth,
  hash,
  If,
  int,
  length,
  log,
  Loop,
  mat2,
  mat3,
  max,
  min,
  mix,
  mod,
  mul,
  normalize,
  PI,
  PI2,
  positionWorld,
  pow,
  property,
  select,
  sin,
  smoothstep,
  step,
  sub,
  tan,
  time,
  vec2,
  vec3,
  vec4,
  viewport,
  viewportCoordinate,
  viewportResolution,
} from 'three/tsl';

//穿梭光线
export const lightSpeed = /*#__PURE__*/ Fn(([suv_immutable]) => {
  // forked from https://www.shadertoy.com/view/7ly3D1
  const iTime = time.mul(0.6);
  const suv = vec2(suv_immutable);
  const uv = vec2(length(suv), atan(suv.y, suv.x));
  const offset = float(
    float(0.1)
      .mul(sin(uv.y.mul(10).sub(iTime.mul(0.6))))
      .mul(cos(uv.y.mul(48).add(iTime.mul(0.3))))
      .mul(cos(uv.y.mul(3.7).add(iTime)))
  );
  // 基础射线层：高频正弦波，形成密集的基础线条
  const layer1 = vec3(sin(uv.y.mul(150).add(iTime)).mul(0.15).add(0.5));
  // 动态扰动层：中频正弦波，为线条增加动态变化
  const layer2 = vec3(
    sin(uv.y.mul(80).sub(iTime.mul(0.6)))
      .mul(0.5)
      .add(0.5)
  );
  // 细节增强层：低频正弦波，增加更多视觉细节
  const layer3 = vec3(
    sin(uv.y.mul(45).add(iTime.mul(0.8)))
      .mul(0.5)
      .add(0.5)
  );
  // 扭曲和遮罩层：通过余弦和指数函数制造扭曲和断续效果
  const mask = vec3(sub(1, cos(uv.y.add(mul(22, iTime).sub(pow(uv.x.add(offset), 0.3).mul(60))))));
  // 径向强度层：根据到中心的距离调整射线强度
  const radialIntensity = vec3(uv.x.mul(2));

  // 将所有图层相乘，混合成最终的射线效果
  const rays = layer1.mul(layer2).mul(layer3).mul(mask).mul(radialIntensity);

  // 根据一个低频波来决定使用哪种颜色，从而将光束分成两组
  const colorSelector = sin(uv.y.mul(25.0)); // 这个频率决定了颜色切换的密度

  // 定义图片中的两种颜色：亮绿色和青色
  const greenColor = vec3(0.1, 1.0, 0.2);
  const cyanColor = vec3(0.0, 0.7, 1.0);

  // 使用 step 函数进行硬切换，并用 mix 在两种颜色间选择
  const finalColor = mix(greenColor, cyanColor, step(0.0, colorSelector));

  // 将最终计算出的光线强度应用到选择的颜色上
  return finalColor.mul(rays);
});

//彩虹光
export const rainbow = /*@__PURE__*/ Fn(([suv_immutable]) => {
  //https://www.shadertoy.com/view/WXfczM
  const uv = vec2(suv_immutable);
  const slowing = float(4.0);
  const frequency = float(4);
  const amplitudeLim = float(2);

  //Colors///

  const RGBTime = float(1);
  const colorWidth = float(6);
  const curvature = pow(uv.y.sub(0.5), 2).negate().div(0.5).add(0.5);
  const wave = cos(uv.y.add(time.div(slowing)).mul(frequency)).div(amplitudeLim);
  const line = wave.mul(curvature).add(0.15);

  // line = curvature;

  const centre = vec2(line, uv.y);
  const pos = centre.sub(uv);

  // Equation 1/x gives a hyperbola which is a nice shape to use for drawing glow as
  // it is intense near 0 followed by a rapid fall off and an eventual slow fade

  const dist = div(1, length(pos));

  // Dampen the glow to control the radius

  dist.mulAssign(0.1);

  // Raising the result to a power allows us to change the glow fade behaviour
  // See https://www.desmos.com/calculator/eecd6kmwy9 for an illustration
  // (Move the slider of m to see different fade rates)

  dist.assign(pow(dist, 1.1));
  RGBTime.mulAssign(time);
  const col = dist.mul(
    vec3(
      sin(RGBTime.add(uv.x.mul(colorWidth)))
        .div(2)
        .add(0.5),
      sin(RGBTime.add(uv.x.mul(colorWidth)))
        .negate()
        .div(2)
        .add(0.5),
      cos(RGBTime.add(uv.x.mul(colorWidth)))
        .div(2)
        .add(0.5)
    )
  );
  col.assign(sub(1.0, exp(col.negate())));
  return vec4(col, 1);
});

//水下映射，背景不好看，需单独设置
export const envFunction = Fn(([suv_immutable]) => {
  const up = suv_immutable.y.max(0.0);
  const lightIntensity = float(0.0).toVar();
  If(up.greaterThan(0.0), () => {
    const matrix = mat3(-2 / 3, -1 / 3, 2 / 3, 3 / 3, -2 / 3, 1 / 3, 1 / 3, 2 / 3, 2 / 3);
    const water = vec3(positionWorld.xz.mul(1.5), time.mul(0.5)).toVar();
    //water.x.sub(positionWorld.y);
    //water.addAssign(sin(time.mul(0.2)));
    water.assign(matrix.mul(water));
    const a = vec3(0.5).sub(water.fract()).length().toVar();
    water.assign(matrix.mul(water));
    a.assign(min(a, vec3(0.5).sub(water.fract()).length()));
    //water.assign(matrix.mul(water));
    //a.assign(min(a,vec3(0.5).sub(water.fract()).length()));

    lightIntensity.assign(up.mul(a.add(0.4).pow(8.0).mul(4.0).max(0.0)));
  });

  return vec3(1).mul(lightIntensity);
});

//
export const rocaille = /*@__PURE__*/ Fn(([I]) => {
  const O = vec4().toVar();
  const iTime = time;
  const resolution = vec2(1, 1);
  const p = I.add(I).sub(resolution).div(resolution.y).div(0.2).toVar();

  Loop({ start: 0, end: 9, type: 'float' }, ({ i }) => {
    const v = p;

    Loop({ start: 1, end: 9, name: 'f', type: 'float' }, ({ f }) => {
      v.addAssign(sin(v.yx.mul(f).add(i).add(iTime)).div(f));
    });

    O.addAssign(
      cos(i.add(vec4(0, 1, 2, 3)))
        .add(1)
        .div(6)
        .div(length(v))
    );
  });

  return O;
});

//条纹
const N = float(5);
const R = vec2(1);
const T = time;
const rot = /*@__PURE__*/ Fn(
  ([a]) => {
    return mat2(cos(a), sin(a), sin(a).negate(), cos(a));
  },
  { a: 'float', return: 'mat2' }
);

// const hash21 = /*@__PURE__*/ Fn( ( [ a ] ) => {

// 	a.y.assign( mod( a.y, N.mul( 4. ) ) );
// 	a.x.assign( mod( a.x, N.mul( 4. ) ) );

// 	return fract( sin( dot( a, vec2( 27.609, 57.583 ) ) ).mul( 43758.5453 ) );

// }, { a: 'vec2', return: 'float' } );

export const box = /*@__PURE__*/ Fn(
  ([p, b]) => {
    const q = abs(p).sub(b);

    return min(max(q.x, q.y), 0.0).add(length(max(q, 0.0)));
  },
  { p: 'vec2', b: 'vec2', return: 'float' }
);

const size = float(4);
const hlf = size.div(2);
const dbl = size.mul(2);

export const hue = /*@__PURE__*/ Fn(
  ([t]) => {
    return add(0.4, mul(0.4, cos(PI2.mul(t).add(vec3(2, 1, 0).mul(vec3(1, 0.75, 0.8))))));
  },
  { t: 'float', return: 'vec3' }
);

export const warp = /*@__PURE__*/ Fn(([F]) => {
  const fragColor = vec4().toVar();
  const uv = mul(2, F.xy).sub(R.xy).div(max(R.x, R.y));
  const suv = uv;
  uv.mulAssign(rot(T.negate().mul(0.09)));
  uv.assign(vec2(log(length(uv)), atan(uv.y, uv.x)).negate());
  uv.divAssign(PI);
  uv.mulAssign(N);
  const px = fwidth(uv.x.mul(PI)).div(PI);
  uv.x.addAssign(T.mul(0.25));
  uv.y.addAssign(mul(0.04, sin(uv.x.mul(10).add(T.mul(2.5)))));
  const p = uv.mul(size);
  const q = vec2().toVar();
  const C = vec3(0).toVar();
  const sp = float(0.45).toVar();
  const sl = hlf.mul(0.975).toVar();
  const t = float(1e5).toVar();
  const id = float().toVar();
  const fd = float().toVar();

  Loop({ start: 0, end: 2 }, ({ i }) => {
    If(i.equal(1), () => {
      p.y.addAssign(0.5);
    });

    const cnt = select(i.lessThan(1), size, dbl);
    q.assign(vec2(p.x.sub(cnt), p.y));
    id.assign(floor(q.x.div(dbl)).add(0.5));
    q.x.subAssign(id.mul(dbl));
    fd.assign(floor(q.y).add(float(i)));
    q.y.assign(fract(q.y).sub(0.5));
    t.assign(box(q, vec2(sl, sp)));
    const tc = length(q.sub(vec2(sl, 0))).sub(sp);
    const bc = length(vec2(q.x, abs(q.y).sub(sp)).add(vec2(sl, 0))).sub(0.5);
    t.assign(min(t, tc));
    t.assign(max(t, bc.negate()));
    const hs = hash(vec2(id, fd));
    const h = select(mod(fd.add(float(i)), 2).equal(0), vec3(0.9), hue(hs.add(T.mul(0.1))));
    const CC = mix(h, h.mul(0.3), sub(0.75, q.x.mul(0.4)));
    // C.assign( vec3( hs ));
    C.assign(mix(C, CC, smoothstep(px, px.negate(), t)));
  });

  const m = length(suv.mul(4)).sub(0.25);
  C.assign(mix(C, C.mul(0.1), smoothstep(0.6, 0.0, m)));
  C.assign(pow(C, vec3(0.4545)));
  fragColor.assign(vec4(C, 1.0));
  return fragColor;
});

//
