import { promises as fsPromises } from "fs";
import { dirname } from "path";
import superagent from "superagent";
import { mkdir } from "fs";
import { promisify } from "util";
import { urlToFilename, getPageLinks } from "./utils.js";

//manually promisify the mkdir() function
const mkdirPromises = promisify(mkdir);

//Download function
function download(url, filename) {
  console.log(`Downloading... ${url}`);
  let content;
  return superagent
    .get(url)
    .then((res) => {
      content = res.text;
      return mkdirPromises(dirname(filename));
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Download and saved: ${url}`);
      return content;
    });
}

// ['google.com', 'yahoo.com', 'bing.com']
// we have iterate over a list like that
// Pattern (sequential iteration with promises)
// Dynamically build a chain of promises using a loop.
function spiderLinks(currentUrl, content, nesting) {
  // we defined an empty PROMISE to undefined - just to be the starting point
  //of our promise chain
  let promise = Promise.resolve();
  if (nesting === 0) {
    return promise;
  }

  // its like promise.all() but we are building the chain of promises dynamically
  // we are building the chain of promises dynamically
  // Promise.resolve().then().then().then().then()
  const links = getPageLinks(currentUrl, content);
  for (const link of links) {
    promise = promise.then(() => spider(k, nesting - 1));
  }
  return promise;
}

export function spider(url, nesting) {
  const filename = urlToFilename(url);
  return fsPromises
    .readFile(filename, "utf8")
    .catch((err) => {
      if (err.code !== "ENOENT") {
        throw err;
      }
      return download(url, filename);
    })
    .then((content) => spiderLinks(url, content, nesting));
}
