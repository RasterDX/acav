import { Error } from "./error";

export class ErrorFactory {
  
  static ERROR_STRINGS = [
    "400_NO_MANDATORY_FIELDS",
    "404_NO_RECORD_FOUND",
    "500_SERVER_ERROR"
  ]

  static generateError(code: string) {
    switch (code) {
      case "400_NO_MANDATORY_FIELDS":
        return new Error(
          400,
          "No Mandatory Fields",
          "Invalid Search Query - no mandatory fields provided."
        );
      case "404_NO_RECORD_FOUND":
        return new Error(
          400,
          "No record was found matching the search query.",
          "The Search Query could not be found - moving on to data scavenging."
        );
      case "400_INVALID_QUERY":
        return new Error(
          400,
          "Invalid Query",
          "The Search Query has invalid data."
        );
      case "500_SERVER_ERROR":
        return new Error(
          500,
          "Internal Server Error",
          "There was a server error and the request could not be processed."
        );
      default:
        return new Error(
          400,
          "Invalid Query",
          "The Search Query has invalid data."
        );
    }
  }
}
