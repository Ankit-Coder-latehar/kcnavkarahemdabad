import { CATEGORIES, BRANDS } from './categories';
import { FABRIC_OPTIONS } from './products';

// Default sizes available in the filter sidebar
export const DEFAULT_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

// Load site config from localStorage, falling back to defaults from the data files
export function loadSiteConfig() {
  try {
    const saved = localStorage.getItem('kcnavkar_site_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        headerCategories: Array.isArray(parsed.headerCategories) && parsed.headerCategories.length > 0
          ? parsed.headerCategories
          : (Array.isArray(parsed.categories) ? parsed.categories : CATEGORIES),
        filterCategories: Array.isArray(parsed.filterCategories) && parsed.filterCategories.length > 0
          ? parsed.filterCategories
          : (Array.isArray(parsed.categories) ? parsed.categories : CATEGORIES),
        brands: Array.isArray(parsed.brands) && parsed.brands.length > 0
          ? parsed.brands
          : BRANDS,
        fabrics: Array.isArray(parsed.fabrics) && parsed.fabrics.length > 0
          ? parsed.fabrics
          : FABRIC_OPTIONS,
        sizes: Array.isArray(parsed.sizes) && parsed.sizes.length > 0
          ? parsed.sizes
          : DEFAULT_SIZES,
      };
    }
  } catch (e) {
    console.error('Failed to load site config from localStorage', e);
  }
  return {
    headerCategories: CATEGORIES,
    filterCategories: CATEGORIES,
    brands: BRANDS,
    fabrics: FABRIC_OPTIONS,
    sizes: DEFAULT_SIZES,
  };
}

export function saveSiteConfig(config) {
  try {
    localStorage.setItem('kcnavkar_site_config', JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save site config to localStorage', e);
  }
}

