/* tslint:disable */
/* eslint-disable */
/**
 * Confluent ide-sidecar API
 * API for the Confluent ide-sidecar, part of the Confluent extension for VS Code
 *
 * The version of the OpenAPI document: 1.0.1
 * Contact: vscode@confluent.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from "../runtime";
import type { HealthCheckStatus } from "./HealthCheckStatus";
import {
  HealthCheckStatusFromJSON,
  HealthCheckStatusFromJSONTyped,
  HealthCheckStatusToJSON,
} from "./HealthCheckStatus";

/**
 *
 * @export
 * @interface HealthCheckResponse
 */
export interface HealthCheckResponse {
  /**
   *
   * @type {object}
   * @memberof HealthCheckResponse
   */
  data?: object | null;
  /**
   *
   * @type {string}
   * @memberof HealthCheckResponse
   */
  name?: string;
  /**
   *
   * @type {HealthCheckStatus}
   * @memberof HealthCheckResponse
   */
  status?: HealthCheckStatus;
}

/**
 * Check if a given object implements the HealthCheckResponse interface.
 */
export function instanceOfHealthCheckResponse(value: object): value is HealthCheckResponse {
  return true;
}

export function HealthCheckResponseFromJSON(json: any): HealthCheckResponse {
  return HealthCheckResponseFromJSONTyped(json, false);
}

export function HealthCheckResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): HealthCheckResponse {
  if (json == null) {
    return json;
  }
  return {
    data: json["data"] == null ? undefined : json["data"],
    name: json["name"] == null ? undefined : json["name"],
    status: json["status"] == null ? undefined : HealthCheckStatusFromJSON(json["status"]),
  };
}

export function HealthCheckResponseToJSON(value?: HealthCheckResponse | null): any {
  if (value == null) {
    return value;
  }
  return {
    data: value["data"],
    name: value["name"],
    status: HealthCheckStatusToJSON(value["status"]),
  };
}
