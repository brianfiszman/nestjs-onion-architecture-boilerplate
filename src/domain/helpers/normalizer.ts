export const removeHTMLFromField = (field: any): string => {
  const HTMLRegex = new RegExp('</?[^>]+(>|$)|(&lt;(\\d+%:)?)|(&nbsp;)', 'g');
  return typeof field === 'string' ? field.replace(HTMLRegex, '') : field;
};

export const convertUnixToDate = (date: string): string => new Date(Number(date) * 1000).toISOString();
