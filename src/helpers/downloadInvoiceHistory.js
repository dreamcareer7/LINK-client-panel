// eslint-disable-next-line import/prefer-default-export
export const downloadInvoiceHistory = (data, name) => {
  const file = new Blob([data], { type: 'text/csv' });
  const fileURL = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = fileURL;
  a.setAttribute('download', name);
  a.click();
};
