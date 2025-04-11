
/**
 * Utility functions for handling CSV data import and export
 */

/**
 * Parse a CSV string into an array of objects
 * @param csv The CSV string to parse
 * @param headers Optional headers to use instead of the first row
 * @returns An array of objects representing the CSV data
 */
export const parseCSV = (csv: string, headers?: string[]): Record<string, string>[] => {
  const lines = csv.trim().split('\n');
  
  // Use provided headers or take from first line
  const csvHeaders = headers || lines[0].split(',').map(header => header.trim());
  
  // Start from index 1 if we're using headers from the CSV
  const startIndex = headers ? 0 : 1;
  
  return lines.slice(startIndex).map(line => {
    const values = line.split(',').map(value => value.trim());
    const record: Record<string, string> = {};
    
    csvHeaders.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    
    return record;
  });
};

/**
 * Convert an array of objects to a CSV string
 * @param data The array of objects to convert to CSV
 * @returns A CSV string representation of the data
 */
export const objectsToCSV = (data: Record<string, any>[]): string => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const headerRow = headers.join(',');
  
  const rows = data.map(item => {
    return headers.map(header => {
      // Handle values that contain commas
      const value = item[header]?.toString() || '';
      return value.includes(',') ? `"${value}"` : value;
    }).join(',');
  });
  
  return [headerRow, ...rows].join('\n');
};

/**
 * Trigger a file download with the provided content
 * @param content The content to download
 * @param filename The filename for the download
 * @param contentType The content type of the file
 */
export const downloadFile = (
  content: string, 
  filename: string,
  contentType: string = 'text/csv;charset=utf-8;'
): void => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  
  // Append to body, click and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL
  URL.revokeObjectURL(url);
};
