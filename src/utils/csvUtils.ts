
export const parseCSV = (csvContent: string) => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  const result = [];
  for(let i = 1; i < lines.length; i++) {
    if(!lines[i].trim()) continue;
    const obj: Record<string, string> = {};
    const currentLine = lines[i].split(',');
    
    for(let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : '';
    }
    result.push(obj);
  }
  
  return result;
};

export const objectsToCSV = (data: any[]) => {
  if(!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  csvRows.push(headers.join(','));
  
  for(const row of data) {
    const values = headers.map(header => {
      const escaped = (''+row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
