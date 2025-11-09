
varying vec2 vUv;
uniform sampler2D uAtlas;
uniform vec4 uTextureCoords;
uniform float uAspectRatio;

void main()
{
    // Create circular mask
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    float mask = smoothstep(0.5, 0.48, dist);

    float xStart = uTextureCoords.x;
    float xEnd = uTextureCoords.y;
    float yStart = uTextureCoords.z;
    float yEnd = uTextureCoords.w;

    // Apply object-fit: cover effect for circular geometry
    // The geometry is circular (aspect ratio 1:1)
    // We need to crop the image to fit without distortion
    vec2 adjustedUV = vUv;

    if (uAspectRatio > 1.0) {
        // Image is wider than tall - crop sides, keep center
        float cropWidth = 1.0 / uAspectRatio;
        adjustedUV.x = 0.5 + (vUv.x - 0.5) * cropWidth;
    } else if (uAspectRatio < 1.0) {
        // Image is taller than wide - crop top/bottom, keep center
        float cropHeight = uAspectRatio;
        adjustedUV.y = 0.5 + (vUv.y - 0.5) * cropHeight;
    }
    // if uAspectRatio == 1.0, no adjustment needed (square image)

    // Transform the default UV coordinates to sample from the correct part of the atlas
    vec2 atlasUV = vec2(
        mix(xStart, xEnd, adjustedUV.x),
        mix(yStart, yEnd, 1.-adjustedUV.y)
    );

    // Sample the texture
    vec4 color = texture2D(uAtlas, atlasUV);

    // Apply circular mask to alpha
    color.a *= mask;

    gl_FragColor = color;
}