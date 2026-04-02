import React, { useState, useEffect, useRef } from 'react';

const VolumetricToggle = ({ active, onToggle, style }) => {
  return (
    <div
      onClick={onToggle}
      style={{
        width: '84px',
        height: '44px',
        borderRadius: '44px',
        background: '#050506',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: active
          ? 'inset 0 4px 10px rgba(0,0,0,0.8), 0 0 0 3px #2FFF45, 0 0 30px rgba(47, 255, 69, 0.3)'
          : 'inset 0 4px 10px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.05), 0 0 0 2px #16181D',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        ...style,
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: active
            ? 'linear-gradient(145deg, #1d1f25, #0f1013)'
            : 'linear-gradient(145deg, #2a2c33, #16181d)',
          boxShadow: '4px 4px 8px rgba(0,0,0,0.6), -1px -1px 2px rgba(255,255,255,0.1)',
          transform: active ? 'translateX(40px)' : 'translateX(0)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: active ? '#2FFF45' : '#3A3D47',
            boxShadow: active ? '0 0 8px #2FFF45' : 'none',
            transition: 'background 0.4s',
          }}
        />
      </div>
    </div>
  );
};

const MonoLabel = ({ children, style }) => (
  <div
    style={{
      fontFamily: "'Space Mono', monospace",
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      fontSize: '0.75rem',
      color: '#2FFF45',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      ...style,
    }}
  >
    <span
      style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        background: '#2FFF45',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(47, 255, 69, 0.3)',
        flexShrink: 0,
      }}
    />
    {children}
  </div>
);

const GlassPanel = ({ children, style }) => (
  <div
    style={{
      background: 'rgba(22, 24, 29, 0.4)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '3rem',
      boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      }}
    />
    {children}
  </div>
);

const DataItem = ({ label, value, unit, customValue }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      borderLeft: '2px solid rgba(255, 255, 255, 0.03)',
      paddingLeft: '1.5rem',
      transition: 'border-color 0.3s',
      cursor: 'default',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = '#2FFF45')}
    onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'rgba(255, 255, 255, 0.03)')}
  >
    <span
      style={{
        fontSize: '0.85rem',
        color: '#8A8D98',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {label}
    </span>
    {customValue ? (
      <div style={{ color: '#FFFFFF', fontFamily: "'Space Mono', monospace", marginTop: '0.5rem' }}>
        {customValue}
      </div>
    ) : (
      <div>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '2.5rem',
            fontWeight: 300,
            color: '#FFFFFF',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              fontSize: '1rem',
              color: '#2FFF45',
              verticalAlign: 'super',
              marginLeft: '2px',
            }}
          >
            {unit}
          </span>
        )}
      </div>
    )}
  </div>
);

const HeroSection = ({ toggleActive, onToggle }) => (
  <section
    id="hero"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          border: '1px dashed rgba(47, 255, 69, 0.1)',
          animation: 'spin 60s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 255, 255, 0.08)',
          animation: 'spin 40s linear infinite reverse',
        }}
      />
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        zIndex: 10,
        maxWidth: '1400px',
        padding: '0 4rem',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(0,0,0,0.5)',
          padding: '0.5rem 1rem',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.03)',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.8rem',
          color: '#E2E4EB',
        }}
      >
        <span
          style={{
            width: '10px',
            height: '10px',
            background: '#2FFF45',
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
        SYSTEM ONLINE / HUD ACTIVE
      </div>
      <div>
        <MonoLabel style={{ justifyContent: 'center' }}>Prototype v.4.0</MonoLabel>
        <h1
          style={{
            fontSize: '5rem',
            lineHeight: 1.1,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
          }}
        >
          VISION AI
        </h1>
      </div>
      <p
        style={{
          textAlign: 'center',
          maxWidth: '500px',
          fontSize: '1.2rem',
          color: '#8A8D98',
          lineHeight: 1.6,
        }}
      >
        现实不再受限。体验智能空间计算叠加的全新世界，感知超越视觉的未来。
      </p>
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontSize: '0.6rem',
            color: '#8A8D98',
            margin: 0,
          }}
        >
          INITIALIZE SEQUENCE
        </span>
        <VolumetricToggle active={toggleActive} onToggle={onToggle} />
      </div>
    </div>
  </section>
);

const DisplaySection = ({ toggleActive, onToggle }) => (
  <section
    id="display"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <MonoLabel>Module 01 / Optics</MonoLabel>
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            超清显示技术
          </h2>
          <p style={{ color: '#8A8D98', lineHeight: 1.6, fontSize: '1.1rem' }}>
            仿生级分辨率，肉眼不可见的像素密度。自研芯片驱动双 Micro-OLED
            显示屏，完美融入自然视野，智能感光动态调节亮度。
          </p>
        </div>
        <VolumetricToggle active={toggleActive} onToggle={onToggle} />
      </div>
      <GlassPanel>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            background:
              'radial-gradient(circle at center, rgba(47, 255, 69, 0.05) 0%, transparent 70%)',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.03)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              background: '#2FFF45',
              borderRadius: '50%',
              boxShadow: '0 0 20px rgba(47, 255, 69, 0.6)',
              position: 'relative',
              animation: 'trackEye 6s infinite alternate ease-in-out',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                border: '1px solid #2FFF45',
                borderRadius: '50%',
                opacity: 0.3,
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
          }}
        >
          <DataItem label="单眼分辨率" value="4000" unit="px" />
          <DataItem label="峰值亮度" value="5000" unit="nits" />
          <DataItem label="刷新率" value="120" unit="Hz" />
          <DataItem label="眼球追踪延迟" value="12" unit="ms" />
        </div>
      </GlassPanel>
    </div>
  </section>
);

const RecordingSection = ({ toggleActive, onToggle }) => (
  <section
    id="recording"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <div>
          <MonoLabel>Module 02 / Capture</MonoLabel>
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            第一视角录屏
          </h2>
          <p
            style={{ marginBottom: '2rem', color: '#8A8D98', lineHeight: 1.6, fontSize: '1.1rem' }}
          >
            捕捉你眼中的真实世界。超广角传感器精确记录所见画面，神经网络引擎实时防抖与色彩调校，还原沉浸空间。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <DataItem label="录制格式" value="8K" unit="RAW" />
            <DataItem label="防抖技术" customValue="6-AXIS GIMBAL-LIKE" />
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1555861496-0666c8981751?q=80&w=2070&auto=format&fit=crop"
            alt="First person perspective neon city"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.8) contrast(1.2) grayscale(0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '2rem',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ff3333',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.9rem',
                  fontWeight: 700,
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    background: '#ff3333',
                    borderRadius: '50%',
                    animation: 'blink 1s infinite',
                  }}
                />
                REC
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                TC 01:24:45:12
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
              }}
            />
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                ISO 800
                <br />
                F/1.8
                <br />
                1/120
              </div>
              <div style={{ pointerEvents: 'auto' }}>
                <VolumetricToggle
                  active={toggleActive}
                  onToggle={onToggle}
                  style={{ transform: 'scale(0.7)', transformOrigin: 'bottom right' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const NotificationsSection = () => (
  <section
    id="notifications"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <MonoLabel>Module 03 / Uplink</MonoLabel>
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            空间通知系统
          </h2>
          <p style={{ color: '#8A8D98', lineHeight: 1.6, fontSize: '1.1rem' }}>
            信息融入环境，而非困于屏幕。高优先级通知锁定视线焦点，次要信息悬浮于视野边缘，零干扰智能推送。
          </p>
        </div>
      </div>
      <div
        style={{
          height: '500px',
          perspective: '1000px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '320px',
            background: '#16181D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            transform: 'translateZ(-100px) translateX(0) translateY(-120px)',
            zIndex: 1,
            opacity: 0.5,
            filter: 'blur(3px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              paddingBottom: '0.5rem',
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>系统更新</span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                color: '#8A8D98',
              }}
            >
              2小时前
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#8A8D98' }}>固件 v4.0.1 已下载，准备安装</p>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '320px',
            background: '#16181D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            transform: 'translateZ(0px) translateX(150px) translateY(50px)',
            zIndex: 2,
            opacity: 0.8,
            filter: 'blur(1px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              paddingBottom: '0.5rem',
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>新消息</span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                color: '#8A8D98',
              }}
            >
              12分钟前
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#8A8D98' }}>Sarah："来我刚发的坐标位置见我"</p>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '320px',
            background: '#16181D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderLeft: '2px solid #2FFF45',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            transform: 'translateZ(100px) translateX(-150px) translateY(-50px)',
            zIndex: 3,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              paddingBottom: '0.5rem',
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2FFF45' }}>
              导航路线调整
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                color: '#8A8D98',
              }}
            >
              刚刚
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>
            收到新的途经点，正在调整路线以避开第4区域拥堵
          </p>
          <div
            style={{
              marginTop: '1rem',
              height: '4px',
              background: '#050506',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '60%',
                background: '#2FFF45',
                boxShadow: '0 0 10px rgba(47, 255, 69, 0.3)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AudioSection = () => (
  <section
    id="audio"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 4rem',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <MonoLabel style={{ justifyContent: 'center' }}>Module 04 / Sonar</MonoLabel>
      <h2
        style={{
          fontSize: '3rem',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
          marginBottom: '1rem',
        }}
      >
        沉浸式空间音频
      </h2>
      <p
        style={{
          maxWidth: '600px',
          margin: '0 auto 4rem auto',
          color: '#8A8D98',
          lineHeight: 1.6,
          fontSize: '1.1rem',
        }}
      >
        骨传导换能器将 7.1.4 声道环绕声直接映射至内耳，主动降噪技术让物理世界瞬间静音。
      </p>
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          margin: '0 auto 4rem auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            background: '#16181D',
            borderRadius: '50%',
            zIndex: 10,
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 0 0 2px rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2FFF45"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </div>
        <div
          style={{
            position: 'absolute',
            border: '1px solid #2FFF45',
            borderRadius: '50%',
            opacity: 0,
            animation: 'soundPulse 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            border: '1px solid #2FFF45',
            borderRadius: '50%',
            opacity: 0,
            animation: 'soundPulse 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite 1s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            border: '1px solid #2FFF45',
            borderRadius: '50%',
            opacity: 0,
            animation: 'soundPulse 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite 2s',
          }}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
            borderBottom: '2px solid rgba(255, 255, 255, 0.03)',
            padding: '0 0 1rem 0',
          }}
        >
          <span
            style={{
              fontSize: '0.85rem',
              color: '#8A8D98',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            声道系统
          </span>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '2.5rem',
              fontWeight: 300,
              color: '#FFFFFF',
              lineHeight: 1,
            }}
          >
            7.1.4
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
            borderBottom: '2px solid #2FFF45',
            padding: '0 0 1rem 0',
          }}
        >
          <span
            style={{
              fontSize: '0.85rem',
              color: '#8A8D98',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            降噪深度
          </span>
          <div>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '2.5rem',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              45
            </span>
            <span
              style={{
                fontSize: '1rem',
                color: '#2FFF45',
                verticalAlign: 'super',
                marginLeft: '2px',
              }}
            >
              dB
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TranslationSection = ({ toggleActive, onToggle }) => {
  const [foreignBlur, setForeignBlur] = useState(2);
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setForeignBlur(4);
        setTimeout(() => setForeignBlur(2), 150);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="translation"
      style={{
        minHeight: '100vh',
        padding: '8rem 0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <MonoLabel>Module 05 / Decode</MonoLabel>
            <h2
              style={{
                fontSize: '3rem',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                marginBottom: '1rem',
              }}
            >
              实时翻译
            </h2>
            <p style={{ color: '#8A8D98', lineHeight: 1.6, fontSize: '1.1rem' }}>
              实时语音转文字处理，将翻译字幕叠加在说话者位置。支持 40+ 种语言，本地处理零延迟。
            </p>
          </div>
          <VolumetricToggle active={toggleActive} onToggle={onToggle} />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '2rem',
            alignItems: 'center',
            background: '#16181D',
            borderRadius: '24px',
            padding: '4rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <MonoLabel style={{ fontSize: '0.6rem', color: '#3A3D47' }}>
              [ 源语言: 日语 / 检测到语音 ]
            </MonoLabel>
            <div
              style={{
                fontSize: '2rem',
                lineHeight: 1.4,
                color: '#8A8D98',
                filter: `blur(${foreignBlur}px)`,
                transition: 'filter 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'blur(0)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = `blur(${foreignBlur}px)`)}
            >
              このデザインは未来を映し出す
            </div>
          </div>
          <div
            style={{
              width: '1px',
              height: '100px',
              background: 'linear-gradient(to bottom, transparent, #2FFF45, transparent)',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#16181D',
                color: '#2FFF45',
                fontFamily: "'Space Mono', monospace",
                padding: '0.5rem',
              }}
            >
              {'>'}
            </span>
          </div>
          <div>
            <MonoLabel style={{ fontSize: '0.6rem' }}>[ 目标: 中文 / 置信度 99.8% ]</MonoLabel>
            <div
              style={{
                fontSize: '2rem',
                lineHeight: 1.4,
                color: '#FFFFFF',
                textShadow: '0 0 20px rgba(255,255,255,0.2)',
              }}
            >
              这个设计展现了<span style={{ color: '#2FFF45' }}>功能与美学的完美融合</span>。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NavigationSection = () => (
  <section
    id="navigation"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <MonoLabel>Module 06 / Routing</MonoLabel>
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            AR 空间导航
          </h2>
          <p style={{ color: '#8A8D98', lineHeight: 1.6, fontSize: '1.1rem' }}>
            告别低头看地图。发光的 3D 路径指引你的脚步，情景感知标记实时标注物理空间中的兴趣点。
          </p>
        </div>
      </div>
      <GlassPanel style={{ padding: '1rem' }}>
        <div
          style={{
            height: '400px',
            background: 'linear-gradient(to bottom, transparent, #16181D)',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            borderBottom: '2px solid #2FFF45',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '200%',
              height: '200%',
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transformOrigin: 'bottom center',
              transform: 'perspective(500px) rotateX(70deg) translateY(100px)',
              animation: 'moveGrid 10s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '4px',
              height: '60%',
              background: 'linear-gradient(to top, #2FFF45, transparent)',
              boxShadow: '0 0 20px rgba(47, 255, 69, 0.6)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '40%',
              left: 'calc(50% + 100px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                background: 'rgba(0,0,0,0.8)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              目的地: 450米
            </div>
            <div
              style={{
                width: '12px',
                height: '12px',
                background: '#16181D',
                border: '2px solid #2FFF45',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(47, 255, 69, 0.3)',
              }}
            />
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 'calc(50% - 150px)',
              bottom: '20%',
              transform: 'scale(0.8)',
              opacity: 0.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                color: '#8A8D98',
              }}
            >
              咖啡店
            </div>
            <div
              style={{
                width: '12px',
                height: '12px',
                background: 'transparent',
                border: '2px solid #8A8D98',
                borderRadius: '50%',
              }}
            />
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
          </div>
        </div>
      </GlassPanel>
    </div>
  </section>
);

const MicrophoneSection = ({ toggleActive, onToggle }) => (
  <section
    id="microphone"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <MonoLabel>Module 07 / Input</MonoLabel>
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            智能麦克风阵列
          </h2>
          <p style={{ color: '#8A8D98', lineHeight: 1.6, fontSize: '1.1rem' }}>
            波束成形技术精准捕捉你的声音，过滤环境噪音。6麦克风阵列支持 360°
            声源定位，无论身处何地都能清晰通话。
          </p>
        </div>
        <VolumetricToggle active={toggleActive} onToggle={onToggle} />
      </div>
      <GlassPanel style={{ textAlign: 'center', padding: '4rem' }}>
        <div
          style={{
            position: 'relative',
            width: '280px',
            height: '280px',
            margin: '0 auto 3rem auto',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              background: '#16181D',
              borderRadius: '50%',
              border: '2px solid #2FFF45',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
              boxShadow: '0 0 30px rgba(47, 255, 69, 0.3)',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2FFF45"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '160px',
              height: '160px',
              border: '1px dashed rgba(47, 255, 69, 0.3)',
              borderRadius: '50%',
              animation: 'spin 8s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '220px',
              height: '220px',
              border: '1px dashed rgba(47, 255, 69, 0.2)',
              borderRadius: '50%',
              animation: 'spin 12s linear infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '12px',
              height: '12px',
              background: '#2FFF45',
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '15%',
              right: '20%',
              width: '8px',
              height: '8px',
              background: '#2FFF45',
              borderRadius: '50%',
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '15%',
              width: '10px',
              height: '10px',
              background: '#2FFF45',
              borderRadius: '50%',
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '15%',
              width: '14px',
              height: '14px',
              background: '#2FFF45',
              borderRadius: '50%',
              opacity: 0.7,
            }}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <DataItem label="麦克风数量" value="6" unit="阵列" />
          <DataItem label="拾音距离" value="5" unit="米" />
          <DataItem label="降噪效果" value="35" unit="dB" />
          <DataItem label="声源定位" customValue="360° 精准" />
        </div>
      </GlassPanel>
    </div>
  </section>
);

const VoiceRecSection = () => (
  <section
    id="voicerec"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <GlassPanel
          style={{
            aspectRatio: '4/3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  background: '#ff3333',
                  borderRadius: '50%',
                  animation: 'blink 1s infinite',
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.8rem',
                  color: '#ff3333',
                }}
              >
                录音中
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '1.2rem',
                lineHeight: 2,
                color: '#E2E4EB',
              }}
            >
              <div>
                <span style={{ color: '#2FFF45' }}>[00:12:34]</span> 今天的会议主要讨论
              </div>
              <div>
                <span style={{ color: '#2FFF45' }}>[00:12:36]</span> 产品下个版本的迭代计划
              </div>
              <div>
                <span style={{ color: '#2FFF45' }}>[00:12:39]</span>{' '}
                <mark style={{ background: 'rgba(47, 255, 69, 0.2)', color: '#FFFFFF' }}>
                  关键决策点
                </mark>
                ：确定发布时间表
              </div>
              <div>
                <span style={{ color: '#2FFF45' }}>[00:12:42]</span> 市场部反馈用户需求...
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <div
              style={{
                flex: 1,
                height: '4px',
                background: '#050506',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '75%',
                  background: 'linear-gradient(to right, #2FFF45, transparent)',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                color: '#8A8D98',
              }}
            >
              实时转录
            </span>
          </div>
        </GlassPanel>
        <div>
          <MonoLabel>Module 08 / Archive</MonoLabel>
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            智能录音助手
          </h2>
          <p
            style={{ marginBottom: '2rem', color: '#8A8D98', lineHeight: 1.6, fontSize: '1.1rem' }}
          >
            会议、讲座、采访实时转录，自动标记重点内容。AI
            生成智能摘要，云端安全存储，随时检索回溯。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <DataItem label="识别准确率" value="98.5" unit="%" />
            <DataItem label="支持语言" value="50" unit="+" />
            <DataItem label="云端加密" customValue="AES-256" />
            <DataItem label="存储空间" value="100" unit="GB" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PromptsSection = () => (
  <section
    id="prompts"
    style={{
      minHeight: '100vh',
      padding: '8rem 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <MonoLabel>Module 09 / AI Core</MonoLabel>
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            AI 提示词助手
          </h2>
          <p style={{ color: '#8A8D98', lineHeight: 1.6, fontSize: '1.1rem' }}>
            多模态 AI
            助手，通过视觉感知理解你所见，语音自然交互。智能场景识别，提供个性化建议，成为你的随身智囊。
          </p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        <div
          style={{
            background: '#16181D',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                color: '#2FFF45',
              }}
            >
              ACTIVE
            </span>
          </div>
          <div
            style={{
              width: '50px',
              height: '50px',
              background: 'rgba(47, 255, 69, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2FFF45"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <h3
            style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              color: '#FFFFFF',
              fontWeight: 500,
            }}
          >
            这是什么？
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#8A8D98' }}>
            识别眼前物体，提供详细信息和相关建议
          </p>
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#050506',
              borderRadius: '12px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              color: '#8A8D98',
            }}
          >
            "我看到一架钢琴，需要调音吗？"
          </div>
        </div>
        <div
          style={{
            background: '#16181D',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                color: '#8A8D98',
              }}
            >
              STANDBY
            </span>
          </div>
          <div
            style={{
              width: '50px',
              height: '50px',
              background: 'rgba(138, 141, 152, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A8D98"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3
            style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              color: '#FFFFFF',
              fontWeight: 500,
            }}
          >
            帮我总结
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#8A8D98' }}>快速提取文档、页面或对话的关键要点</p>
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#050506',
              borderRadius: '12px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              color: '#8A8D98',
            }}
          >
            "总结这篇论文的核心观点..."
          </div>
        </div>
        <div
          style={{
            background: '#16181D',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                color: '#8A8D98',
              }}
            >
              STANDBY
            </span>
          </div>
          <div
            style={{
              width: '50px',
              height: '50px',
              background: 'rgba(138, 141, 152, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A8D98"
              strokeWidth="2"
            >
              <path d="M12 3v18M3 12h18" />
            </svg>
          </div>
          <h3
            style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              color: '#FFFFFF',
              fontWeight: 500,
            }}
          >
            创建提醒
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#8A8D98' }}>基于场景自动创建位置和时间提醒</p>
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#050506',
              borderRadius: '12px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              color: '#8A8D98',
            }}
          >
            "经过超市时提醒我买牛奶"
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
      >
        <div
          style={{
            background: '#16181D',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(47, 255, 69, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '1.5rem',
                color: '#2FFF45',
              }}
            >
              ∞
            </span>
          </div>
          <div>
            <h4
              style={{
                fontSize: '1rem',
                marginBottom: '0.3rem',
                color: '#FFFFFF',
                fontWeight: 500,
              }}
            >
              上下文感知
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#8A8D98', margin: 0 }}>
              结合视觉、位置、时间等多维信息理解需求
            </p>
          </div>
        </div>
        <div
          style={{
            background: '#16181D',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(47, 255, 69, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2FFF45"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <h4
              style={{
                fontSize: '1rem',
                marginBottom: '0.3rem',
                color: '#FFFFFF',
                fontWeight: 500,
              }}
            >
              即时响应
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#8A8D98', margin: 0 }}>
              边缘计算保障低延迟，自然对话零等待
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HudNav = ({ activeDot, onDotClick }) => {
  const dots = [
    { id: 'hero', label: 'SYS_INIT' },
    { id: 'display', label: 'OPTICS' },
    { id: 'recording', label: 'CAPTURE' },
    { id: 'notifications', label: 'UPLINK' },
    { id: 'audio', label: 'SONAR' },
    { id: 'translation', label: 'DECODE' },
    { id: 'navigation', label: 'ROUTING' },
    { id: 'microphone', label: 'MIC' },
    { id: 'voicerec', label: 'VOICE' },
    { id: 'prompts', label: 'PROMPT' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        zIndex: 100,
      }}
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          onClick={() => onDotClick(dot.id)}
          style={{
            width: '4px',
            height: '4px',
            background: activeDot === dot.id ? '#2FFF45' : '#3A3D47',
            borderRadius: '50%',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: activeDot === dot.id ? '0 0 15px rgba(47, 255, 69, 0.6)' : 'none',
            transform: activeDot === dot.id ? 'scale(1.5)' : 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2FFF45';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(47, 255, 69, 0.6)';
            e.currentTarget.style.transform = 'scale(1.5)';
            const label = e.currentTarget.querySelector('.hud-label');
            if (label) {
              label.style.opacity = '1';
              label.style.right = '25px';
              label.style.color = '#2FFF45';
            }
          }}
          onMouseLeave={(e) => {
            if (activeDot !== dot.id) {
              e.currentTarget.style.background = '#3A3D47';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }
            const label = e.currentTarget.querySelector('.hud-label');
            if (label) {
              label.style.opacity = '0';
              label.style.right = '20px';
              label.style.color = '#8A8D98';
            }
          }}
        >
          <span
            className="hud-label"
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.7rem',
              color: '#8A8D98',
              opacity: 0,
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {dot.label}
          </span>
        </div>
      ))}
    </nav>
  );
};

const Function = () => {
  const [activeDot, setActiveDot] = useState('hero');
  const [heroToggle, setHeroToggle] = useState(false);
  const [displayToggle, setDisplayToggle] = useState(true);
  const [recordingToggle, setRecordingToggle] = useState(true);
  const [translationToggle, setTranslationToggle] = useState(true);
  const [micToggle, setMicToggle] = useState(true);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      // @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      // * { margin: 0; padding: 0; box-sizing: border-box; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      @keyframes spin { 100% { transform: rotate(360deg); } }
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes trackEye {
        0% { transform: translate(-30px, -10px); }
        30% { transform: translate(40px, 20px); }
        70% { transform: translate(-20px, 30px); }
        100% { transform: translate(10px, -20px); }
      }
      @keyframes soundPulse {
        0% { width: 80px; height: 80px; opacity: 1; border-width: 2px; }
        100% { width: 400px; height: 400px; opacity: 0; border-width: 0px; }
      }
      @keyframes moveGrid {
        0% { transform: perspective(500px) rotateX(70deg) translateY(0); }
        100% { transform: perspective(500px) rotateX(70deg) translateY(40px); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    const sectionIds = [
      'hero',
      'display',
      'recording',
      'notifications',
      'audio',
      'translation',
      'navigation',
      'microphone',
      'voicerec',
      'prompts',
    ];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveDot(id);
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={
        {
          // color: '#E2E4EB',
          // fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          // overflowX: 'hidden',
        }
      }
      // className="absolute top-[50%]"
    >
      {/* <HudNav activeDot={activeDot} onDotClick={scrollToSection} /> */}
      <main>
        {/* <HeroSection toggleActive={heroToggle} onToggle={() => setHeroToggle((p) => !p)} /> */}
        <DisplaySection toggleActive={displayToggle} onToggle={() => setDisplayToggle((p) => !p)} />
        <RecordingSection
          toggleActive={recordingToggle}
          onToggle={() => setRecordingToggle((p) => !p)}
        />
        <NotificationsSection />
        <AudioSection />
        <TranslationSection
          toggleActive={translationToggle}
          onToggle={() => setTranslationToggle((p) => !p)}
        />
        <NavigationSection />
        <MicrophoneSection toggleActive={micToggle} onToggle={() => setMicToggle((p) => !p)} />
        <VoiceRecSection />
        <PromptsSection />
      </main>
    </div>
  );
};

export default Function;
