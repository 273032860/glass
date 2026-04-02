// Three.js Transpiler r183

import { cos, mat2, Fn, abs, pow, dot, max, sin, mul, add, time, Loop, float, sub, floor, vec4, fract, select, vec3, normalize, property, min, div, If, Break, vec2, mix, smoothstep, exp,length, bool, screenSize } from 'three/tsl';

const T = time
export const rot = /*@__PURE__*/ Fn( ( [ a ] ) => {

	const c = cos( a );

	// 原宏中的cos(a+11.)、cos(a+33.) 本质是简化写法，等价于 -sin(a)、sin(a)（三角函数恒等变换）
	// 这里保留原计算逻辑，确保和原代码效果一致

	const c11 = cos( a.add( 11.0 ) );
	const c33 = cos( a.add( 33.0 ) );

	return mat2( c, c11, c33, c );

}, { a: 'float', return: 'mat2' } );

export const absPow = /*@__PURE__*/ Fn( ( [ x, y ] ) => {

	return pow( abs( x ), y );

}, { x: 'float', y: 'float', return: 'float' } );

// 重载：支持vec3向量（可选，增强通用性）

export const clampedDot = /*@__PURE__*/ Fn( ( [ a, b ] ) => {

	return max( dot( a, b ), 0.0 );

}, { a: 'vec3', b: 'vec3', return: 'float' } );

export const FK = /*@__PURE__*/ Fn( ( [ w ] ) => {

	const timeTerm1 = time.mul( 25.0 ).add( w.mul( 93.1 ) );
	const timeTerm2 = time.mul( 14.0 ).add( w.mul( 17.4 ) );

	return add( 1.0, mul( 0.1, sin( timeTerm1 ).mul( cos( timeTerm2 ) ) ) );

}, { w: 'float', return: 'float' } );

// 噪声函数（对应原宏 n(p)）
// 参数p: 2D坐标向量 | 逻辑: 基于坐标的正弦余弦嵌套噪声

export const noise2D = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const sinTerm = sin( p.x.mul( 3.0 ).add( sin( p.y.mul( 2.7 ) ) ) );
	const cosTerm = cos( p.y.mul( 1.1 ).add( cos( p.x.mul( 2.3 ) ) ) );

	return sinTerm.mul( cosTerm );

}, { p: 'vec2', return: 'float' } );





export const fractalNoise = /*@__PURE__*/ Fn( ( [ p_immutable ] ) => {

	const p = p_immutable.toVar();

	// 初始化累加值（最终返回的噪声总和）

	const noiseSum = float( 0.0 );

	// 振幅系数（每次循环减半，控制每层噪声的权重）

	const amplitude = float( 1.0 );

	// 循环7次计算多层噪声（原代码i++<7等价于循环7次，标准写法更清晰）

	Loop( { start: 0, end: 7 }, ( { i } ) => {

		// 核心：计算当前层的噪声值并累加到总和（乘以当前振幅）
		// p.xy + p.z*0.5：将3D坐标投影到2D，z轴分量加权0.5参与计算

		noiseSum.addAssign( noise2D( p.xy.add( p.z.mul( 0.5 ) ) ).mul( amplitude ) );

		// 更新坐标：缩放2倍（频率翻倍），增加高频细节

		p.mulAssign( 2.0 );

		// 更新振幅：减半（高频噪声权重降低）

		amplitude.mulAssign( 0.5 );

	} );

	return noiseSum;

}, { p: 'vec3', return: 'float' } );

export const sceneSDF = /*@__PURE__*/ Fn( ( [ p ] ) => {
  const pv = p.toVar();
	pv.xy.mulAssign( rot( p.z.mul( 1.1 ) ) );

	return mul( .2, sub( 1., length( p.xy ) ) ).sub( fractalNoise( pv.add( T.mul( .1 ) ) ).mul( .06 ) );

}, { p: 'vec3', return: 'float' } );

export const getBallInfo = /*@__PURE__*/ Fn( ( [ z ] ) => {

	const i = floor( z.add( 2.5 ).mul( .2 ) );

	return vec4( cos( i.mul( 2.4 ) ).mul( .6 ), sin( i.mul( 2.4 ) ).mul( .6 ), i.mul( 5. ), i );

}, { z: 'float', return: 'vec4' } );

export const getBallColor = /*@__PURE__*/ Fn( ( [ i ] ) => {

	const h = fract( sin( i.mul( 13.54 ) ).mul( 453.21 ) );

	return select( h.lessThan( .33 ), vec3( 1, 8, 9 ).mul( .1 ), select( h.lessThan( .66 ), vec3( 9, 2, 6 ).mul( .1 ), vec3( 10, 6, 1 ).mul( .1 ) ) );

}, { i: 'float', return: 'vec3' } );


export const limestone = /*@__PURE__*/ Fn( ( [fragCoord ] ) => {

	const fragColor = vec4().toVar();

	// ===================== 变量声明（语义化命名 + 注释）=====================
	// 分辨率简写（原 R）

	const resolution = screenSize.xy;

	// 时间简写（原 T）

 

	// 射线方向（原 d）：归一化的视口射线方向

	const rayDir = normalize( vec3( fragCoord.sub( mul( 0.5, resolution ) ).div( resolution.y ), 1.0 ) );

	// 射线原点（原 o）：随时间移动的相机位置

	const rayOrigin = vec3( sin( time.mul( 0.3 ) ).mul( 0.2 ), cos( time.mul( 0.2 ) ).mul( 0.2 ), time.mul( 1.2 ) );
	const rayPos = property( 'vec3' );

	// 当前射线位置（原 p）

	const finalColor = property( 'vec3' );

	// 最终输出颜色（原 c）

	const glowColor2 = vec3( 0.0 );

	// 辉光颜色2（原 g2）

	const normal = property( 'vec3' );

	// 场景法向量（原 nn）

	const lightDir = property( 'vec3' );

	// 光源方向（原 l）

	const ballColor = property( 'vec3' );

	// 球的颜色（原 b）
	// 射线方向旋转：随时间旋转xy平面

	rayDir.xy.mulAssign( rot( time.mul( 0.15 ) ) );
	const hitBall = bool();

	// 是否击中球（原 ht）

	const rayT = float( 0.0 );

	// 射线步进长度（原 t）

	const sceneDist = property( 'float' );

	// 场景最小距离（原 w）

	const hitBallIndex = property( 'float' );

	// 击中的球索引（原 hi）

	const glowIntensity1 = float( 0.0 );

	// 辉光强度1（原 g1）

	const distCloud = property( 'float' );

	// 云的SDF距离（原 dc）

	const distBall = property( 'float' );

	// 球的SDF距离（原 db）

	const ballInfo = property( 'vec4' );

	// 球信息（位置xyz + 索引w）（原 bi）
	// ===================== 射线步进循环（核心：遍历场景）=====================
	// 标准循环写法：替代原 i++<250 的简写，循环250次

	Loop( { start: 0, end: 250 }, ( { i } ) => {

		// 计算当前射线位置

		rayPos.assign( rayOrigin.add( rayDir.mul( rayT ) ) );

		// 计算云/球的距离

		distCloud.assign( sceneSDF( rayPos ) );

		// 云的SDF距离

		ballInfo.assign( getBallInfo( rayPos.z ) );

		 // 获取当前位置对应的球信息

		distBall.assign( length( rayPos.sub( ballInfo.xyz ) ).sub( 0.03 ) );

		// // 球的SDF距离（半径0.03）
		// // 取场景最小距离（云/球的最近距离）

		sceneDist.assign( min( distCloud, distBall ) );

		// 累加辉光1：云的辉光（距离越近，辉光越强）

		glowIntensity1.addAssign( div( 0.002, add( 0.01, abs( distCloud ) ) ) );

		// 累加辉光2：球的辉光（结合球颜色和震荡函数）

		glowColor2.addAssign( vec3( div( 0.0003, add( 0.001, distBall.mul( distBall ) ) ) ).add( getBallColor( ballInfo.w ).mul( 0.005 ).div( add( 0.02, abs( distBall ) ) ) ).mul( FK( ballInfo.w ) ) );

		// 频率震荡调制辉光
		// 碰撞判断：距离足够近 或 射线超出最大长度（25.0）

		If( abs( sceneDist ).lessThan( add( 0.001, rayT.div( 1000.0 ) ) ).or( rayT.greaterThan( 25.0 ) ), () => {

		// 	// 判断是否击中球（球距离 < 云距离）

			If( distBall.lessThan( distCloud ), () => {

				hitBall.assign( true );
				hitBallIndex.assign( ballInfo.w );

			} );

			Break();

		} );

		// 射线步进：按最小距离的80%前进（加速步进）

		rayT.addAssign( sceneDist.mul( 0.8 ) );

	} );

	// ===================== 碰撞后颜色计算 =====================

	If( rayT.lessThanEqual( 25.0 ), () => {

		// 射线击中场景（未超出最大长度）

		If( hitBall, () => {

			// 击中球：直接赋予高亮颜色

			finalColor.assign( vec3( 12.0 ).add( getBallColor( hitBallIndex ).mul( 5.0 ) ) );

		} ).Else( () => {

			// 击中云：计算法向量 + 光照 + 细节
			// 微小偏移量（用于法向量计算，随射线长度动态调整）

			const eps = vec2( add( 0.001, rayT.div( 1000.0 ) ), 0.0 );

			// 中心差分法计算法向量（原 nn）

			normal.assign( normalize( vec3( sceneSDF( rayPos.add( eps.xyy ) ).sub( sceneSDF( rayPos.sub( eps.xyy ) ) ), sceneSDF( rayPos.add( eps.yxy ) ).sub( sceneSDF( rayPos.sub( eps.yxy ) ) ), sceneSDF( rayPos.add( eps.yyx ) ).sub( sceneSDF( rayPos.sub( eps.yyx ) ) ) ) ) );

			// 云的基础颜色：分形噪声调制的渐变色

			const noisePos = rayPos;
			noisePos.xy.mulAssign( rot( noisePos.z.mul( 1.1 ) ) );

			// 随z轴旋转噪声坐标

			finalColor.assign( mix( vec3( 1.0, 3.0, 8.0 ).mul( 0.05 ), vec3( 9.0, 4.0, 1.0 ).mul( 0.1 ), absPow( max( min( fractalNoise( noisePos.add( time.mul( 0.1 ) ) ).add( 0.5 ), 1.0 ), 0.0 ), 2.0 ) ) );

			// 主光源计算（光源位置：o + vec3(0,0,5)）

			const lightPos = rayOrigin.add( vec3( 0.0, 0.0, 5.0 ) );
			const lightVec = lightPos.sub( rayPos );
			const lightDist = length( lightVec );
			lightDir.assign( lightVec.div( lightDist ) );

			// 归一化光源方向
			// 漫反射 + 高光（主光源贡献）

			finalColor.assign( finalColor.mul( 0.03 ).add( finalColor.mul( clampedDot( normal, lightDir ) ).mul( 1.5 ).add( vec3( 1.0, 0.8, 0.6 ).mul( absPow( clampedDot( normal, normalize( lightDir.sub( rayDir ) ) ), 24.0 ) ).mul( smoothstep( 20.0, 5.0, rayT ) ).mul( 1.5 ) ).div( add( 1.0, lightDist.mul( lightDist ).mul( 0.08 ) ) ) ) );

			// 光照衰减
			// 球光源计算（当前位置对应的球作为光源）

			ballInfo.assign( getBallInfo( rayPos.z ) );
			const ballLightVec = ballInfo.xyz.sub( rayPos );
			const ballLightDist = length( ballLightVec );
			lightDir.assign( ballLightVec.div( ballLightDist ) );

			// 归一化球光源方向

			ballColor.assign( getBallColor( ballInfo.w ) );

			// 球光源的漫反射 + 高光贡献

			finalColor.addAssign( finalColor.mul( clampedDot( normal, lightDir ) ).mul( 2.5 ).add( ballColor.mul( absPow( clampedDot( normal, normalize( lightDir.sub( rayDir ) ) ), 16.0 ) ).mul( 4.0 ) ).mul( ballColor ).mul( FK( ballInfo.w ) ).mul( add( 0.5, mul( 0.5, fract( sin( ballInfo.w.mul( 88.1 ) ).mul( 12.3 ) ) ) ) ).div( add( 1.0, ballLightDist.mul( ballLightDist ).mul( 1.5 ) ) ) );

			// 球光源衰减
			// 遮挡计算（原 oa）：模拟环境光遮蔽（AO）

			const occlusion = float( 0.0 );
			const occlusionScale = float( 1.0 );

			Loop( { start: 1, end: 5 }, ( { i } ) => {

				// 循环4次计算AO

				const stepH = add( 0.01, mul( 0.03, float( i ) ) );

				// 采样步长

				occlusion.addAssign( stepH.sub( sceneSDF( rayPos.add( stepH.mul( normal ) ) ) ).mul( occlusionScale ) );
				occlusionScale.mulAssign( 0.9 );

				// 衰减采样权重

				If( occlusion.greaterThan( 0.33 ), () => {

					Break();

				} );

			} );

			// 环境光 + AO 调制最终颜色

			finalColor.assign( finalColor.add( vec3( 5.0, 3.0, 8.0 ).mul( 0.1 ).mul( absPow( sub( 1.0, clampedDot( normal, rayDir.negate() ) ), 4.0 ) ).mul( 0.6 ).div( add( 1.0, lightDist.mul( lightDist ).mul( 0.08 ) ) ) ).mul( max( sub( 1.0, mul( 3.0, occlusion ) ), 0.0 ) ) );

		} );

	} );

	// ===================== 颜色后处理（辉光 + 色调映射）=====================
	// 1. 距离衰减 + 辉光叠加

	finalColor.assign( mix( vec3( 2.0, 0.0, 5.0 ).mul( 0.01 ), finalColor, div( 1.0, exp( mul( 0.12, rayT ) ) ) ).add( vec3( 9.0, 3.0, 1.0 ).mul( 0.1 ).mul( glowIntensity1 ).mul( 0.02 ).div( exp( mul( 0.05, rayT ) ) ) ).add( glowColor2.div( exp( mul( 0.03, rayT ) ) ) ) );

	// 辉光2叠加
	// 2. 色调映射（Reinhard变种，压缩高动态范围）

	finalColor.assign( finalColor.mul( mul( 2.51, finalColor ).add( 0.03 ) ).div( finalColor.mul( mul( 2.43, finalColor ).add( 0.59 ) ).add( 0.14 ) ) );

	// 3. 屏幕空间暗角 + 伽马校正

	const uv = fragCoord.div( resolution );

	// 归一化UV

	uv.assign( uv.mul( sub( 1.0, uv ) ) );

	// 暗角计算（中心亮，边缘暗）
	// 最终颜色：暗角调制 + 伽马校正（pow(2.5)）

	// fragColor.assign( vec4(16.0 * uv.x * uv.y, 0.25), vec3(2.5, 1.0));
   fragColor.assign( vec4(1,1,0, 1.0));
   return fragColor
} );
