---
title: "Apple Interview Prep - Day 6"
date: 2026-09-02
draft: true
---

Mostly just continuing to look at the checkerboard shader
https://www.shadertoy.com/view/NfVXzd
```cpp
// see https://iquilezles.org/articles/checkerfiltering/

mat2 RotateDeg( float deg )
{
  float rad = radians(deg);
  return mat2( cos(rad), -sin(rad), sin(rad), cos(rad) );
}

float SquareWave( float x ) // [ 1, 2, 3, ... ] -> [ 1, -1, 1, ... ]
{
  x = fract( x * .5 ) - .5;
  return -sign(x);
}

float TriangleWave( float x )
{
  return 1. - 2. * abs( fract( x * .5 ) - .5 ); 
}

vec2 TriangleWave( vec2 x )
{
  return 1. - 2. * abs( fract( x * .5 ) - .5 );
}

vec2 AverageSquareWave( vec2 uv, vec2 w )
{
    // f_{avg} = fract{ F(b) - F(a) }{ b - a }
    // where TriangleWave is the integral of a SquareWave
    vec2 a = uv - 0.5 * w;
    vec2 b = uv + 0.5 * w;
    vec2 i = (TriangleWave(b)-TriangleWave(a))/w; // analytical integral (box filter)
    return i;
}

float checkersGrad( in vec2 uv)
{
    vec2 ddx = dFdx( uv );
    vec2 ddy = dFdy( uv );
    vec2 w = max(abs(ddx), abs(ddy)) + 0.01;    // filter kernel
    vec2 i = AverageSquareWave( uv, w );
    return 0.5 - 0.5*i.x*i.y;                   // xor pattern
}

float checkers( vec2 uv )
{

    uv = fract( uv * .5 );              // [0 to 1]...x2
    uv -= .5;                           // [-.5 to .5]...x2
    vec2 s = sign( uv );                // [-1][1]... x2 
    float checker = s.x * s.y;          // [-1][1]... x2 in xor pattern ( -*-=+, -*+=-, +*-=-, +*+=+ )
    checker = checker * .5 + .5;        // [0][1]... x2
    return 1. - checker;                // [1][0]... x2
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    
    float checker = 0.;
    vec2 uv = fragCoord/iResolution.y;  // [0 to 1]
    uv = RotateDeg( 15. ) * uv;         // rotate a bit (to see aliasing)
    uv *= 4.;                          // [0 to 4]
    
    fragColor = vec4(0,0,0,1);

    if( fract( iTime * .25 ) < .5 ) // 
        fragColor.xy = vec2( checkersGrad( uv ) );
    else 
        fragColor.yz = vec2( checkers  ( uv )  );
        
    // fragColor.xyz = vec3( uv, 0. );
    //fragColor.xyz = vec3(  SquareWave( uv.y ) );
    //fragColor.xyz = vec3( TriangleWave( uv.y ) );
}
```
