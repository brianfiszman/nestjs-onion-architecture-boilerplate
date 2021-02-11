import { CategoryTree, Children, Categories } from '../interfaces/';

export const getCategoryFromCode = (_code: number, categories: Categories): Children | null => {
  const code = _code?.toString();
  const categoriesTree: CategoryTree[] = categories.children;

  const tree: CategoryTree | null =
    categoriesTree.find(parent => {
      const result = parent.children?.find(child => child.code === code);
      if (result) return result;
    }) || null;

  return tree?.children?.find(child => child.code === String(code)) || null;
};
