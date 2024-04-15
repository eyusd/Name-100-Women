import { NextRequest, NextResponse } from "next/server";
import wiki from "wikipedia";
import { SubmitError, SubmitSuccess } from "./types";

const MALE_PRONOUNS = ["he", "him", "his", "himself"];
const FEMALE_PRONOUNS = ["she", "her", "hers", "herself"];

const regex = /\d\d*(?:th|st|nd|rd)*(?:-| )*(?:century)*(?:\w| )*(women|woman|births|birth|deaths|death)/mi;



export async function GET(req: NextRequest) {
  // get param "name" from request
  const url = new URL(req.url);
  const name = url.searchParams.get("name");

  if (!name) {
    return new NextResponse(JSON.stringify({error: "No name"} as SubmitError));
  }

  //search for the name in wikipedia
  wiki.setLang('en')
  const searchResults = await wiki.search(name);
  const page = await wiki.page(searchResults.results[0].title);

  // check if the page is about a person
  const isPerson = await page.categories().then((categories) => categories.some((category) => regex.test(category)))
  if (!isPerson) {
    return new NextResponse(JSON.stringify({error: "Not a person"} as SubmitError))
  }

  // get the page content
  const content = await page.content();
  let isFemale = false;
  // reads the content in order, and returns the first pronoun found
  for (const word of content.split(" ")) {
    if (FEMALE_PRONOUNS.includes(word)) {
      isFemale = true;
      break;
    }
    if (MALE_PRONOUNS.includes(word)) {
      break;
    }
  }

  if (!isFemale) {
    return new NextResponse(JSON.stringify({error: "Not a woman"} as SubmitError))
  }

  const fullSummary = await page.summary();

  const title = page.title;
  const summary = fullSummary.extract;
  const thumbnail = fullSummary.thumbnail;
  const fullUrl = page.fullurl;
  const id = page.pageid.toString();

  return new NextResponse(JSON.stringify({ title, summary, fullUrl, thumbnail, id } as SubmitSuccess))
  
}