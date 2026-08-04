// Thin data-access layer used by customer-facing pages. It now delegates to
// the same service modules the admin dashboard uses, so admin edits (menu,
// categories, restaurant profile) are immediately visible to customers too.
// `table` (the current dining session) stays a static mock since it isn't
// something the admin dashboard manages.
import table from '../data/table.json';
import { getMenuItems } from '../services/menuService';
import { getCategories } from '../services/categoryService';
import { getRestaurant } from '../services/restaurantService';

export { getRestaurant, getCategories, getMenuItems };
export const getTable = () => Promise.resolve(table);
