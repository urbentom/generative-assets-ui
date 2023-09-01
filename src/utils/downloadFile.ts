export const downloadFile = (data: any, type: string, name: string) => {
  let blob = new Blob([data], { type });
  let url = window.URL.createObjectURL(blob);
  downloadURI(url, name);
  window.URL.revokeObjectURL(url);
};

function downloadURI(uri: string, name: string) {
  let link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}
