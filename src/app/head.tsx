// src/app/head.tsx
export default function Head() {
  return (
    <>
      {/* Tell the browser to match CSS to the real device width */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Preload these four “desktop” SVGs only when screen ≥ 769px */}
      <link
        rel="preload"
        as="image"
        href="/fiskibollur_portrait.svg"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        as="image"
        href="/humarsupa_portrait.svg"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        as="image"
        href="/fiskistangir_portrait.svg"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        as="image"
        href="/plokkfiskur_portrait.svg"
        media="(min-width: 769px)"
      />
    </>
  );
}
