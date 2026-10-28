export interface Sticker {
  id: number;
  packageId: number;
}

export interface StickerPackage {
  id: number;
  title: string;
  stickers: Sticker[];
}

export const stickerImage = (sticker: Sticker): string =>
  `https://stickershop.line-scdn.net/stickershop/v1/sticker/${sticker.id}/android/sticker.png`;

/** Sticker ids are consecutive within each package: [first, last]. */
const PACKAGES: [id: number, title: string, first: number, last: number][] = [
  [446, 'Moon: Special Edition', 1988, 2027],
  [789, 'Sally: Special Edition', 10855, 10894],
  [1070, 'Moon: Special Edition', 17839, 17878],
  [6136, 'LINE Characters: Making Amends', 10551376, 10551399],
  [6325, 'Brown and Cony Fun Size Pack', 10979904, 10979927],
  [6359, 'Brown and Cony Fun Size Pack', 11069848, 11069871],
  [6362, 'Brown and Cony Fun Size Pack', 11087920, 11087943],
  [6370, 'Brown and Cony Fun Size Pack', 11088016, 11088039],
  [6632, 'LINE Characters: Making Amends', 11825374, 11825397],
  [8515, 'LINE Characters: Pretty Phrases', 16581242, 16581265],
  [8522, 'LINE Characters: Pretty Phrases', 16581266, 16581289],
  [8525, 'LINE Characters: Pretty Phrases', 16581290, 16581313],
  [11537, 'Brown & Cony & Sally: Animated Special', 52002734, 52002773],
  [11538, 'CHOCO & Friends: Animated Special', 51626494, 51626533],
  [11539, 'UNIVERSTAR BT21: Animated Special', 52114110, 52114149],
];

export const STICKER_PACKAGES: StickerPackage[] = PACKAGES.map(([id, title, first, last]) => ({
  id,
  title,
  stickers: Array.from({ length: last - first + 1 }, (_, i) => ({ id: first + i, packageId: id })),
}));
