import { Sticker } from "./sticker";

export class StickerPackage {
    id: number;
    stickers: Array<Sticker>

    constructor(params: Partial<StickerPackage>) {
        this.id = params.id ?? 0;
        this.stickers = params.stickers ?? []
    }
}