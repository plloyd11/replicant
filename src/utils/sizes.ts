const SIZE_ORDER: Record<string, number> = {
    Small: 1,
    Medium: 2,
    Large: 3,
    XL: 4,
    '2XL': 5,
    '3XL': 6,
};

const DEFAULT_SIZES = ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL'];

/**
 * Normalize a single size string to a standard display format.
 */
export function normalizeSize(size: string): string {
    return size
        .trim()
        .replace(/_/g, ' ')
        .replace(/\bsmall\b/i, 'Small')
        .replace(/\bmedium\b/i, 'Medium')
        .replace(/\blarge\b/i, 'Large')
        .replace(/\bxl\b/i, 'XL')
        .replace(/\bdouble xl\b/i, '2XL')
        .replace(/\btriple xl\b/i, '3XL')
        .replace(/\bxxl\b/i, '2XL')
        .replace(/\bxxxl\b/i, '3XL')
        .replace(/double_xl/i, '2XL')
        .replace(/triple_xl/i, '3XL');
}

/**
 * Parse a pipe/comma-delimited sizes string into an array of normalized sizes.
 */
export function parseSizes(sizes: string | undefined | null): string[] {
    if (!sizes) return [];
    return String(sizes)
        .split(/\||,/)
        .map(normalizeSize)
        .filter((s) => s);
}

/**
 * Get Snipcart size options string (pipe-delimited) for a product.
 */
export function getSizeOptions(sizes: string | undefined | null, productType: string, isSale = false): string | null {
    const parsed = parseSizes(sizes);
    if (parsed.length > 0) return parsed.join(' | ');
    if (productType === 'clothing' && !isSale) return DEFAULT_SIZES.join(' | ');
    return null;
}

/**
 * Get display sizes string (dot-delimited) for a product.
 */
export function formatSizesForDisplay(sizes: string | undefined | null, productType: string): string {
    const parsed = parseSizes(sizes);
    if (parsed.length > 0) return parsed.join(' · ');
    if (productType === 'clothing') return DEFAULT_SIZES.join(' · ');
    return '';
}

/**
 * Extract unique sorted sizes from an array of products.
 */
export function extractUniqueSizes(products: { sizes?: string; productType: string }[]): string[] {
    const allSizes = new Set<string>();
    products.forEach((product) => {
        parseSizes(product.sizes).forEach((size) => allSizes.add(size));
    });

    if (allSizes.size === 0 && products.some((p) => p.productType === 'clothing')) {
        return [...DEFAULT_SIZES];
    }

    return Array.from(allSizes).sort((a, b) => (SIZE_ORDER[a] || 99) - (SIZE_ORDER[b] || 99));
}
