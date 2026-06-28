export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const truncate = (str, length) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export const colorMatches = {
  black: ['white', 'beige', 'cream', 'brown', 'navy', 'gray'],
  white: ['black', 'navy', 'brown', 'beige', 'cream', 'any'],
  navy: ['white', 'cream', 'beige', 'brown', 'gray', 'black'],
  beige: ['black', 'white', 'brown', 'navy', 'cream', 'gold'],
  brown: ['white', 'beige', 'cream', 'black', 'navy', 'gold'],
  cream: ['black', 'navy', 'brown', 'beige', 'white', 'gold'],
  pink: ['white', 'black', 'gray', 'navy', 'cream', 'beige'],
  blue: ['white', 'cream', 'beige', 'brown', 'gold', 'black'],
};

export const getColorMatches = (color) => {
  return colorMatches[color.toLowerCase()] || [];
};
