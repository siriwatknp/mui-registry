import fs from 'fs';
import path from 'path';

export interface RegistryItem {
  $schema?: string;
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: Array<{
    path: string;
    content: string;
    type: string;
    target?: string;
  }>;
  meta: {
    screenshot: string;
    category?: string;
    tags?: string[];
  };
}

export interface RegistryCategory {
  name: string;
  label: string;
  count: number;
}

const PUBLIC_R_DIR = path.join(process.cwd(), 'public', 'r');

/**
 * Get all registry items from the public/r directory
 */
export function getRegistryItems(): RegistryItem[] {
  try {
    const files = fs
      .readdirSync(PUBLIC_R_DIR)
      .filter((file) => file.endsWith('.json') && file !== 'registry.json');

    const items: RegistryItem[] = [];

    for (const file of files) {
      try {
        const filePath = path.join(PUBLIC_R_DIR, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        // Ensure meta exists
        if (!content.meta) {
          content.meta = {};
        }
        
        items.push(content);
      } catch (error) {
        console.error(`Error parsing ${file}:`, error);
      }
    }

    return items;
  } catch (error) {
    console.error('Error reading registry directory:', error);
    return [];
  }
}

/**
 * Get a single registry item by name
 */
export function getRegistryByName(name: string): RegistryItem | null {
  try {
    const filePath = path.join(PUBLIC_R_DIR, `${name}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Ensure meta exists
    if (!content.meta) {
      content.meta = {};
    }
    
    return content;
  } catch (error) {
    console.error(`Error reading registry item ${name}:`, error);
    return null;
  }
}

/**
 * Get all registry items for a specific category
 */
export function getRegistryByCategory(category: string): RegistryItem[] {
  const allItems = getRegistryItems();
  return allItems.filter((item) => item.meta.category === category);
}

/**
 * Get all unique categories from registry items
 */
export function getCategories(): RegistryCategory[] {
  const allItems = getRegistryItems();
  const categoryMap = new Map<string, number>();

  for (const item of allItems) {
    const category = item.meta.category;
    if (category) {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    }
  }

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    count,
  }));
}

/**
 * Get all unique tags from registry items, optionally filtered by category
 */
export function getTags(category?: string): string[] {
  let items = getRegistryItems();
  
  if (category) {
    items = items.filter((item) => item.meta.category === category);
  }

  const tagsSet = new Set<string>();
  
  for (const item of items) {
    if (item.meta.tags) {
      for (const tag of item.meta.tags) {
        tagsSet.add(tag);
      }
    }
  }

  return Array.from(tagsSet).sort();
}

/**
 * Filter registry items by tags
 */
export function getRegistryByTags(tags: string[], category?: string): RegistryItem[] {
  let items = getRegistryItems();
  
  if (category) {
    items = items.filter((item) => item.meta.category === category);
  }

  return items.filter((item) => {
    if (!item.meta.tags || item.meta.tags.length === 0) {
      return false;
    }
    
    // Check if item has any of the specified tags
    return tags.some((tag) => item.meta.tags?.includes(tag));
  });
}

/**
 * Get all category names for generateStaticParams
 */
export function getAllCategoryNames(): string[] {
  const categories = getCategories();
  return categories.map((cat) => cat.name);
}

/**
 * Get all registry item names for generateStaticParams
 */
export function getAllRegistryNames(): string[] {
  const items = getRegistryItems();
  return items.map((item) => item.name);
}

/**
 * Get all registry item names for a specific category for generateStaticParams
 */
export function getRegistryNamesByCategory(category: string): string[] {
  const items = getRegistryByCategory(category);
  return items.map((item) => item.name);
}