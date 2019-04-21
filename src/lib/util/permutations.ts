export function* permutations(elements: any[] | string): IterableIterator<any[] | string> {
	if (elements.length <= 1) {
		yield elements;
	} else {
		for (const permutation of permutations(elements.slice(1))) {
			for (let i = 0; i < elements.length; i++) {
				yield (permutation as any).slice(0, i).concat(elements.slice(0, 1), permutation.slice(i));
			}
		}
	}
}
