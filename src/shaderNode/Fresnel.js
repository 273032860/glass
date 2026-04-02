
import { normalize, dot, float, sub, pow, mul, add, Fn, vec3, normalWorld, positionWorld, cameraPosition} from 'three/tsl';


/**
 * Fresnel 效应函数
 * 
 * 此函数计算 Fresnel 效应，用于模拟光线在表面上的反射和折射强度，
 * 其结果基于视线方向和表面法线的关系。
 * 
 * 默认参数 normal = normalWorld
 * 
 * vDir = normalize(cameraPosition.sub(positionWorld))
 * @function fresnel
 * @param {number} pow_immutable - 控制 Fresnel 效应衰减的幂值。
 * @returns {float} - 计算得到的 Fresnel 值（强度），一个表示 Fresnel 效应强度的浮点数。
*/
export const fresnel = /*#__PURE__*/ Fn( ([pow_immutable,norWorld=normalWorld]) => {
	const vDir = normalize(cameraPosition.sub(positionWorld)).toVar();
	 
	return norWorld.dot(vDir).saturate().oneMinus().pow( pow_immutable );

} )
export const fresnel_normal = /*#__PURE__*/ Fn( ([norWodld,pow_immutable]) => {
	const node1 = normalize(cameraPosition.sub(positionWorld)).toVar();
	const p = float( pow_immutable ).toVar();
	const NdotV = float( dot( norWodld, normalize(node1)) ).toVar();
	const fresnelNode = float( add( 0.0, mul( 1.0, pow( sub( 1.0, NdotV ), p ) ) ) ).toVar();

	return fresnelNode;

} )

// export const fresnel3 = /*#__PURE__*/ Fn( ([norWorld=normalWorld]) => {
// 	const vDir = normalize(cameraPosition.sub(positionWorld)).toVar();
	 
// 	return norWorld.dot(vDir).saturate().oneMinus().pow( pow_immutable );

// } )

// export const fresnel = /*#__PURE__*/ Fn( ([pow_immutable]) => {
// 	const node1 = normalize(cameraPosition.sub(positionWorld)).toVar();
// 	const p = float( pow_immutable ).toVar();
// 	const NdotV = float( dot( normalWorld, normalize(node1)) ).toVar();
// 	const fresnelNode = float( add( 0.0, mul( 1.0, pow( sub( 1.0, NdotV ), p ) ) ) ).toVar();

// 	return fresnelNode;

// } )
// export const fresnel_normal = /*#__PURE__*/ Fn( ([norWodld,pow_immutable]) => {
// 	const node1 = normalize(cameraPosition.sub(positionWorld)).toVar();
// 	const p = float( pow_immutable ).toVar();
// 	const NdotV = float( dot( norWodld, normalize(node1)) ).toVar();
// 	const fresnelNode = float( add( 0.0, mul( 1.0, pow( sub( 1.0, NdotV ), p ) ) ) ).toVar();

// 	return fresnelNode;

// } )