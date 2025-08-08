/**
 * Poster configuration - adjust these values to change poster size throughout the app
 *
 * How to modify:
 * 1. Change width and height to your desired poster dimensions
 * 2. Update aspectRatio to match your new dimensions (use format: aspect-[width/height])
 * 3. Common poster ratios:
 *    - Movie posters: aspect-[2/3] (width 320px, height 480px)
 *    - Square posters: aspect-[1/1] (width 320px, height 320px)
 *    - Landscape posters: aspect-[3/2] (width 480px, height 320px)
 *
 * The dimensions will scale responsively on smaller screens while maintaining the aspect ratio.
 */
export const POSTER_CONFIG = {
  // Width in pixels (at base screen size)
  width: 320,
  // Height in pixels (at base screen size)
  height: 480,
  // Aspect ratio as Tailwind class - calculated as width/height
  aspectRatio: "aspect-[2/3]", // 320/480 = 2/3 ratio (standard movie poster)
} as const;