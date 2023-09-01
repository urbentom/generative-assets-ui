import JSZip from "jszip";
// @ts-ignore
import JSZipUtils from "jszip-utils";
import { GeneratedAsset } from "../hooks";

function urlToPromise(url: string): Promise<ArrayBuffer> {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err: Error, data: ArrayBuffer) {
      if (err) {
        reject(err);
      } else {
        console.log("typeof data", typeof data);
        resolve(data);
      }
    });
  });
}

export const zipGeneratedAssets = async (generatedAssets: GeneratedAsset[]) => {
  const zip = new JSZip();

  const imgDir = zip.folder("images");
  const jsonDir = zip.folder("json");

  if (!imgDir || !jsonDir) throw new Error("Could not create zip file");

  await Promise.all(
    generatedAssets.map(async ({ artwork, json }, index) => {
      const img = await urlToPromise(artwork);
      imgDir.file(`${index}.png`, img, {
        base64: true,
      });
      jsonDir.file(`${index}.json`, JSON.stringify(json));
    })
  );

  const content = await zip.generateAsync({ type: "blob" });

  return content;
};
