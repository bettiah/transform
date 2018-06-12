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

@JsonController('')
export class MatrixClientR0UserUserIdFilter {
  /**
   * @description : Uploads a new filter definition to the homeserver.
   *Returns a filter ID that may be used in future requests to
   *restrict which events are returned to the client.
   *
   * @parameters : [
   *  {
   *    "description": "The id of the user uploading the filter. The access token must be authorized to make requests for this user id.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The filter to upload.",
   *    "in": "body",
   *    "name": "filter",
   *    "required": true,
   *    "schema": {
   *      "allOf": [
   *        {
   *          "properties": {
   *            "account_data": {
   *              "allOf": [
   *                {
   *                  "properties": {
   *                    "limit": {
   *                      "description": "The maximum number of events to return.",
   *                      "type": "integer"
   *                    },
   *                    "not_senders": {
   *                      "description": "A list of sender IDs to exclude. If this list is absent then no senders are excluded. A matching sender will be excluded even if it is listed in the ``'senders'`` filter.",
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    },
   *                    "not_types": {
   *                      "description": "A list of event types to exclude. If this list is absent then no event types are excluded. A matching type will be excluded even if it is listed in the ``'types'`` filter. A '*' can be used as a wildcard to match any sequence of characters.",
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    },
   *                    "senders": {
   *                      "description": "A list of senders IDs to include. If this list is absent then all senders are included.",
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    },
   *                    "types": {
   *                      "description": "A list of event types to include. If this list is absent then all event types are included. A ``'*'`` can be used as a wildcard to match any sequence of characters.",
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    }
   *                  },
   *                  "title": "Filter",
   *                  "type": "object"
   *                }
   *              ],
   *              "description": "The user account data that isn't associated with rooms to include."
   *            },
   *            "event_fields": {
   *              "description": "List of event fields to include. If this list is absent then all fields are included. The entries may include '.' charaters to indicate sub-fields. So ['content.body'] will include the 'body' field of the 'content' object. A literal '.' character in a field name may be escaped using a '\\\\'. A server may include more fields than were requested.",
   *              "items": {
   *                "type": "string"
   *              },
   *              "type": "array"
   *            },
   *            "event_format": {
   *              "description": "The format to use for events. 'client' will return the events in a format suitable for clients. 'federation' will return the raw event as receieved over federation. The default is 'client'.",
   *              "enum": [
   *                "client",
   *                "federation"
   *              ],
   *              "type": "string"
   *            },
   *            "presence": {
   *              "allOf": [
   *                {
   *                  "properties": {
   *                    "limit": {
   *                      "description": "The maximum number of events to return.",
   *                      "type": "integer"
   *                    },
   *                    "not_senders": {
   *                      "description": "A list of sender IDs to exclude. If this list is absent then no senders are excluded. A matching sender will be excluded even if it is listed in the ``'senders'`` filter.",
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    },
   *                    "not_types": {
   *                      "description": "A list of event types to exclude. If this list is absent then no event types are excluded. A matching type will be excluded even if it is listed in the ``'types'`` filter. A '*' can be used as a wildcard to match any sequence of characters.",
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    },
   *                    "senders": {
   *                      "description": "A list of senders IDs to include. If this list is absent then all senders are included.",
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    },
   *                    "types": {
   *                      "description": "A list of event types to include. If this list is absent then all event types are included. A ``'*'`` can be used as a wildcard to match any sequence of characters.",
   *                      "items": {
   *                        "type": "string"
   *                      },
   *                      "type": "array"
   *                    }
   *                  },
   *                  "title": "Filter",
   *                  "type": "object"
   *                }
   *              ],
   *              "description": "The presence updates to include."
   *            },
   *            "room": {
   *              "description": "Filters to be applied to room data.",
   *              "properties": {
   *                "account_data": {
   *                  "allOf": [
   *                    {
   *                      "allOf": [
   *                        {
   *                          "properties": {
   *                            "limit": {
   *                              "description": "The maximum number of events to return.",
   *                              "type": "integer"
   *                            },
   *                            "not_senders": {
   *                              "description": "A list of sender IDs to exclude. If this list is absent then no senders are excluded. A matching sender will be excluded even if it is listed in the ``'senders'`` filter.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "not_types": {
   *                              "description": "A list of event types to exclude. If this list is absent then no event types are excluded. A matching type will be excluded even if it is listed in the ``'types'`` filter. A '*' can be used as a wildcard to match any sequence of characters.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "senders": {
   *                              "description": "A list of senders IDs to include. If this list is absent then all senders are included.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "types": {
   *                              "description": "A list of event types to include. If this list is absent then all event types are included. A ``'*'`` can be used as a wildcard to match any sequence of characters.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            }
   *                          },
   *                          "title": "Filter",
   *                          "type": "object"
   *                        }
   *                      ],
   *                      "properties": {
   *                        "contains_url": {
   *                          "description": "If ``true``, includes only events with a url key in their content. If ``false``, excludes those events.",
   *                          "type": "boolean"
   *                        },
   *                        "not_rooms": {
   *                          "description": "A list of room IDs to exclude. If this list is absent then no rooms are excluded. A matching room will be excluded even if it is listed in the ``'rooms'`` filter.",
   *                          "items": {
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        },
   *                        "rooms": {
   *                          "description": "A list of room IDs to include. If this list is absent then all rooms are included.",
   *                          "items": {
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        }
   *                      },
   *                      "title": "RoomEventFilter",
   *                      "type": "object"
   *                    }
   *                  ],
   *                  "description": "The per user account data to include for rooms."
   *                },
   *                "ephemeral": {
   *                  "allOf": [
   *                    {
   *                      "allOf": [
   *                        {
   *                          "properties": {
   *                            "limit": {
   *                              "description": "The maximum number of events to return.",
   *                              "type": "integer"
   *                            },
   *                            "not_senders": {
   *                              "description": "A list of sender IDs to exclude. If this list is absent then no senders are excluded. A matching sender will be excluded even if it is listed in the ``'senders'`` filter.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "not_types": {
   *                              "description": "A list of event types to exclude. If this list is absent then no event types are excluded. A matching type will be excluded even if it is listed in the ``'types'`` filter. A '*' can be used as a wildcard to match any sequence of characters.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "senders": {
   *                              "description": "A list of senders IDs to include. If this list is absent then all senders are included.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "types": {
   *                              "description": "A list of event types to include. If this list is absent then all event types are included. A ``'*'`` can be used as a wildcard to match any sequence of characters.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            }
   *                          },
   *                          "title": "Filter",
   *                          "type": "object"
   *                        }
   *                      ],
   *                      "properties": {
   *                        "contains_url": {
   *                          "description": "If ``true``, includes only events with a url key in their content. If ``false``, excludes those events.",
   *                          "type": "boolean"
   *                        },
   *                        "not_rooms": {
   *                          "description": "A list of room IDs to exclude. If this list is absent then no rooms are excluded. A matching room will be excluded even if it is listed in the ``'rooms'`` filter.",
   *                          "items": {
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        },
   *                        "rooms": {
   *                          "description": "A list of room IDs to include. If this list is absent then all rooms are included.",
   *                          "items": {
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        }
   *                      },
   *                      "title": "RoomEventFilter",
   *                      "type": "object"
   *                    }
   *                  ],
   *                  "description": "The events that aren't recorded in the room history, e.g. typing and receipts, to include for rooms."
   *                },
   *                "include_leave": {
   *                  "description": "Include rooms that the user has left in the sync, default false",
   *                  "type": "boolean"
   *                },
   *                "not_rooms": {
   *                  "description": "A list of room IDs to exclude. If this list is absent then no rooms are excluded. A matching room will be excluded even if it is listed in the ``'rooms'`` filter. This filter is applied before the filters in ``ephemeral``, ``state``, ``timeline`` or ``account_data``",
   *                  "items": {
   *                    "type": "string"
   *                  },
   *                  "type": "array"
   *                },
   *                "rooms": {
   *                  "description": "A list of room IDs to include. If this list is absent then all rooms are included. This filter is applied before the filters in ``ephemeral``, ``state``, ``timeline`` or ``account_data``",
   *                  "items": {
   *                    "type": "string"
   *                  },
   *                  "type": "array"
   *                },
   *                "state": {
   *                  "allOf": [
   *                    {
   *                      "allOf": [
   *                        {
   *                          "properties": {
   *                            "limit": {
   *                              "description": "The maximum number of events to return.",
   *                              "type": "integer"
   *                            },
   *                            "not_senders": {
   *                              "description": "A list of sender IDs to exclude. If this list is absent then no senders are excluded. A matching sender will be excluded even if it is listed in the ``'senders'`` filter.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "not_types": {
   *                              "description": "A list of event types to exclude. If this list is absent then no event types are excluded. A matching type will be excluded even if it is listed in the ``'types'`` filter. A '*' can be used as a wildcard to match any sequence of characters.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "senders": {
   *                              "description": "A list of senders IDs to include. If this list is absent then all senders are included.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "types": {
   *                              "description": "A list of event types to include. If this list is absent then all event types are included. A ``'*'`` can be used as a wildcard to match any sequence of characters.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            }
   *                          },
   *                          "title": "Filter",
   *                          "type": "object"
   *                        }
   *                      ],
   *                      "properties": {
   *                        "contains_url": {
   *                          "description": "If ``true``, includes only events with a url key in their content. If ``false``, excludes those events.",
   *                          "type": "boolean"
   *                        },
   *                        "not_rooms": {
   *                          "description": "A list of room IDs to exclude. If this list is absent then no rooms are excluded. A matching room will be excluded even if it is listed in the ``'rooms'`` filter.",
   *                          "items": {
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        },
   *                        "rooms": {
   *                          "description": "A list of room IDs to include. If this list is absent then all rooms are included.",
   *                          "items": {
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        }
   *                      },
   *                      "title": "RoomEventFilter",
   *                      "type": "object"
   *                    }
   *                  ],
   *                  "description": "The state events to include for rooms."
   *                },
   *                "timeline": {
   *                  "allOf": [
   *                    {
   *                      "allOf": [
   *                        {
   *                          "properties": {
   *                            "limit": {
   *                              "description": "The maximum number of events to return.",
   *                              "type": "integer"
   *                            },
   *                            "not_senders": {
   *                              "description": "A list of sender IDs to exclude. If this list is absent then no senders are excluded. A matching sender will be excluded even if it is listed in the ``'senders'`` filter.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "not_types": {
   *                              "description": "A list of event types to exclude. If this list is absent then no event types are excluded. A matching type will be excluded even if it is listed in the ``'types'`` filter. A '*' can be used as a wildcard to match any sequence of characters.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "senders": {
   *                              "description": "A list of senders IDs to include. If this list is absent then all senders are included.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            },
   *                            "types": {
   *                              "description": "A list of event types to include. If this list is absent then all event types are included. A ``'*'`` can be used as a wildcard to match any sequence of characters.",
   *                              "items": {
   *                                "type": "string"
   *                              },
   *                              "type": "array"
   *                            }
   *                          },
   *                          "title": "Filter",
   *                          "type": "object"
   *                        }
   *                      ],
   *                      "properties": {
   *                        "contains_url": {
   *                          "description": "If ``true``, includes only events with a url key in their content. If ``false``, excludes those events.",
   *                          "type": "boolean"
   *                        },
   *                        "not_rooms": {
   *                          "description": "A list of room IDs to exclude. If this list is absent then no rooms are excluded. A matching room will be excluded even if it is listed in the ``'rooms'`` filter.",
   *                          "items": {
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        },
   *                        "rooms": {
   *                          "description": "A list of room IDs to include. If this list is absent then all rooms are included.",
   *                          "items": {
   *                            "type": "string"
   *                          },
   *                          "type": "array"
   *                        }
   *                      },
   *                      "title": "RoomEventFilter",
   *                      "type": "object"
   *                    }
   *                  ],
   *                  "description": "The message and state update events to include for rooms."
   *                }
   *              },
   *              "title": "RoomFilter",
   *              "type": "object"
   *            }
   *          },
   *          "type": "object"
   *        }
   *      ],
   *      "example": {
   *        "event_fields": [
   *          "type",
   *          "content",
   *          "sender"
   *        ],
   *        "event_format": "client",
   *        "presence": {
   *          "not_senders": [
   *            "@alice:example.com"
   *          ],
   *          "types": [
   *            "m.presence"
   *          ]
   *        },
   *        "room": {
   *          "ephemeral": {
   *            "not_rooms": [
   *              "!726s6s6q:example.com"
   *            ],
   *            "not_senders": [
   *              "@spam:example.com"
   *            ],
   *            "types": [
   *              "m.receipt",
   *              "m.typing"
   *            ]
   *          },
   *          "state": {
   *            "not_rooms": [
   *              "!726s6s6q:example.com"
   *            ],
   *            "types": [
   *              "m.room.*"
   *            ]
   *          },
   *          "timeline": {
   *            "limit": 10,
   *            "not_rooms": [
   *              "!726s6s6q:example.com"
   *            ],
   *            "not_senders": [
   *              "@spam:example.com"
   *            ],
   *            "types": [
   *              "m.room.message"
   *            ]
   *          }
   *        }
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The filter was created.",
   *    "examples": {
   *      "application/json": {
   *        "filter_id": "66696p746572"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "filter_id": {
   *          "description": "The ID of the filter that was created.",
   *          "type": "string"
   *        }
   *      },
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
   * @summary : Upload a new filter.
   *
   */
  @Post('/_matrix/client/r0/user/:userId/filter')
  async defineFilter(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.DefineFilterBody
  ): Promise<dto.DefineFilterResponse | any> {
    throw new HttpError(501);
  }
}
