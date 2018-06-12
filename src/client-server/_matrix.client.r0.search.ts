import {
  JsonController,
  Authorized,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpError,
  NotFoundError,
  BadRequestError,
  CurrentUser,
  QueryParam,
  HeaderParam,
  UnauthorizedError
} from 'routing-controllers';

import * as dto from './types';
import { User } from '../model';

@JsonController('')
export class MatrixClientR0Search {
  /**
   * @description : Performs a full text search across different categories.
   *
   * @parameters : [
   *  {
   *    "description": "The point to return events from. If given, this should be a\n`next_batch` result from a previous call to this endpoint.",
   *    "in": "query",
   *    "name": "next_batch",
   *    "type": "string",
   *    "x-example": "YWxsCgpOb25lLDM1ODcwOA"
   *  },
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "schema": {
   *      "example": {
   *        "groupings": {
   *          "group_by": [
   *            {
   *              "key": "room_id"
   *            }
   *          ]
   *        },
   *        "order_by": "recent",
   *        "search_categories": {
   *          "room_events": {
   *            "keys": [
   *              "content.body"
   *            ],
   *            "search_term": "martians and men"
   *          }
   *        }
   *      },
   *      "properties": {
   *        "search_categories": {
   *          "description": "Describes which categories to search in and their criteria.",
   *          "properties": {
   *            "room_events": {
   *              "description": "Mapping of category name to search criteria.",
   *              "properties": {
   *                "event_context": {
   *                  "description": "Configures whether any context for the events\nreturned are included in the response.",
   *                  "properties": {
   *                    "after_limit": {
   *                      "description": "How many events after the result are\nreturned. By default, this is ``5``.",
   *                      "title": "After limit",
   *                      "type": "integer"
   *                    },
   *                    "before_limit": {
   *                      "description": "How many events before the result are\nreturned. By default, this is ``5``.",
   *                      "title": "Before limit",
   *                      "type": "integer"
   *                    },
   *                    "include_profile": {
   *                      "description": "Requests that the server returns the\nhistoric profile information for the users\nthat sent the events that were returned.\nBy default, this is ``false``.",
   *                      "title": "Return profile information",
   *                      "type": "boolean"
   *                    }
   *                  },
   *                  "title": "Event Context",
   *                  "type": "object"
   *                },
   *                "filter": {
   *                  "description": "This takes a `filter`_.",
   *                  "title": "Filter",
   *                  "type": "object"
   *                },
   *                "groupings": {
   *                  "description": "Requests that the server partitions the result set\nbased on the provided list of keys.",
   *                  "properties": {
   *                    "group_by": {
   *                      "description": "List of groups to request.",
   *                      "items": {
   *                        "description": "Configuration for group.",
   *                        "properties": {
   *                          "key": {
   *                            "description": "Key that defines the group.",
   *                            "enum": [
   *                              "room_id",
   *                              "sender"
   *                            ],
   *                            "title": "Group Key",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "title": "Group",
   *                        "type": "object"
   *                      },
   *                      "title": "Groups",
   *                      "type": "array"
   *                    }
   *                  },
   *                  "title": "Groupings",
   *                  "type": "object"
   *                },
   *                "include_state": {
   *                  "description": "Requests the server return the current state for\neach room returned.",
   *                  "title": "Include current state",
   *                  "type": "boolean"
   *                },
   *                "keys": {
   *                  "description": "The keys to search. Defaults to all.",
   *                  "items": {
   *                    "enum": [
   *                      "content.body",
   *                      "content.name",
   *                      "content.topic"
   *                    ],
   *                    "type": "string"
   *                  },
   *                  "type": "array"
   *                },
   *                "order_by": {
   *                  "description": "The order in which to search for results.\nBy default, this is ``\"rank\"``.",
   *                  "enum": [
   *                    "recent",
   *                    "rank"
   *                  ],
   *                  "title": "Ordering",
   *                  "type": "string"
   *                },
   *                "search_term": {
   *                  "description": "The string to search events for",
   *                  "type": "string"
   *                }
   *              },
   *              "required": [
   *                "search_term"
   *              ],
   *              "title": "Room Events",
   *              "type": "object"
   *            }
   *          },
   *          "title": "Categories",
   *          "type": "object"
   *        }
   *      },
   *      "required": [
   *        "search_categories"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "Results of the search.",
   *    "examples": {
   *      "application/json": {
   *        "search_categories": {
   *          "room_events": {
   *            "count": 1224,
   *            "groups": {
   *              "room_id": {
   *                "!qPewotXpIctQySfjSy:localhost": {
   *                  "next_batch": "BdgFsdfHSf-dsFD",
   *                  "order": 1,
   *                  "results": [
   *                    "$144429830826TWwbB:localhost"
   *                  ]
   *                }
   *              }
   *            },
   *            "next_batch": "5FdgFsd234dfgsdfFD",
   *            "results": [
   *              {
   *                "rank": 0.00424866,
   *                "result": {
   *                  "age": 526228296,
   *                  "content": {
   *                    "body": "Test content martians and men",
   *                    "msgtype": "m.text"
   *                  },
   *                  "event_id": "$144429830826TWwbB:localhost",
   *                  "origin_server_ts": 1444298308034,
   *                  "room_id": "!qPewotXpIctQySfjSy:localhost",
   *                  "sender": "@test:localhost",
   *                  "type": "m.room.message"
   *                }
   *              }
   *            ]
   *          }
   *        }
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "search_categories": {
   *          "description": "Describes which categories to search in and their criteria.",
   *          "properties": {
   *            "room_events": {
   *              "description": "Mapping of category name to search criteria.",
   *              "properties": {
   *                "count": {
   *                  "description": "An approximate count of the total number of results found.",
   *                  "type": "number"
   *                },
   *                "groups": {
   *                  "additionalProperties": {
   *                    "additionalProperties": {
   *                      "description": "The results for a particular group value.",
   *                      "properties": {
   *                        "next_batch": {
   *                          "description": "Token that can be used to get the next batch\nof results in the group, by passing as the\n`next_batch` parameter to the next call. If\nthis field is absent, there are no more\nresults in this group.",
   *                          "title": "Next Batch in Group",
   *                          "type": "string"
   *                        },
   *                        "order": {
   *                          "description": "Key that can be used to order different\ngroups.",
   *                          "title": "Group Order",
   *                          "type": "integer"
   *                        },
   *                        "results": {
   *                          "description": "Which results are in this group.",
   *                          "items": {
   *                            "title": "Result Event ID",
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        }
   *                      },
   *                      "title": "Group Value",
   *                      "type": "object"
   *                    },
   *                    "description": "The results for a given group.",
   *                    "title": "Group Key",
   *                    "type": "object"
   *                  },
   *                  "description": "Any groups that were requested.",
   *                  "title": "Groups",
   *                  "type": "object"
   *                },
   *                "next_batch": {
   *                  "description": "Token that can be used to get the next batch of\nresults, by passing as the `next_batch` parameter to\nthe next call. If this field is absent, there are no\nmore results.",
   *                  "title": "Next Batch",
   *                  "type": "string"
   *                },
   *                "results": {
   *                  "description": "List of results in the requested order.",
   *                  "items": {
   *                    "description": "The result object.",
   *                    "properties": {
   *                      "context": {
   *                        "description": "Context for result, if requested.",
   *                        "properties": {
   *                          "end": {
   *                            "description": "Pagination token for the end of the chunk",
   *                            "title": "End Token",
   *                            "type": "string"
   *                          },
   *                          "events_after": {
   *                            "description": "Events just after the result.",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "description": "The basic set of fields all events must have.",
   *                                  "properties": {
   *                                    "content": {
   *                                      "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                                      "type": "object"
   *                                    },
   *                                    "type": {
   *                                      "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "required": [
   *                                    "type"
   *                                  ],
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                }
   *                              ],
   *                              "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                              "properties": {
   *                                "event_id": {
   *                                  "description": "The globally unique event identifier.",
   *                                  "type": "string"
   *                                },
   *                                "origin_server_ts": {
   *                                  "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                  "type": "number"
   *                                },
   *                                "room_id": {
   *                                  "description": "The ID of the room associated with this event.",
   *                                  "type": "string"
   *                                },
   *                                "sender": {
   *                                  "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                                  "type": "string"
   *                                },
   *                                "unsigned": {
   *                                  "description": "Contains optional extra information about the event.",
   *                                  "properties": {
   *                                    "age": {
   *                                      "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                                      "type": "integer"
   *                                    },
   *                                    "redacted_because": {
   *                                      "description": "Optional. The event that redacted this event, if any.",
   *                                      "title": "Event",
   *                                      "type": "object"
   *                                    },
   *                                    "transaction_id": {
   *                                      "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "title": "UnsignedData",
   *                                  "type": "object"
   *                                }
   *                              },
   *                              "required": [
   *                                "event_id",
   *                                "room_id",
   *                                "sender",
   *                                "origin_server_ts"
   *                              ],
   *                              "title": "Event",
   *                              "type": "object"
   *                            },
   *                            "title": "Events After",
   *                            "type": "array"
   *                          },
   *                          "events_before": {
   *                            "description": "Events just before the result.",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "description": "The basic set of fields all events must have.",
   *                                  "properties": {
   *                                    "content": {
   *                                      "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                                      "type": "object"
   *                                    },
   *                                    "type": {
   *                                      "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "required": [
   *                                    "type"
   *                                  ],
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                }
   *                              ],
   *                              "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                              "properties": {
   *                                "event_id": {
   *                                  "description": "The globally unique event identifier.",
   *                                  "type": "string"
   *                                },
   *                                "origin_server_ts": {
   *                                  "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                  "type": "number"
   *                                },
   *                                "room_id": {
   *                                  "description": "The ID of the room associated with this event.",
   *                                  "type": "string"
   *                                },
   *                                "sender": {
   *                                  "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                                  "type": "string"
   *                                },
   *                                "unsigned": {
   *                                  "description": "Contains optional extra information about the event.",
   *                                  "properties": {
   *                                    "age": {
   *                                      "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                                      "type": "integer"
   *                                    },
   *                                    "redacted_because": {
   *                                      "description": "Optional. The event that redacted this event, if any.",
   *                                      "title": "Event",
   *                                      "type": "object"
   *                                    },
   *                                    "transaction_id": {
   *                                      "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "title": "UnsignedData",
   *                                  "type": "object"
   *                                }
   *                              },
   *                              "required": [
   *                                "event_id",
   *                                "room_id",
   *                                "sender",
   *                                "origin_server_ts"
   *                              ],
   *                              "title": "Event",
   *                              "type": "object"
   *                            },
   *                            "title": "Events Before",
   *                            "type": "array"
   *                          },
   *                          "profile_info": {
   *                            "additionalProperties": {
   *                              "properties": {
   *                                "avatar_url": {
   *                                  "title": "Avatar Url",
   *                                  "type": "string"
   *                                },
   *                                "displayname": {
   *                                  "title": "Display name",
   *                                  "type": "string"
   *                                }
   *                              },
   *                              "title": "User Profile",
   *                              "type": "object"
   *                            },
   *                            "description": "The historic profile information of the\nusers that sent the events returned.",
   *                            "title": "Profile Information",
   *                            "type": "object"
   *                          },
   *                          "start": {
   *                            "description": "Pagination token for the start of the chunk",
   *                            "title": "Start Token",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "title": "Event Context",
   *                        "type": "object"
   *                      },
   *                      "rank": {
   *                        "description": "A number that describes how closely this result matches the search. Higher is closer.",
   *                        "type": "number"
   *                      },
   *                      "result": {
   *                        "allOf": [
   *                          {
   *                            "description": "The basic set of fields all events must have.",
   *                            "properties": {
   *                              "content": {
   *                                "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                                "type": "object"
   *                              },
   *                              "type": {
   *                                "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                                "type": "string"
   *                              }
   *                            },
   *                            "required": [
   *                              "type"
   *                            ],
   *                            "title": "Event",
   *                            "type": "object"
   *                          }
   *                        ],
   *                        "description": "The event that matched.",
   *                        "properties": {
   *                          "event_id": {
   *                            "description": "The globally unique event identifier.",
   *                            "type": "string"
   *                          },
   *                          "origin_server_ts": {
   *                            "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                            "type": "number"
   *                          },
   *                          "room_id": {
   *                            "description": "The ID of the room associated with this event.",
   *                            "type": "string"
   *                          },
   *                          "sender": {
   *                            "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                            "type": "string"
   *                          },
   *                          "unsigned": {
   *                            "description": "Contains optional extra information about the event.",
   *                            "properties": {
   *                              "age": {
   *                                "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                                "type": "integer"
   *                              },
   *                              "redacted_because": {
   *                                "description": "Optional. The event that redacted this event, if any.",
   *                                "title": "Event",
   *                                "type": "object"
   *                              },
   *                              "transaction_id": {
   *                                "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                                "type": "string"
   *                              }
   *                            },
   *                            "title": "UnsignedData",
   *                            "type": "object"
   *                          }
   *                        },
   *                        "required": [
   *                          "event_id",
   *                          "room_id",
   *                          "sender",
   *                          "origin_server_ts"
   *                        ],
   *                        "title": "Event",
   *                        "type": "object"
   *                      }
   *                    },
   *                    "title": "Result",
   *                    "type": "object"
   *                  },
   *                  "title": "Results",
   *                  "type": "array"
   *                },
   *                "state": {
   *                  "additionalProperties": {
   *                    "items": {
   *                      "allOf": [
   *                        {
   *                          "allOf": [
   *                            {
   *                              "description": "The basic set of fields all events must have.",
   *                              "properties": {
   *                                "content": {
   *                                  "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                                  "type": "object"
   *                                },
   *                                "type": {
   *                                  "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                                  "type": "string"
   *                                }
   *                              },
   *                              "required": [
   *                                "type"
   *                              ],
   *                              "title": "Event",
   *                              "type": "object"
   *                            }
   *                          ],
   *                          "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                          "properties": {
   *                            "event_id": {
   *                              "description": "The globally unique event identifier.",
   *                              "type": "string"
   *                            },
   *                            "origin_server_ts": {
   *                              "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                              "type": "number"
   *                            },
   *                            "room_id": {
   *                              "description": "The ID of the room associated with this event.",
   *                              "type": "string"
   *                            },
   *                            "sender": {
   *                              "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                              "type": "string"
   *                            },
   *                            "unsigned": {
   *                              "description": "Contains optional extra information about the event.",
   *                              "properties": {
   *                                "age": {
   *                                  "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                                  "type": "integer"
   *                                },
   *                                "redacted_because": {
   *                                  "description": "Optional. The event that redacted this event, if any.",
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                },
   *                                "transaction_id": {
   *                                  "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                                  "type": "string"
   *                                }
   *                              },
   *                              "title": "UnsignedData",
   *                              "type": "object"
   *                            }
   *                          },
   *                          "required": [
   *                            "event_id",
   *                            "room_id",
   *                            "sender",
   *                            "origin_server_ts"
   *                          ],
   *                          "title": "Room Event",
   *                          "type": "object"
   *                        }
   *                      ],
   *                      "description": "In addition to the Room Event fields, State Events have the following additional fields.",
   *                      "properties": {
   *                        "prev_content": {
   *                          "description": "Optional. The previous ``content`` for this event. If there is no previous content, this key will be missing.",
   *                          "title": "EventContent",
   *                          "type": "object"
   *                        },
   *                        "state_key": {
   *                          "description": "A unique key which defines the overwriting semantics for this piece of room state. This value is often a zero-length string. The presence of this key makes this event a State Event. The key MUST NOT start with '_'.",
   *                          "type": "string"
   *                        }
   *                      },
   *                      "required": [
   *                        "state_key"
   *                      ],
   *                      "title": "State Event",
   *                      "type": "object"
   *                    },
   *                    "title": "Room State",
   *                    "type": "array"
   *                  },
   *                  "description": "The current state for every room in the results.\nThis is included if the request had the\n``include_state`` key set with a value of ``true``.",
   *                  "title": "Current state",
   *                  "type": "object"
   *                }
   *              },
   *              "title": "Room Event Results",
   *              "type": "object"
   *            }
   *          },
   *          "title": "Categories",
   *          "type": "object"
   *        }
   *      },
   *      "required": [
   *        "search_categories"
   *      ],
   *      "title": "Results",
   *      "type": "object"
   *    }
   *  },
   *  "400": {
   *    "description": "Part of the request was invalid."
   *  },
   *  "429": {
   *    "description": "This request was rate-limited.",
   *    "schema": {
   *      "description": "A Matrix-level Error",
   *      "properties": {
   *        "errcode": {
   *          "description": "An error code.",
   *          "type": "string"
   *        },
   *        "error": {
   *          "description": "A human-readable error message.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "errcode"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Perform a server-side search.
   *
   */
  @Post('/_matrix/client/r0/search')
  async search(
    @QueryParam('next_batch', { required: true })
    nextBatch: string,
    @Body({ required: true })
    body: dto.SearchBody,
    @CurrentUser() user?: User
  ): Promise<dto.ResultsResponse | dto.SearchResponse429 | any> {
    throw new HttpError(501);
  }
}
