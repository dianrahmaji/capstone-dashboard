import {
  File,
  FileAudio,
  FileCode,
  FileCss,
  FileCsv,
  FileDoc,
  FileHtml,
  FileImage,
  FileJpg,
  FileJs,
  FileJsx,
  FileLock,
  FilePdf,
  FilePng,
  FilePpt,
  FileRs,
  FileTs,
  FileTsx,
  FileVue,
  FileVideo,
  FileXls,
  FileZip,
  FileText,
} from "phosphor-react";

function isArchive(extension) {
  return ["zip", "rar", "tar", "gz", "br2", "7z", "xz"].includes(
    extension.toLowerCase(),
  );
}

function isAudio(extension) {
  return [
    "mp3",
    "mp2",
    "M4a",
    "wav",
    "Aiff",
    "Aif",
    "Flac",
    "ogg",
    "oga",
    "opus",
    "wma",
    "amr",
    "aac",
    "wv",
    "voc",
    "tta",
    "loas",
    "caf",
    "aptx",
    "adts",
    "ast",
  ].includes(extension.toLowerCase());
}

function isCode(extension) {
  return [
    "php",
    "py",
    "rb",
    "sh",
    "bash",
    "zsh",
    "c",
    "cpp",
    "h",
    "hpp",
    "java",
    "scala",
    "go",
    "dart",
    "swift",
    "mdx",
    "astro",
  ].includes(extension.toLowerCase());
}

function isEncrypted(extension) {
  return [
    "bit",
    "box",
    "block",
    "pgp",
    "pub",
    "pem",
    "p12",
    "p8",
    "keychain",
  ].includes(extension.toLowerCase());
}

function isImage(extension) {
  return [
    "gif",
    "bmp",
    "tiff",
    "webp",
    "svg",
    "ico",
    "heic",
    "raw",
    "akw",
    "dng",
    "cr2",
    "dcr",
    "nwr",
    "nef",
  ].includes(extension.toLowerCase());
}

function isStyle(extension) {
  return ["css", "sass", "scss", "less"].includes(extension.toLowerCase());
}

function isText(extension) {
  return [
    "txt",
    "rtf",
    "md",
    "json",
    "yaml",
    "yml",
    "toml",
    "xml",
    "cfg",
  ].includes(extension.toLowerCase());
}

function isVideo(extension) {
  return [
    "avi",
    "asf",
    "mpeg",
    "mts",
    "mpe",
    "vob",
    "qt",
    "mov",
    "asf",
    "asx",
    "mjpeg",
    "mxf",
    "m2ts",
    "f4v",
    "wm",
    "3gp",
    "m4v",
    "wmv",
    "mp4",
    "webm",
    "flv",
    "mpg",
    "hevc",
    "ogv",
    "swf",
    "wtv",
    "mkv",
  ].includes(extension.toLowerCase());
}

export function splitNameAndExtension(file) {
  const splittedFileName = file.split(".");
  const name = splittedFileName.slice(0, splittedFileName.length - 1).join(".");
  const extension = splittedFileName[splittedFileName.length - 1];

  return { name, extension };
}

export function getFileIcon(extension) {
  if (isArchive(extension)) {
    return FileZip;
  }

  if (isAudio(extension)) {
    return FileAudio;
  }

  if (isCode(extension)) {
    return FileCode;
  }

  if (isImage(extension)) {
    return FileImage;
  }

  if (isEncrypted(extension)) {
    return FileLock;
  }

  if (isStyle(extension)) {
    return FileCss;
  }

  if (isText(extension)) {
    return FileText;
  }

  if (isVideo(extension)) {
    return FileVideo;
  }

  switch (extension.toLowerCase()) {
    case "csv": {
      return FileCsv;
    }
    case "doc":
    case "docx": {
      return FileDoc;
    }
    case "htm":
    case "html": {
      return FileHtml;
    }
    case "jpeg":
    case "jpg": {
      return FileJpg;
    }
    case "js": {
      return FileJs;
    }
    case "jsx": {
      return FileJsx;
    }
    case "pdf": {
      return FilePdf;
    }
    case "png": {
      return FilePng;
    }
    case "ppt":
    case "pptx": {
      return FilePpt;
    }
    case "rs": {
      return FileRs;
    }
    case "ts": {
      return FileTs;
    }
    case "tsx": {
      return FileTsx;
    }
    case "vue": {
      return FileVue;
    }
    case "xls":
    case "xlsx": {
      return FileXls;
    }
    default: {
      return File;
    }
  }
}
