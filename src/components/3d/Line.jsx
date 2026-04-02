import * as React from 'react';
import * as THREE from 'three/webgpu';
import { LineSegments2 } from 'three/addons/lines/webgpu/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { Line2 } from 'three/addons/lines/webgpu/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Line2NodeMaterial } from 'three/webgpu';

const fetchDataSync = (jsonUrl) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', jsonUrl, false);
  xhr.send();
  const data = JSON.parse(xhr.responseText);
  return data;
};

/**
 * React 封装组件，用于在 WebGPU 中渲染 THREE.js 的 `Line2` 或 `LineSegments2`。
 * @param {Object} props - Line 组件的属性
 * @param {THREE.Vector3[]} props.points - 构成曲线的三维点数组
 * @param {THREE.ColorRepresentation} [props.color=0xffffff] - 默认线条颜色（如果传入 `vertexColors` 则忽略）
 * @param {THREE.Color[]|boolean} [props.vertexColors=false] - 顶点颜色数组（为 true 时需传入 `THREE.Color` 数组）
 * @param {number} [props.lineWidth=1] - 线条宽度（受 `worldUnits` 控制）
 * @param {boolean} [props.segments=false] - 是否按线段渲染 (`LineSegments2`)
 * @param {number} [props.smoothness=1] - 曲线平滑度，控制 CatmullRomCurve3 的分割数量
 * @param {boolean} [props.worldUnits=true] - 是否使用世界单位作为线宽（false 时使用屏幕像素单位）
 * @param {boolean} [props.alphaToCoverage=true] - 是否开启 alpha-to-coverage 抗锯齿
 * @param {boolean} [props.depthTest=true] - 是否启用深度检测
 * @param {boolean} [props.transparent=false] - 是否支持透明
 * @param {number} [props.opacity=1] - 材质的不透明度
 * @param {boolean} [props.visible=true] - 是否可见
 * @param {boolean} [props.dashed=false] - 是否渲染为虚线
 * @param {number} [props.dashedScale=2] - 虚线缩放系数
 * @param {number} [props.dashedSize=1] - 每个虚线段的长度
 * @param {number} [props.gapSize=1] - 虚线间隔长度
 * @param {number} [props.dashOffset=0] - 虚线偏移量
 * @param {string} [props.jsonUrl] - json线文件
 * @param {React.Ref<THREE.Line2|THREE.LineSegments2>} [props.ref] - 获取底层 `Line2`/`LineSegments2` 实例的 ref
 *
 */
export const Line = function Line({
  points,
  color = 0xffffff,
  vertexColors = false,
  lineWidth = 1,
  smoothness = 1,
  segments = false,
  worldUnits = false,
  alphaToCoverage = true,
  depthTest = true,
  transparent = false,
  opacity = 1,
  visible = true,
  dashed = false,
  dashedScale = 2,
  dashedSize = 1,
  gapSize = 1,
  dashOffset = 0,
  jsonUrl = '',
  ref,
}) {
  // 处理点数据
  const processedPoints = React.useMemo(() => {
    if (jsonUrl) {
      const data = fetchDataSync(jsonUrl);
      return data.points.map((point) => new THREE.Vector3(point.x, point.y, point.z));
    }
    return points;
  }, [points, jsonUrl]);

  const line2 = React.useMemo(
    () => (segments ? new LineSegments2() : new Line2()),
    [segments, smoothness]
  );
  const itemSize = vertexColors?.[0]?.length === 4 ? 4 : 3;
  const lineMaterial = React.useMemo(
    () => new Line2NodeMaterial({ vertexColors: vertexColors, dashed: dashed }),
    [color, lineWidth, vertexColors, dashed]
  );

  const lineGeom = React.useMemo(() => {
    const colors = [];
    const positions = [];
    const curvePoints = processedPoints;
    const geom = segments ? new LineSegmentsGeometry() : new LineGeometry();
    const spline = new THREE.CatmullRomCurve3(curvePoints);
    const divisions = Math.round(smoothness * curvePoints.length);
    const point = new THREE.Vector3();

    const lineColor = new THREE.Color();

    for (let i = 0, l = divisions; i < l; i++) {
      const t = i / l;

      spline.getPoint(t, point);
      positions.push(point.x, point.y, point.z);

      if (vertexColors) {
        const colorIndex = Math.floor(i / 12); // 每 12 个取同一个颜色
        lineColor.copy(vertexColors[colorIndex]);

        colors.push(lineColor.r, lineColor.g, lineColor.b);
      }
    }
    geom.setPositions(positions);
    if (Boolean(vertexColors)) {
      geom.setColors(colors);
    }
    return geom;
  }, [points, segments, vertexColors, itemSize, smoothness]);

  // 更新线条距离
  React.useLayoutEffect(() => {
    line2.computeLineDistances();
  }, [points, line2]);

  // 更新材质属性
  React.useLayoutEffect(() => {
    if (lineMaterial) {
      lineMaterial.worldUnits = worldUnits;
      lineMaterial.alphaToCoverage = alphaToCoverage;
      lineMaterial.depthTest = depthTest;
      lineMaterial.transparent = transparent || itemSize === 4;
      lineMaterial.opacity = opacity;
      lineMaterial.visible = visible;
      lineMaterial.vertexColors = vertexColors;
      lineMaterial.scale = dashedScale;
      lineMaterial.dashSize = dashedSize;
      lineMaterial.gapSize = gapSize;
      lineMaterial.dashOffset = dashOffset;
      lineMaterial.linewidth = lineWidth;

      lineMaterial.needsUpdate = true;
    }
  }, [
    lineMaterial,
    worldUnits,
    alphaToCoverage,
    depthTest,
    transparent,
    opacity,
    visible,
    dashedScale,
    dashedSize,
    gapSize,
    dashOffset,
    lineWidth,
    itemSize,
  ]);

  // 设置线条颜色
  React.useLayoutEffect(() => {
    if (lineMaterial && !vertexColors) {
      lineMaterial.color.set(color);
    }
  }, [lineMaterial, color, vertexColors, smoothness]);

  React.useEffect(() => {
    return () => {
      lineGeom.dispose();
      lineMaterial.dispose();
    };
  }, [lineGeom]);

  return (
    <primitive object={line2} ref={ref} visible={visible}>
      <primitive object={lineGeom} attach="geometry" />
      <primitive object={lineMaterial} attach="material" />
    </primitive>
  );
};
