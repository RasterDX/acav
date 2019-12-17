import { Error } from "./error";

export class ErrorFactory {
  static generateError(code: string) {
    switch (code) {
      case "400_NO_MANDATORY_FIELDS":
        return new Error(
          400,
          "No Mandatory Fields",
          "Invalid Search Query - no mandatory fields provided."
        );
      case "400_INVALID_QUERY":
        return new Error(
          400,
          "Invalid Query",
          "The Search Query has invalid data."
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
