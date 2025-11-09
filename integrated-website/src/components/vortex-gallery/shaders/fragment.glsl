varying vec2 vUv;
uniform sampler2D uAtlas;
varying vec4 vTextureCoords;
varying float vAspectRatio;

void main()
{
    // Create circular mask
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    float mask = smoothstep(0.5, 0.48, dist);

    // Get UV coordinates for this image from the uniform array
    float xStart = vTextureCoords.x;
    float xEnd = vTextureCoords.y;
    float yStart = vTextureCoords.z;
    float yEnd = vTextureCoords.w;

    // Apply object-fit: cover effect for circular geometry
    vec2 adjustedUV = vUv;

    if (vAspectRatio > 1.0) {
        // Image is wider than tall - crop sides, keep center
        float cropWidth = 1.0 / vAspectRatio;
        adjustedUV.x = 0.5 + (vUv.x - 0.5) * cropWidth;
    } else if (vAspectRatio < 1.0) {
        // Image is taller than wide - crop top/bottom, keep center
        float cropHeight = vAspectRatio;
        adjustedUV.y = 0.5 + (vUv.y - 0.5) * cropHeight;
    }

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