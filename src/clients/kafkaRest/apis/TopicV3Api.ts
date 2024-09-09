/* tslint:disable */
/* eslint-disable */
/**
 * REST Admin API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import type {
  CreateTopicRequestData,
  TopicData,
  TopicDataList,
  UpdatePartitionCountRequestData,
} from "../models/index";
import {
  CreateTopicRequestDataFromJSON,
  CreateTopicRequestDataToJSON,
  TopicDataFromJSON,
  TopicDataToJSON,
  TopicDataListFromJSON,
  TopicDataListToJSON,
  UpdatePartitionCountRequestDataFromJSON,
  UpdatePartitionCountRequestDataToJSON,
} from "../models/index";

export interface CreateKafkaTopicRequest {
  cluster_id: string;
  CreateTopicRequestData?: CreateTopicRequestData;
}

export interface DeleteKafkaTopicRequest {
  cluster_id: string;
  topic_name: string;
}

export interface GetKafkaTopicRequest {
  cluster_id: string;
  topic_name: string;
  include_authorized_operations?: boolean;
}

export interface ListKafkaTopicsRequest {
  cluster_id: string;
}

export interface UpdatePartitionCountKafkaTopicRequest {
  cluster_id: string;
  topic_name: string;
  UpdatePartitionCountRequestData?: UpdatePartitionCountRequestData;
}

/**
 *
 */
export class TopicV3Api extends runtime.BaseAPI {
  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Create a topic. Also supports a dry-run mode that only validates whether the topic creation would succeed if the ``validate_only`` request property is explicitly specified and set to true. Note that when dry-run mode is being used the response status would be 200 OK instead of 201 Created.
   * Create Topic
   */
  async createKafkaTopicRaw(
    requestParameters: CreateKafkaTopicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TopicData>> {
    if (requestParameters["cluster_id"] == null) {
      throw new runtime.RequiredError(
        "cluster_id",
        'Required parameter "cluster_id" was null or undefined when calling createKafkaTopic().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

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
        path: `/kafka/v3/clusters/{cluster_id}/topics`.replace(
          `{${"cluster_id"}}`,
          encodeURIComponent(String(requestParameters["cluster_id"])),
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: CreateTopicRequestDataToJSON(requestParameters["CreateTopicRequestData"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TopicDataFromJSON(jsonValue));
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Create a topic. Also supports a dry-run mode that only validates whether the topic creation would succeed if the ``validate_only`` request property is explicitly specified and set to true. Note that when dry-run mode is being used the response status would be 200 OK instead of 201 Created.
   * Create Topic
   */
  async createKafkaTopic(
    requestParameters: CreateKafkaTopicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TopicData> {
    const response = await this.createKafkaTopicRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Delete the topic with the given `topic_name`.
   * Delete Topic
   */
  async deleteKafkaTopicRaw(
    requestParameters: DeleteKafkaTopicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters["cluster_id"] == null) {
      throw new runtime.RequiredError(
        "cluster_id",
        'Required parameter "cluster_id" was null or undefined when calling deleteKafkaTopic().',
      );
    }

    if (requestParameters["topic_name"] == null) {
      throw new runtime.RequiredError(
        "topic_name",
        'Required parameter "topic_name" was null or undefined when calling deleteKafkaTopic().',
      );
    }

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
        path: `/kafka/v3/clusters/{cluster_id}/topics/{topic_name}`
          .replace(`{${"cluster_id"}}`, encodeURIComponent(String(requestParameters["cluster_id"])))
          .replace(
            `{${"topic_name"}}`,
            encodeURIComponent(String(requestParameters["topic_name"])),
          ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Delete the topic with the given `topic_name`.
   * Delete Topic
   */
  async deleteKafkaTopic(
    requestParameters: DeleteKafkaTopicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.deleteKafkaTopicRaw(requestParameters, initOverrides);
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Return the topic with the given `topic_name`.
   * Get Topic
   */
  async getKafkaTopicRaw(
    requestParameters: GetKafkaTopicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TopicData>> {
    if (requestParameters["cluster_id"] == null) {
      throw new runtime.RequiredError(
        "cluster_id",
        'Required parameter "cluster_id" was null or undefined when calling getKafkaTopic().',
      );
    }

    if (requestParameters["topic_name"] == null) {
      throw new runtime.RequiredError(
        "topic_name",
        'Required parameter "topic_name" was null or undefined when calling getKafkaTopic().',
      );
    }

    const queryParameters: any = {};

    if (requestParameters["include_authorized_operations"] != null) {
      queryParameters["include_authorized_operations"] =
        requestParameters["include_authorized_operations"];
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
        path: `/kafka/v3/clusters/{cluster_id}/topics/{topic_name}`
          .replace(`{${"cluster_id"}}`, encodeURIComponent(String(requestParameters["cluster_id"])))
          .replace(
            `{${"topic_name"}}`,
            encodeURIComponent(String(requestParameters["topic_name"])),
          ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TopicDataFromJSON(jsonValue));
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Return the topic with the given `topic_name`.
   * Get Topic
   */
  async getKafkaTopic(
    requestParameters: GetKafkaTopicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TopicData> {
    const response = await this.getKafkaTopicRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Return the list of topics that belong to the specified Kafka cluster.
   * List Topics
   */
  async listKafkaTopicsRaw(
    requestParameters: ListKafkaTopicsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TopicDataList>> {
    if (requestParameters["cluster_id"] == null) {
      throw new runtime.RequiredError(
        "cluster_id",
        'Required parameter "cluster_id" was null or undefined when calling listKafkaTopics().',
      );
    }

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
        path: `/kafka/v3/clusters/{cluster_id}/topics`.replace(
          `{${"cluster_id"}}`,
          encodeURIComponent(String(requestParameters["cluster_id"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TopicDataListFromJSON(jsonValue));
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Return the list of topics that belong to the specified Kafka cluster.
   * List Topics
   */
  async listKafkaTopics(
    requestParameters: ListKafkaTopicsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TopicDataList> {
    const response = await this.listKafkaTopicsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Increase the number of partitions for a topic.
   * Update Partition Count
   */
  async updatePartitionCountKafkaTopicRaw(
    requestParameters: UpdatePartitionCountKafkaTopicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TopicData>> {
    if (requestParameters["cluster_id"] == null) {
      throw new runtime.RequiredError(
        "cluster_id",
        'Required parameter "cluster_id" was null or undefined when calling updatePartitionCountKafkaTopic().',
      );
    }

    if (requestParameters["topic_name"] == null) {
      throw new runtime.RequiredError(
        "topic_name",
        'Required parameter "topic_name" was null or undefined when calling updatePartitionCountKafkaTopic().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

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
        path: `/kafka/v3/clusters/{cluster_id}/topics/{topic_name}`
          .replace(`{${"cluster_id"}}`, encodeURIComponent(String(requestParameters["cluster_id"])))
          .replace(
            `{${"topic_name"}}`,
            encodeURIComponent(String(requestParameters["topic_name"])),
          ),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: UpdatePartitionCountRequestDataToJSON(
          requestParameters["UpdatePartitionCountRequestData"],
        ),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TopicDataFromJSON(jsonValue));
  }

  /**
   * [![Generally Available](https://img.shields.io/badge/Lifecycle%20Stage-Generally%20Available-%2345c6e8)](#section/Versioning/API-Lifecycle-Policy)  Increase the number of partitions for a topic.
   * Update Partition Count
   */
  async updatePartitionCountKafkaTopic(
    requestParameters: UpdatePartitionCountKafkaTopicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TopicData> {
    const response = await this.updatePartitionCountKafkaTopicRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
