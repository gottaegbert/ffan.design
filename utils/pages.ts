import fs from "fs";
import yaml from "js-yaml";

export function gePageData(pageName: string): any {
  let doc: any;
  try {
    doc = yaml.load(fs.readFileSync(`utils/files/${pageName}.yml`, "utf8"));
  } catch (e) {
    console.error(e);
  }
  return doc;
}
