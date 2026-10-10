// Serve photos from the same origin as the app, including after deployment.
export function photoProps(image, sizes) {
  if (image.startsWith('/')) return { src: image, decoding: 'async' };
  return {
    src: `/images/${image}-1200.webp`,
    srcSet: `/images/${image}-640.webp 640w, /images/${image}-1200.webp 1200w`,
    sizes,
    decoding: 'async',
  };
}
