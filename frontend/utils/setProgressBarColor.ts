export const setProgressBarColor = (rate: number): ProgressColor => {
  if (rate <= 50.99) return 'rose';
  if (rate <= 69.99) return 'yellow';
  if (rate <= 89.99) return 'indigo';
  return 'emerald';
};