import { Environment } from '@react-three/drei';
import { useControls, button } from 'leva';
import { useEffect, useRef, useState } from 'react';

const Hdr = ({ levaname = 'HDR设置', path = '', settings = {}, debug = false, ...props }) => {
  const [
    {
      backgroundBlurriness = 0,
      backgroundIntensity = 1,
      backgroundRotation = 2,
      environmentIntensity = 0.08,
      environmentRotation = 2,
      background = true,
    },
    setSettings,
  ] = useState(settings);

  const ref = useRef();

  useEffect(() => {
    // 这里不需要更新 ref，因为 Environment 是 R3F 控制的
  }, [
    backgroundBlurriness,
    backgroundIntensity,
    backgroundRotation,
    environmentIntensity,
    environmentRotation,
    background,
  ]);

  return (
    <>
      {debug && <HdrBuilder levaname={levaname} settings={settings} onChange={setSettings} />}
      <Environment
        ref={ref}
        background={background}
        files={path}
        backgroundBlurriness={backgroundBlurriness}
        backgroundIntensity={backgroundIntensity}
        environmentIntensity={environmentIntensity}
        // backgroundRotation={[0, backgroundRotation, 0]}
        // environmentRotation={[0, environmentRotation, 0]}
        {...props}
      />
    </>
  );
};

const HdrBuilder = ({ levaname, settings, onChange }) => {
  const curControls = useRef({});

  const controls = useControls(levaname, {
    background: {
      value: settings.background !== undefined ? settings.background : true,
      label: '启用背景',
    },
    backgroundBlurriness: {
      value: settings.backgroundBlurriness || 0,
      min: 0,
      max: 1,
      step: 0.01,
      label: '背景模糊',
    },
    backgroundIntensity: {
      value: settings.backgroundIntensity || 1,
      min: 0,
      max: 5,
      step: 0.01,
      label: '背景强度',
    },
    backgroundRotation: {
      value: settings.backgroundRotation || 2,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
      label: '背景旋转',
    },
    environmentIntensity: {
      value: settings.environmentIntensity || 0.08,
      min: 0,
      max: 5,
      step: 0.01,
      label: '环境强度',
    },
    environmentRotation: {
      value: settings.environmentRotation || 2,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
      label: '环境旋转',
    },
    '导出 HDR 设置': button(() => {
      const exported = {
        path: curControls.current.hdrPath,
        background: curControls.current.background,
        backgroundBlurriness: curControls.current.backgroundBlurriness,
        backgroundIntensity: curControls.current.backgroundIntensity,
        backgroundRotation: curControls.current.backgroundRotation,
        environmentIntensity: curControls.current.environmentIntensity,
        environmentRotation: curControls.current.environmentRotation,
      };
      console.log(levaname, JSON.stringify(exported, null, 2));
      navigator.clipboard?.writeText(JSON.stringify(exported, null, 2));
    }),
  });

  curControls.current = controls;

  useEffect(() => {
    onChange(controls);
  }, [controls, onChange]);

  return null;
};

export default Hdr;
