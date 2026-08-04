import { useEffect, useState } from 'react';
import { getRestaurant, getTable, getCategories, getMenuItems } from '../utils/api';

export function useMenuData() {
  const [restaurant, setRestaurant] = useState(null);
  const [table, setTable] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getRestaurant(), getTable(), getCategories(), getMenuItems()]).then(
      ([r, t, c, m]) => {
        setRestaurant(r);
        setTable(t);
        setCategories(c);
        setMenuItems(m);
        setLoading(false);
      }
    );
  }, []);

  return { restaurant, table, categories, menuItems, loading };
}
