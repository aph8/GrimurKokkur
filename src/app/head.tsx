// src/app/head.tsx
export default function Head() {
  return (
    <>
      {/* 1) Always include a viewport meta for responsive sizing */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* 2) Inline the minimal critical CSS for the desktop hero */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Critical desktop‐hero styles */
            .HeroSection_hero__5yfb5 {
              position: relative;
              height: 100vh;
              display: flex;
              overflow: hidden;
            }
            .HeroSection_panel__l3t_w {
              position: relative;
              flex: 1;
              z-index: 1;
              /* Panels may overlap; margin-left on subsequent panels */
            }
            .HeroSection_panel__l3t_w + .HeroSection_panel__l3t_w {
              margin-left: -5%;
            }
            .HeroSection_panel1__vzF6g {
              background-color: #111;
            }
            .HeroSection_overlayContent__Br9lV {
              position: absolute;
              top: 1.5rem;
              left: 1.5rem;
              z-index: 10;
              color: white;
            }
            .HeroSection_overlayContent__Br9lV h1 {
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              letter-spacing: 0.1em;
              margin: 0;
              background: rgba(0, 0, 0, 0.5);
              padding: 0.2em 0.4em;
              border-radius: 4px;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
            }
          `,
        }}
      />

      {/* 3) Preload the four desktop hero images when screen ≥ 769px */}
      <link
        rel="preload"
        as="image"
        href="/humarsupa_portrait.jpg"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        as="image"
        href="/fiskibollur_portrait.jpg"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        as="image"
        href="/fiskistangir_portrait.jpg"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        as="image"
        href="/plokkfiskur_portrait.jpg"
        media="(min-width: 769px)"
      />
    </>
  );
}
