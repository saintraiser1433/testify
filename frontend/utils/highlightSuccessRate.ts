export const highlightSuccessRate = (rate: number) => {
    if (rate <= 50.99) return 'bg-carnation-500 text-white';
    if (rate <= 69.99) return 'bg-primary-500  text-white';
    if (rate <= 89.99) return 'bg-scooter-800  text-white';
    return 'bg-emerald-500  text-white';
};