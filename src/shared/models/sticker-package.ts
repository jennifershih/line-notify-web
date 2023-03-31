import { Sticker, stickers } from './sticker';

export interface IStickerPackage {
  id: number;
  title: string;
}

export class StickerPackage implements IStickerPackage {
  id: number;
  title: string;
  stickers: Array<Sticker>;

  constructor(params: Partial<StickerPackage>) {
    this.id = params.id ?? 0;
    this.title = params.title ?? '';
    this.stickers = params.stickers ?? [];
  }
}

const stickerPackageData: Array<IStickerPackage> = [
  { id: 446, title: 'Moon: Special Edition' },
  { id: 789, title: 'Sally: Special Edition' },
  { id: 1070, title: 'Moon: Special Edition' },
  { id: 6136, title: 'LINE Characters: Making Amends' },
  { id: 6325, title: 'Brown and Cony Fun Size Pack' },
  { id: 6359, title: 'Brown and Cony Fun Size Pack' },
  { id: 6362, title: 'Brown and Cony Fun Size Pack' },
  { id: 6370, title: 'Brown and Cony Fun Size Pack' },
  { id: 6632, title: 'LINE Characters: Making Amends' },
  { id: 8515, title: 'LINE Characters: Pretty Phrases' },
  { id: 8522, title: 'LINE Characters: Pretty Phrases' },
  { id: 8525, title: 'LINE Characters: Pretty Phrases' },
  { id: 11537, title: 'Brown & Cony & Sally: Animated Special' },
  { id: 11538, title: 'CHOCO & Friends: Animated Special' },
  { id: 11539, title: 'UNIVERSTAR BT21: Animated Special' },
];

const stickerPackageMap = new Map<number, Array<Sticker>>();
stickerPackageData
  .map((it) => it.id)
  .forEach((packageId) => stickerPackageMap.set(packageId, []));
stickers.forEach((sticker) => {
  const stickersGroupByPackage = stickerPackageMap.get(sticker.packageId);
  stickersGroupByPackage?.push(sticker);
});

export const stickerPackages = stickerPackageData.map((it) => {
  const stickers = stickerPackageMap.get(it.id) ?? [];
  const params = { ...it, stickers: stickers };
  return new StickerPackage(params);
});
