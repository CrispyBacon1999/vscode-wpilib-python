import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as vscode from "vscode";
import { targetYear } from "./config";

export type OpkgPackage = {
  name: string;
  description: string;
  versions: OpkgPackageVersion[];
};

export type OpkgPackageVersion = {
  version: string;
  link: string;
};

export const getOpkgList = (): Promise<{ [key: string]: OpkgPackage }> => {
  return new Promise((resolve, reject) => {
    let year = targetYear();
    // Pull packages from opkg list
    fetch(`https://www.tortall.net/~robotpy/feeds/${year}`)
      .then(async res => {
        let packages: { [key: string]: OpkgPackage } = {};
        let $ = cheerio.load(await res.text());

        // Grab rows with data
        $("table tbody tr:not(:first-child)").each(function(
          index: number,
          element: CheerioElement
        ) {
          let data: any[] = [];
          // Parse data into array
          $(element)
            .children()
            .each(function(i: number, el: CheerioElement) {
              switch (i) {
                case 0:
                case 1:
                case 2:
                  data.push(
                    $(el)
                      .text()
                      .trim()
                  );
                  break;
                case 3:
                  data.push(
                    $(el)
                      .children("a")
                      .attr("href")
                  );
                  break;
              }
            });
          if (Object.keys(packages).indexOf(data[0]) !== -1) {
            packages[data[0]].versions.push({
              version: data[1],
              link: data[3] ? data[3] : ""
            });
          } else {
            packages[data[0]] = {
              name: data[0],
              versions: [
                {
                  version: data[1],
                  link: data[3] ? data[3] : ""
                }
              ],
              description: data[2]
            };
          }
        });
        resolve(packages);
      })
      .catch(err => {
        reject(err);
      });
  });
};
