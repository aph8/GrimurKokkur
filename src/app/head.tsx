// src/app/head.tsx
export default function Head() {
  return (
    <>
      {/* 1) Viewport meta for responsive sizing */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* 2) Inline critical CSS for both DesktopHero and MobileHeroCarousel */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ===== DesktopHero critical CSS (from HeroSection.module.scss) ===== */
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

            /* ===== MobileHeroCarousel critical CSS (from HeroCarousel.module.scss) ===== */
            .HeroCarousel_carouselWrapper__IxtcD {
              position: relative;
              overflow: hidden;
              width: 100%;
              aspect-ratio: 20 / 30;
            }
            .HeroCarousel_slides__H7M-7 {
              display: flex;
              transition: transform 1s ease;
              height: 100%;
            }
            .HeroCarousel_slide__0JfQ3 {
              position: relative;
              min-width: 100%;
              height: 100%;
            }
            .HeroCarousel_overlayContent__5Is7h {
              position: absolute;
              top: 1.5rem;
              left: 1.5rem;
              z-index: 10;
              color: white;
            }
            .HeroCarousel_overlayContent__5Is7h h1 {
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

      {/* 3) Preload desktop hero images when viewport ≥ 769px */}
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
