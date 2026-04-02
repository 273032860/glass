import { useEffect, useRef, useState } from "react";
import { Color, DirectionalLightHelper } from "three/webgpu";
import { useHelper } from "@react-three/drei";
import { button, useControls } from "leva";

export function DirectionalLight({
  levaname = '日光',
  settings = {},
  debug = false,
  ...props
}) {
  const [
    {
      color : colorL = 'white',
      intensity = 1,
      position = [0, 2, 0],
      target = [0, 0, 0],
      castShadow = true,
      isHelper = true,
      visible = true,
      shadowMapSize = 512,
      shadowRadius = 1.0,
      shadowBias = 0.0,
      shadowNormalBias = 0.02,
      shadowNear = 0.5,
      shadowFar = 500
    },
    setSettings
  ] = useState(settings);

  const lightRef = useRef();

  // 更新灯光属性
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.color.set(colorL);
      lightRef.current.intensity = intensity;
      lightRef.current.castShadow = castShadow;
      lightRef.current.visible = visible;
      
      // 更新阴影属性
      lightRef.current.shadow.mapSize.set(shadowMapSize, shadowMapSize);
      lightRef.current.shadow.radius = shadowRadius;
      lightRef.current.shadow.bias = shadowBias;
      lightRef.current.shadow.normalBias = shadowNormalBias;
      lightRef.current.shadow.camera.near = shadowNear;
      lightRef.current.shadow.camera.far = shadowFar;
      
      // 更新位置
      lightRef.current.position.set(...position);
      lightRef.current.target.position.set(...target);
    }
  }, [
    colorL, intensity, castShadow, visible,
    shadowMapSize, shadowRadius, shadowBias, shadowNormalBias, shadowNear, shadowFar,
    position, target
  ]);

  useHelper(lightRef, isHelper && DirectionalLightHelper);

  return (
    <>
      {debug && <DirectionalLightBuilder levaname={levaname} settings={settings} onChange={setSettings} />}
      <directionalLight
        name={levaname}
        ref={lightRef}
        castShadow={castShadow}
        shadow-needsUpdate={true}
        visible={visible}
        {...props}
      />
    </>
  );
}

const DirectionalLightBuilder = ({ levaname, settings, onChange }) => {
  const curControls = useRef({});
  const controls = useControls(levaname, {
    castShadow: {
      value: settings.castShadow !== undefined ? settings.castShadow : true
    },
    color: {
      value: settings.color || '#ffffff'
    },
    intensity: {
      value: settings.intensity || 1,
      min: 0,
      max: 50,
      step: 0.1
    },
    position: {
      value: settings.position || [0, 2, 0],
      step: 0.1
    },
    target: {
      value: settings.target || [0, 0, 0],
      step: 0.1
    },
    isHelper: {
      value: settings.isHelper !== undefined ? settings.isHelper : true,
      label: "helper"
    },
    shadowMapSize: {
      value: settings.shadowMapSize || 512,
      min: 256,
      max: 2048,
      step: 256
    },
    shadowRadius: {
      value: settings.shadowRadius || 1.0,
      min: 0,
      max: 10,
      step: 0.1,
      label: "阴影模糊半径"
    },
    shadowBias: {
      value: settings.shadowBias || 0.0,
      min: -0.02,
      max: 0.02,
      step: 0.0001,
      label: "阴影偏移 (bias)"
    },
    shadowNormalBias: {
      value: settings.shadowNormalBias || 0.02,
      min: 0.0,
      max: 1.0,
      step: 0.001,
      label: "法线normalBias"
    },
    shadowNear: {
      value: settings.shadowNear || 0.5,
      min: 0.01,
      max: 10,
      step: 0.01,
      label: "阴影near"
    },
    shadowFar: {
      value: settings.shadowFar || 500,
      min: 1,
      max: 200,
      step: 1,
      label: "阴影far"
    },
    visible: {
      value: settings.visible !== undefined ? settings.visible : true
    },
    "Export Settings": button(() => {
      const exportedSettings = {
        castShadow: curControls.current.castShadow,
        color: curControls.current.color,
        intensity: curControls.current.intensity,
        position: curControls.current.position,
        target: curControls.current.target,
        isHelper: curControls.current.isHelper,
        shadowMapSize: curControls.current.shadowMapSize,
        shadowRadius: curControls.current.shadowRadius,
        shadowBias: curControls.current.shadowBias,
        shadowNormalBias: curControls.current.shadowNormalBias,
        shadowNear: curControls.current.shadowNear,
        shadowFar: curControls.current.shadowFar,
        visible: curControls.current.visible
      };
      console.log(levaname, JSON.stringify(exportedSettings, null, 2));
      navigator.clipboard?.writeText(JSON.stringify(exportedSettings, null, 2));
    })
  });

  curControls.current = controls;

  useEffect(() => {
    onChange(controls);
  }, [controls, onChange]);

  return null;
};