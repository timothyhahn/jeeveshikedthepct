import { type Writable, writable } from 'svelte/store';
import type { Image } from '$lib/image';

export interface DisplayImageInLightbox {
	images: Image[];
	index: number;
}
export const displayImage: Writable<DisplayImageInLightbox | null> = writable(null);
