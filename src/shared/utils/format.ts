export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US');
}

export function formatRelativeTime(date: string | Date, locale: string = 'en'): string {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return locale === 'ar' ? 'اليوم' : 'Today';
  } else if (diffInDays === 1) {
    return locale === 'ar' ? 'أمس' : 'Yesterday';
  } else if (diffInDays < 7) {
    return locale === 'ar' ? `منذ ${diffInDays} أيام` : `${diffInDays} days ago`;
  } else {
    return formatDate(dateObj, locale);
  }
}

export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}
