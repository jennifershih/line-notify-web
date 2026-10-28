import { STICKER_PACKAGES, stickerImage } from './stickers';

describe('stickers', () => {
  it('keeps all 15 packages and 456 stickers', () => {
    expect(STICKER_PACKAGES).toHaveLength(15);
    expect(STICKER_PACKAGES.flatMap((p) => p.stickers)).toHaveLength(456);
  });

  it('builds the sticker image URL', () => {
    expect(stickerImage({ id: 1988, packageId: 446 })).toBe(
      'https://stickershop.line-scdn.net/stickershop/v1/sticker/1988/android/sticker.png',
    );
  });
});
