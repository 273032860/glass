// Three.js Transpiler r171

import {
  abs,
  color,
  cos,
  float,
  Fn,
  mat2,
  max,
  mix,
  nodeObject,
  PI,
  screenSize,
  screenUV,
  sin,
  smoothstep,
  step,
  texture,
  time,
  triNoise3D,
  vec2,
  vec3,
  vec4,
} from 'three/tsl';

export const canvasCloseY = /*#__PURE__*/ Fn(([tex, range]) => {
  const curtaiMaskY = step(range.mul(0.5), screenUV.y).sub(
    step(range.mul(0.5).oneMinus(), screenUV.y)
  );
  const curtainY = mix(vec4(0.0, 0.0, 0.0, 1.0), tex, curtaiMaskY);

  return curtainY;
});

export const canvasCloseX = /*#__PURE__*/ Fn(([tex, range]) => {
  const curtaiMaskX = step(range.mul(0.5), screenUV.x).sub(
    step(range.mul(0.5).oneMinus(), screenUV.x)
  );
  const curtainX = mix(vec4(0.0, 0.0, 0.0, 1.0), tex, curtaiMaskX);

  return curtainX;
});

//! 闭幕(抖音)
export function canvasCloseYEffect({ range }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        const mask = step(range.mul(0.5), screenUV.y).sub(
          step(range.mul(0.5).oneMinus(), screenUV.y)
        );

        const outColor = mix(vec4(0.0, 0.0, 0.0, 1.0), inputNode, mask);

        return outColor;
      })()
    );
}

export function canvasOpenRotateEffect({ range, rotate }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        const c = cos(rotate);
        const s = sin(rotate);
        const rot = mat2(c, s.negate(), s, c);

        // centered uv
        const uv = screenUV.sub(vec2(0.5));
        const ruv = rot.mul(uv).add(vec2(0.5));

        // ---- FIX: 用区间遮罩，不用 step 差分 ----
        //
        // range = 0 → 完全不遮挡
        // range = 1 → 完全遮挡
        //
        // 遮罩区间：中间 (0.5 - r/2 ~ 0.5 + r/2)
        //
        const half = range.mul(0.5);
        const low = float(0.5).sub(half); // 下界
        const high = float(0.5).add(half); // 上界

        // inside = 1 表示在"开幕"区间（显示 inputNode）
        const inside = step(low, ruv.y).mul(step(ruv.y, high));

        // mask = 1 → 显示 inputNode
        // mask = 0 → 显示黑幕
        const mask = inside;

        const outColor = mix(vec4(0, 0, 0, 1), inputNode, mask);

        return outColor;
      })()
    );
}
//! 横向闭幕
export function canvasCloseRotateYEffect({ range, rotate }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        // rotation matrix
        const c = sin(rotate.mul(PI.div(2)));
        const s = cos(rotate.mul(PI.div(2)));
        const rot = mat2(c, s.negate(), s, c);

        // rotate centered uv
        const uv = screenUV.sub(vec2(0.5)); // center screen uv
        const ruv = rot.mul(uv).add(vec2(0.5)); // rotated uv

        // original Y-close mask but using rotated UV
        const mask = step(range.mul(0.5), ruv.y).sub(step(range.mul(0.5).oneMinus(), ruv.y));

        const outColor = mix(vec4(0.0, 0.0, 0.0, 1.0), inputNode, mask);

        return outColor;
      })()
    );
}
export function canvasCloseRotateXEffect({ range, rotate }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        // rotation matrix
        const c = sin(rotate.mul(PI.div(2)));
        const s = cos(rotate.mul(PI.div(2)));
        const rot = mat2(c, s.negate(), s, c);

        // rotate centered uv
        const uv = screenUV.sub(vec2(0.5)); // center screen uv
        const ruv = rot.mul(uv).add(vec2(0.5)); // rotated uv

        // original Y-close mask but using rotated UV
        const mask = step(range.mul(0.5), ruv.x).sub(step(range.mul(0.5).oneMinus(), ruv.x));

        const outColor = mix(vec4(0.0, 0.0, 0.0, 1.0), inputNode, mask);

        return outColor;
      })()
    );
}
//! 闭幕2 (剪映)
export function canvasCloseXEffect({ range }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        const mask = step(range.mul(0.5), screenUV.x).sub(
          step(range.mul(0.5).oneMinus(), screenUV.x)
        );

        const outColor = mix(vec4(0.0, 0.0, 0.0, 1.0), inputNode, mask);

        return outColor;
      })()
    );
}

export function closeCenterEffect({ range }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        // range: 0 = fully open, 1 = fully closed

        // 与屏幕中心的距离（Y 方向）
        const dist = abs(screenUV.y.sub(0.5)).mul(2.0); // 0 ~ 1

        // 当 dist < range 时被关闭
        const mask = step(range, dist);

        const outColor = mix(vec4(0.0, 0.0, 0.0, 1.0), inputNode, mask);

        return outColor;
      })()
    );
}

export function closeDiagonalEffect({ range }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        // diagonal = 屏幕的对角线方向值
        const diagonal = screenUV.x.add(screenUV.y).mul(0.5); // 0~1

        // 当 diagonal > range 保留，否则遮挡
        const mask = step(range, diagonal);

        const outColor = mix(vec4(0.0, 0.0, 0.0, 1.0), inputNode, mask);

        return outColor;
      })()
    );
}
//! 圆形--------
/**
 * 关闭中心效果-中心圆放大到屏幕-适用屏幕的圆
 * @param {number} range 0 = fully open, 1 = fully closed
 */
export function closeCircleEffect({ range }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        const uv = screenUV.sub(vec2(0.5)); // 中心化
        const dist = uv.length(); // 圆形距离 0-0.707

        // range 控制圆的半径，勾配由你的动画传入
        const mask = step(range, dist);

        const outColor = mix(inputNode, vec4(1.0, 0.0, 0.0, 1.0), mask);

        return outColor;
      })()
    );
}

/**
 * 关闭中心正圆效果
 * @param {number} range 0 = fully open, 1 = fully closed
 */
export function closeCircleEffect2({ range }) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        // 屏幕宽高比
        const aspect = screenSize.x.div(screenSize.y);

        const uv = screenUV.sub(vec2(0.5));
        const correctedUV = vec2(uv.x.mul(aspect), uv.y);

        const dist = correctedUV.length();

        // 最大半径 = 对角线的一半，保证四角被覆盖
        const maxDist = vec2(aspect, 1).length().mul(0.5);

        // mask 从外向内闭幕
        const mask = step(maxDist.sub(range.mul(maxDist)), dist);

        const outColor = mix(inputNode, vec4(0.0, 0.0, 0.0, 1.0), mask);

        return outColor;
      })()
    );
}

export function closeCircleNoiseEffect({
  range,
  noiseScale = 4,
  noiseAmp = 0.2,
  noiseSpeed = 0.05,
} = {}) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        // 屏幕宽高比
        const aspect = screenSize.x.div(screenSize.y);

        const uv = screenUV.sub(vec2(0.5));
        const correctedUV = vec2(uv.x.mul(aspect), uv.y);

        const dist = correctedUV.length();

        // 最大半径 = 对角线的一半，保证四角被覆盖
        const maxDist = vec2(aspect, 1).length().mul(0.5);

        // 基础阈值（与 closeCircleEffect2 一致）
        const threshold = maxDist.sub(range.remap(0, 1, 0, noiseAmp.add(1)));

        // triNoise3D 产生噪声，用 time 驱动 z 分量使边缘动画化
        const nPos = vec3(correctedUV.mul(noiseScale), time.mul(noiseSpeed));
        const n = triNoise3D(nPos).mul(0.5).add(0.5);

        // 将噪声映射为阈值扰动
        const noisyThreshold = threshold.add(n.mul(noiseAmp));

        // mask 从外向内闭幕，使用带噪声的阈值使边缘锯齿化/抖动
        const mask = step(noisyThreshold, dist);

        const outColor = mix(inputNode, vec4(0.0, 0.0, 0.0, 1.0), mask);

        return outColor;
      })()
    );
}
//! 圆形--------

//
export function canvasCloseBottomYEffect({
  range,
  noiseScale = 4,
  noiseAmp = 0.1,
  noiseSpeed = 0.05,
} = {}) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        const rangeRemap = range.sub(noiseAmp).mul(2);
        const dist = screenUV.y.oneMinus();
        const nPos = vec3(screenUV.x.mul(noiseScale), dist.mul(noiseScale), time.mul(noiseSpeed));
        const n = triNoise3D(nPos).mul(0.5).add(0.5);
        const noisy = rangeRemap.add(n.mul(noiseAmp));
        const noisyThreshold = max(rangeRemap, noisy);
        const mask = smoothstep(noisyThreshold, noisyThreshold.add(0.03), dist);
        const bg = vec4(color('#ddddd2'), 1.0);
        const outColor = mix(bg, inputNode, mask);
        return outColor;
      })()
    );
}
//
export function canvasCloseBottomYEffect2({
  uv1,
  range,
  noiseScale = 4,
  noiseAmp = 0.05,
  noiseSpeed = 0.4,
  waveFreq = 12.0,
  waveAmp = 0.08,
  edgeWidth = 0.03,
} = {}) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        const range1 = range.remap(0, 1, -1, 2);
        // 计算屏幕距离（从下往上关闭）
        const dist = uv1.y.oneMinus();

        // 山脉感：用噪声调制波的振幅、频率和相位，让起伏大小不规则
        const ridgePos = vec3(
          uv1.x.mul(noiseScale.mul(0.6)),
          float(0.0),
          time.mul(noiseSpeed).mul(0.4)
        );
        const ridge = triNoise3D(ridgePos).mul(0.5).add(0.5); // 0~1

        const localAmp = waveAmp.mul(ridge.mul(1.4).add(0.4)); // 让振幅有大有小
        const localFreq = waveFreq.mul(ridge.mul(0.7).add(0.6)); // 周期长度也随噪声变化
        const localPhase = ridge.mul(PI); // 相位微偏移

        const wave = sin(uv1.x.mul(localFreq).add(time.mul(noiseSpeed)).add(localPhase)).mul(
          localAmp
        );

        // 叠加额外噪声，打破规则性
        const nPos = vec3(uv1.mul(noiseScale), time.mul(noiseSpeed));
        const n = triNoise3D(nPos).mul(2.0).sub(1.0).mul(noiseAmp);

        // 阈值 = 基础进度 + 波 + 噪声
        const noisyThreshold = range1.add(wave).add(n);

        // 使用 smoothstep 生成平滑的带波动边缘
        const mask = smoothstep(noisyThreshold, noisyThreshold.add(edgeWidth), dist);

        const bg = vec4(color('#ddddd2'), 1.0);
        const outColor = mix(bg, inputNode, mask);
        return outColor;
      })()
    );
}

export function canvasCloseBottomYEffect3({
  uv1,
  range,
  noiseScale = 4,
  noiseAmp = 0.05,
  noiseSpeed = 0.4,
  waveFreq = 12.0,
  waveAmp = 0.08,
  edgeWidth = 0.03,
  foamWidth = 0.06,
  bgColor = '#ddddd2',
  foamColor = '#ffffff',
  mousePos,
  range2,
  wipeOffset = 0.04,
  bgTexture,
} = {}) {
  return (inputNode) =>
    nodeObject(
      Fn(() => {
        const range1 = range.remap(0, 1, -1, 2);

        const dist = uv1.y.oneMinus();

        const ridgePos = vec3(
          uv1.x.mul(noiseScale.mul(0.6)),
          float(0.0),
          time.mul(noiseSpeed).mul(0.4)
        );

        const ridge = triNoise3D(ridgePos).mul(0.5).add(0.5);

        const localAmp = waveAmp.mul(ridge.mul(1.4).add(0.4));
        const localFreq = waveFreq.mul(ridge.mul(0.7).add(0.6));
        const localPhase = ridge.mul(PI);

        const wave = sin(uv1.x.mul(localFreq).add(time.mul(noiseSpeed)).add(localPhase)).mul(
          localAmp
        );

        const nPos = vec3(uv1.mul(noiseScale), time.mul(noiseSpeed));
        const n = triNoise3D(nPos).mul(2.0).sub(1.0).mul(noiseAmp);

        const mouseDist = mousePos.distance(uv1);
        const mousePerturb = smoothstep(0.15, 0.0, mouseDist).mul(0.2);

        const threshold = range1.add(wave).add(n).add(mousePerturb);

        // 主遮罩 (scene)
        const sceneMask = smoothstep(threshold, threshold.add(edgeWidth), dist);

        // foam 遮罩
        const foamMask = smoothstep(threshold.sub(foamWidth), threshold, dist);

        // const bg = vec4(color(bgColor), 1.0);
        const bg = texture(bgTexture, screenUV).mul(bgColor);
        const foam = vec4(color(foamColor), 1.0);
        // bg -> foam
        const base = mix(bg, foam, foamMask);

        // -> scene
        const curtain1Color = mix(base, inputNode, sceneMask);

        // range2 控制从底部切回
        const wipeDist = uv1.y.sub(wipeOffset); // 0 at bottom, 1 at top
        const noisyWipeThreshold = range2.add(wave).add(n).add(mousePerturb);

        // Main reveal mask (shows inputNode)
        const revealMask = smoothstep(
          noisyWipeThreshold,
          noisyWipeThreshold.add(edgeWidth),
          wipeDist
        );

        // Foam mask for the reveal edge
        const revealFoamMask = smoothstep(
          noisyWipeThreshold.sub(foamWidth),
          noisyWipeThreshold,
          wipeDist
        );

        // Mix curtain with foam for the reveal edge
        const colorWithFoam = mix(curtain1Color, foam, revealFoamMask);

        // Mix the result with the final revealed scene
        const finalColor = mix(colorWithFoam, inputNode, revealMask);

        return finalColor;
      })()
    );
}
