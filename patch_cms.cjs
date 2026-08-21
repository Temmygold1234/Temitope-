const fs = require('fs');
let code = fs.readFileSync('src/context/CMSContext.tsx', 'utf8');

code = code.replace(
  /import defaultHomeSettings from '\.\.\/cms_home\.json';/,
  `import defaultHomeSettings from '../cms_home.json';
import defaultCategories from '../cms_categories.json';`
);

code = code.replace(
  /setCategories\(safeJSONParse\(storedCategories, CATEGORIES\)\);/g,
  `setCategories(safeJSONParse(storedCategories, defaultCategories));`
);

code = code.replace(
  /setCategories\(CATEGORIES\);/g,
  `setCategories(defaultCategories);`
);

code = code.replace(
  /const addCategory = \(category: any\) => \{[\s\S]*?localStorage\.setItem\('cms_categories', JSON\.stringify\(newCategories\)\);\s*\};/g,
  `const saveCategoriesToBackend = (cats: any[]) => {
    fetch('/api/cms/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cats)
    }).catch(err => console.error('Failed to save CMS categories to file:', err));
  };

  const addCategory = (category: any) => {
    const newCategories = [...categories, category];
    setCategories(newCategories);
    localStorage.setItem('cms_categories', JSON.stringify(newCategories));
    saveCategoriesToBackend(newCategories);
  };`
);

code = code.replace(
  /const updateCategory = \(oldName: string, newCategory: any\) => \{[\s\S]*?localStorage\.setItem\('cms_categories', JSON\.stringify\(newCategories\)\);\s*\};/g,
  `const updateCategory = (oldName: string, newCategory: any) => {
    const newCategories = categories.map(c => c.name === oldName ? newCategory : c);
    setCategories(newCategories);
    localStorage.setItem('cms_categories', JSON.stringify(newCategories));
    saveCategoriesToBackend(newCategories);
  };`
);

code = code.replace(
  /const deleteCategory = \(name: string\) => \{[\s\S]*?localStorage\.setItem\('cms_categories', JSON\.stringify\(newCategories\)\);\s*\};/g,
  `const deleteCategory = (name: string) => {
    const newCategories = categories.filter(c => c.name !== name);
    setCategories(newCategories);
    localStorage.setItem('cms_categories', JSON.stringify(newCategories));
    saveCategoriesToBackend(newCategories);
  };`
);

fs.writeFileSync('src/context/CMSContext.tsx', code);
