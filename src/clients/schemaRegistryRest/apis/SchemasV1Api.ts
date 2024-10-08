/* tslint:disable */
/* eslint-disable */
/**
 * Confluent Schema Registry APIs
 * REST API for the Schema Registry
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import type { ErrorMessage, Schema, SchemaString, SubjectVersion } from "../models/index";
import {
  ErrorMessageFromJSON,
  ErrorMessageToJSON,
  SchemaFromJSON,
  SchemaToJSON,
  SchemaStringFromJSON,
  SchemaStringToJSON,
  SubjectVersionFromJSON,
  SubjectVersionToJSON,
} from "../models/index";

export interface GetSchemaRequest {
  id: number;
  subject?: string;
  format?: string;
  fetchMaxId?: boolean;
}

export interface GetSchemaOnlyRequest {
  id: number;
  subject?: string;
  format?: string;
}

export interface GetSchemasRequest {
  subjectPrefix?: string;
  deleted?: boolean;
  latestOnly?: boolean;
  offset?: number;
  limit?: number;
}

export interface GetSubjectsRequest {
  id: number;
  subject?: string;
  deleted?: boolean;
}

export interface GetVersionsRequest {
  id: number;
  subject?: string;
  deleted?: boolean;
}

/**
 *
 */
export class SchemasV1Api extends runtime.BaseAPI {
  /**
   * Retrieves the schema string identified by the input ID.
   * Get schema string by ID
   */
  async getSchemaRaw(
    requestParameters: GetSchemaRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<SchemaString>> {
    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError(
        "id",
        'Required parameter "id" was null or undefined when calling getSchema().',
      );
    }

    const queryParameters: any = {};

    if (requestParameters["subject"] != null) {
      queryParameters["subject"] = requestParameters["subject"];
    }

    if (requestParameters["format"] != null) {
      queryParameters["format"] = requestParameters["format"];
    }

    if (requestParameters["fetchMaxId"] != null) {
      queryParameters["fetchMaxId"] = requestParameters["fetchMaxId"];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters["Authorization"] = await this.configuration.accessToken(
        "external-access-token",
        [],
      );
    }

    if (
      this.configuration &&
      (this.configuration.username !== undefined || this.configuration.password !== undefined)
    ) {
      headerParameters["Authorization"] =
        "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
    }
    const response = await this.request(
      {
        path: `/schemas/ids/{id}`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters["id"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => SchemaStringFromJSON(jsonValue));
  }

  /**
   * Retrieves the schema string identified by the input ID.
   * Get schema string by ID
   */
  async getSchema(
    requestParameters: GetSchemaRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<SchemaString> {
    const response = await this.getSchemaRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves the schema identified by the input ID.
   * Get schema by ID
   */
  async getSchemaOnlyRaw(
    requestParameters: GetSchemaOnlyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<string>> {
    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError(
        "id",
        'Required parameter "id" was null or undefined when calling getSchemaOnly().',
      );
    }

    const queryParameters: any = {};

    if (requestParameters["subject"] != null) {
      queryParameters["subject"] = requestParameters["subject"];
    }

    if (requestParameters["format"] != null) {
      queryParameters["format"] = requestParameters["format"];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters["Authorization"] = await this.configuration.accessToken(
        "external-access-token",
        [],
      );
    }

    if (
      this.configuration &&
      (this.configuration.username !== undefined || this.configuration.password !== undefined)
    ) {
      headerParameters["Authorization"] =
        "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
    }
    const response = await this.request(
      {
        path: `/schemas/ids/{id}/schema`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters["id"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    if (this.isJsonMime(response.headers.get("content-type"))) {
      return new runtime.JSONApiResponse<string>(response);
    } else {
      return new runtime.TextApiResponse(response) as any;
    }
  }

  /**
   * Retrieves the schema identified by the input ID.
   * Get schema by ID
   */
  async getSchemaOnly(
    requestParameters: GetSchemaOnlyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<string> {
    const response = await this.getSchemaOnlyRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieve the schema types supported by this registry.
   * List supported schema types
   */
  async getSchemaTypesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<string>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters["Authorization"] = await this.configuration.accessToken(
        "external-access-token",
        [],
      );
    }

    if (
      this.configuration &&
      (this.configuration.username !== undefined || this.configuration.password !== undefined)
    ) {
      headerParameters["Authorization"] =
        "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
    }
    const response = await this.request(
      {
        path: `/schemas/types`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Retrieve the schema types supported by this registry.
   * List supported schema types
   */
  async getSchemaTypes(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<string>> {
    const response = await this.getSchemaTypesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Get the schemas matching the specified parameters.
   * List schemas
   */
  async getSchemasRaw(
    requestParameters: GetSchemasRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<Schema>>> {
    const queryParameters: any = {};

    if (requestParameters["subjectPrefix"] != null) {
      queryParameters["subjectPrefix"] = requestParameters["subjectPrefix"];
    }

    if (requestParameters["deleted"] != null) {
      queryParameters["deleted"] = requestParameters["deleted"];
    }

    if (requestParameters["latestOnly"] != null) {
      queryParameters["latestOnly"] = requestParameters["latestOnly"];
    }

    if (requestParameters["offset"] != null) {
      queryParameters["offset"] = requestParameters["offset"];
    }

    if (requestParameters["limit"] != null) {
      queryParameters["limit"] = requestParameters["limit"];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters["Authorization"] = await this.configuration.accessToken(
        "external-access-token",
        [],
      );
    }

    if (
      this.configuration &&
      (this.configuration.username !== undefined || this.configuration.password !== undefined)
    ) {
      headerParameters["Authorization"] =
        "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
    }
    const response = await this.request(
      {
        path: `/schemas`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SchemaFromJSON));
  }

  /**
   * Get the schemas matching the specified parameters.
   * List schemas
   */
  async getSchemas(
    requestParameters: GetSchemasRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<Schema>> {
    const response = await this.getSchemasRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves all the subjects associated with a particular schema ID.
   * List subjects associated to schema ID
   */
  async getSubjectsRaw(
    requestParameters: GetSubjectsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<string>>> {
    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError(
        "id",
        'Required parameter "id" was null or undefined when calling getSubjects().',
      );
    }

    const queryParameters: any = {};

    if (requestParameters["subject"] != null) {
      queryParameters["subject"] = requestParameters["subject"];
    }

    if (requestParameters["deleted"] != null) {
      queryParameters["deleted"] = requestParameters["deleted"];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters["Authorization"] = await this.configuration.accessToken(
        "external-access-token",
        [],
      );
    }

    if (
      this.configuration &&
      (this.configuration.username !== undefined || this.configuration.password !== undefined)
    ) {
      headerParameters["Authorization"] =
        "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
    }
    const response = await this.request(
      {
        path: `/schemas/ids/{id}/subjects`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters["id"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * Retrieves all the subjects associated with a particular schema ID.
   * List subjects associated to schema ID
   */
  async getSubjects(
    requestParameters: GetSubjectsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<string>> {
    const response = await this.getSubjectsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Get all the subject-version pairs associated with the input ID.
   * List subject-versions associated to schema ID
   */
  async getVersionsRaw(
    requestParameters: GetVersionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<SubjectVersion>>> {
    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError(
        "id",
        'Required parameter "id" was null or undefined when calling getVersions().',
      );
    }

    const queryParameters: any = {};

    if (requestParameters["subject"] != null) {
      queryParameters["subject"] = requestParameters["subject"];
    }

    if (requestParameters["deleted"] != null) {
      queryParameters["deleted"] = requestParameters["deleted"];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      // oauth required
      headerParameters["Authorization"] = await this.configuration.accessToken(
        "external-access-token",
        [],
      );
    }

    if (
      this.configuration &&
      (this.configuration.username !== undefined || this.configuration.password !== undefined)
    ) {
      headerParameters["Authorization"] =
        "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
    }
    const response = await this.request(
      {
        path: `/schemas/ids/{id}/versions`.replace(
          `{${"id"}}`,
          encodeURIComponent(String(requestParameters["id"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(SubjectVersionFromJSON),
    );
  }

  /**
   * Get all the subject-version pairs associated with the input ID.
   * List subject-versions associated to schema ID
   */
  async getVersions(
    requestParameters: GetVersionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<SubjectVersion>> {
    const response = await this.getVersionsRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
