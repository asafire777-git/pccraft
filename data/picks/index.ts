import { PickItem } from './types';
import { dokoHairDryer } from './doko-hair-dryer';
import customPicksData from './custom-picks.json';

export * from './types';

const customPicks: PickItem[] = (customPicksData as unknown as PickItem[]) || [];

export const allPicks: PickItem[] = [
  ...customPicks,
  dokoHairDryer,
];

export function getAllPicks(): PickItem[] {
  return [...allPicks].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPickBySlug(slug: string): PickItem | undefined {
  return allPicks.find((p) => p.slug === slug);
}

export function getPicksByCategory(category: string): PickItem[] {
  if (category === 'all' || !category) return getAllPicks();
  return allPicks.filter((p) => p.category === category);
}
