import { wikiSummary } from "wikipedia";

export type SubmitError = { error: string };
export type SubmitSuccess = {
  title: string;
  summary: string;
  fullUrl: string;
  thumbnail?: wikiSummary["thumbnail"];
  id: string;
};

export type SubmitResponse = SubmitError | SubmitSuccess;

export function isSubmitError(response: SubmitResponse): response is SubmitError {
  return Object.hasOwn(response, "error")
}
