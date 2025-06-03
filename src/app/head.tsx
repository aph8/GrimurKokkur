// app/head.tsx
export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Preload only when viewport ≥ 769px */}
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
