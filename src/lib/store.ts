import { type Writable, writable } from 'svelte/store';
import type { Image } from '$lib/image';

export const displayImage: Writable<Image | null> = writable(null);
