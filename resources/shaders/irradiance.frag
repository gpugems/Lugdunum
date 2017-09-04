#version 450

#define PI 3.1415926535897932384626433832795

layout (set = 0, binding = 0) uniform samplerCube skyBox;

layout (location = 0) in vec3 inPos;

layout (location = 0) out vec4 outColor;

void main() {
    vec3 irradiance = vec3(0.0);
    float sampleDelta = 0.5;
    uint nrSamples = 0;

    float deltaPhi = (2.0f * float(PI)) / 180.0f;
    float deltaTheta = (0.5f * float(PI)) / 64.0f;

    vec3 N = normalize(inPos);
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 right = normalize(cross(up, N));
    up = cross(N, right);

    for (float phi = 0.0; phi < 6.283; phi += 0.025)
    {
        for (float theta = 0.0; theta < 1.7; theta += 0.1)
        {
            vec3 tempVec = cos(phi) * right + sin(phi) * up;
            vec3 sampleVec = cos(theta) * N + sin(theta) * tempVec;

            irradiance += texture(skyBox, sampleVec).rgb * cos(theta) * sin(theta);
            nrSamples++;
        }
    }
    vec3 hdrColor = PI * irradiance / float(nrSamples);

    //outColor = vec4(hdrColor / (hdrColor + vec3(1.0)), 1.0);
    outColor = vec4(hdrColor, 1.0);
    //vec3 N = normalize(inPos);
    //outColor = vec4(texture(skyBox, N).rgb, 1.0);
}
