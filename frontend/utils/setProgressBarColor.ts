export const setProgressBarColor = (rate: number): ProgressColor => {
  if (rate <= 50.99) return 'rose';
  if (rate <= 69.99) return 'primary';
  if (rate <= 89.99) return 'cyan';
  return 'emerald';
};