import JSZip from "jszip";

export const downloadEmptyZip = () => {
  const zip = new JSZip();

  zip.generateAsync({ type: "blob" }).then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "microservices.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
