import normalizeDropboxPath from "./normalizeDropboxPath.js";

const MAX_PATH_LENGTH = 240;

function buildUploadPath(
  storagePath: string,
  itemnumber: number,
  title: string,
  fileName: string,
  uploadDate?: string,
) {
  const baseDir = normalizeDropboxPath(storagePath, title);

  const fileExtension =
    fileName && fileName.lastIndexOf(".") > 0
      ? fileName.substring(fileName.lastIndexOf("."))
      : "";

  const datePart = uploadDate ? ` ${uploadDate}` : "";
  const fileNamePart = fileName ? ` ${fileName}` : "";
  const extPart = fileExtension ? ` ${fileExtension}` : "";

  // 1) Full: /listname/itemnumber [date] [filename]
  const variant1 = normalizeDropboxPath(
    baseDir,
    `${itemnumber}${datePart}${fileNamePart}`,
  );

  if (variant1.length <= MAX_PATH_LENGTH) {
    return variant1;
  }

  // 2) Smaller: /listname/itemnumber [date] [extension]
  const variant2 = normalizeDropboxPath(
    baseDir,
    `${itemnumber}${datePart}${extPart}`,
  );

  if (variant2.length <= MAX_PATH_LENGTH) {
    return variant2;
  }

  // 3) Smallest: /listname/itemnumber [extension]
  const variant3 = normalizeDropboxPath(baseDir, `${itemnumber}${extPart}`);

  if (variant3.length <= MAX_PATH_LENGTH) {
    return variant3;
  }

  // 4) Still too long → crash
  throw new Error(
    `Upload path too long (min variant is ${variant3.length} chars, max allowed is ${MAX_PATH_LENGTH}).`,
  );
}

export default buildUploadPath;
