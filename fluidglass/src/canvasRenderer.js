import { RenderTarget, Texture } from "ogl";

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

let texture = undefined
// document.body.append(canvas)
/**
 * 
 * @param {RenderTarget} target 
 * @param {(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void} callback
 * @param {Texture} [texture] - Optional texture to reuse
 * @returns {Texture}
 */
export default function (target, callback) {
    // Use higher resolution for better text quality
    const scale = 4; // 4x resolution
    canvas.width = target.width * scale
    canvas.height = target.height * scale
    ctx.scale(scale, scale)
    callback(canvas, ctx)
    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset transform
    if (!texture) {
        texture = new Texture(target.gl)
        texture.image = canvas
    }
    texture.needsUpdate = true // Ensure ogl updates the texture
    return texture
}