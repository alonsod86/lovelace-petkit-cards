/**
 * Inline SVG illustration of the Petkit globe-shaped self-cleaning litterbox.
 * Used as the default hero image when no `picture` URL is configured.
 *
 * Design: front-facing 3/4 view of the white globe body with circular entrance,
 * LED indicator strip, glossy highlight, and flat base tray.
 */
export const PETKIT_DEVICE_SVG = `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Petkit litterbox">
  <defs>
    <!-- Sphere body: radial gradient from bright top-left to shadowed bottom-right -->
    <radialGradient id="pk-sphere" cx="38%" cy="32%" r="62%">
      <stop offset="0%"   stop-color="#ffffff"/>
      <stop offset="35%"  stop-color="#f7f7f8"/>
      <stop offset="75%"  stop-color="#e2e2e5"/>
      <stop offset="100%" stop-color="#c8c8cc"/>
    </radialGradient>

    <!-- Entrance hole dark interior -->
    <radialGradient id="pk-hole" cx="42%" cy="40%" r="58%">
      <stop offset="0%"   stop-color="#3d3d3d"/>
      <stop offset="60%"  stop-color="#1e1e1e"/>
      <stop offset="100%" stop-color="#111111"/>
    </radialGradient>

    <!-- Base tray top face -->
    <linearGradient id="pk-base" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#e6e6ea"/>
      <stop offset="100%" stop-color="#c4c4c8"/>
    </linearGradient>

    <!-- Base tray front face (slightly darker) -->
    <linearGradient id="pk-base-front" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#d0d0d4"/>
      <stop offset="100%" stop-color="#b8b8bc"/>
    </linearGradient>

    <!-- LED strip -->
    <linearGradient id="pk-led" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#00acc1" stop-opacity="0.6"/>
      <stop offset="40%"  stop-color="#29b6f6"/>
      <stop offset="60%"  stop-color="#29b6f6"/>
      <stop offset="100%" stop-color="#00acc1" stop-opacity="0.6"/>
    </linearGradient>

    <!-- Cast shadow below tray -->
    <radialGradient id="pk-shadow" cx="50%" cy="20%" r="50%">
      <stop offset="0%"   stop-color="rgba(0,0,0,0.18)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>

    <!-- Clip to sphere outline for bottom ambient shadow overlay -->
    <clipPath id="pk-sphere-clip">
      <ellipse cx="158" cy="136" rx="106" ry="100"/>
    </clipPath>
  </defs>

  <!-- ── Cast shadow ── -->
  <ellipse cx="158" cy="243" rx="105" ry="11" fill="url(#pk-shadow)"/>

  <!-- ── Base tray ── -->
  <!-- Top face -->
  <rect x="52" y="225" width="212" height="18" rx="7" fill="url(#pk-base)"/>
  <!-- Front face (slight depth) -->
  <rect x="54" y="239" width="208" height="10" rx="4" fill="url(#pk-base-front)"/>
  <!-- Tray trim line -->
  <rect x="52" y="225" width="212" height="4" rx="3" fill="rgba(255,255,255,0.6)"/>

  <!-- ── Globe body ── -->
  <!-- Outer edge shadow ring (ambient occlusion) -->
  <ellipse cx="158" cy="136" rx="109" ry="103" fill="rgba(0,0,0,0.10)"/>
  <!-- Main sphere -->
  <ellipse cx="158" cy="136" rx="106" ry="100" fill="url(#pk-sphere)"/>

  <!-- ── Bottom ambient occlusion (inside sphere, near base) ── -->
  <ellipse cx="158" cy="232" rx="106" ry="28"
           fill="rgba(0,0,0,0.07)" clip-path="url(#pk-sphere-clip)"/>

  <!-- ── Entrance hole ── -->
  <!-- Outer shadow ring -->
  <circle cx="240" cy="163" r="44" fill="rgba(0,0,0,0.22)"/>
  <!-- Hole inner surface -->
  <circle cx="238" cy="161" r="40" fill="url(#pk-hole)"/>
  <!-- Rim highlight (top arc catches light) -->
  <path d="M 203 130 A 40 40 0 0 1 278 161"
        fill="none" stroke="rgba(255,255,255,0.45)"
        stroke-width="2.5" stroke-linecap="round"/>
  <!-- Inner rim edge -->
  <circle cx="238" cy="161" r="40"
          fill="none" stroke="rgba(255,255,255,0.12)"
          stroke-width="1.5"/>

  <!-- ── LED indicator strip (top cap area) ── -->
  <rect x="130" y="44" width="56" height="7" rx="3.5" fill="url(#pk-led)"/>
  <!-- LED glow -->
  <rect x="128" y="42" width="60" height="11" rx="5.5"
        fill="rgba(41,182,246,0.15)"/>

  <!-- ── Primary specular highlight (top-left of globe) ── -->
  <ellipse cx="113" cy="88" rx="32" ry="22"
           fill="rgba(255,255,255,0.52)"
           transform="rotate(-22, 113, 88)"/>
  <!-- Secondary smaller highlight -->
  <ellipse cx="97" cy="102" rx="13" ry="9"
           fill="rgba(255,255,255,0.30)"
           transform="rotate(-15, 97, 102)"/>

  <!-- ── PETKIT wordmark on globe body ── -->
  <text x="145" y="200"
        text-anchor="middle"
        fill="#b0b0b5"
        font-size="9.5"
        font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-weight="300"
        letter-spacing="3.5">PETKIT</text>

  <!-- ── Top cap dome (deodorizer / motor housing) ── -->
  <!-- Small raised dome at very top -->
  <ellipse cx="158" cy="38" rx="26" ry="10"
           fill="#e8e8ec" stroke="#d8d8dc" stroke-width="0.5"/>
  <ellipse cx="158" cy="36" rx="24" ry="7"
           fill="#f0f0f4"/>
  <!-- Cap highlight -->
  <ellipse cx="153" cy="34" rx="10" ry="4"
           fill="rgba(255,255,255,0.6)"
           transform="rotate(-10, 153, 34)"/>
</svg>`;
