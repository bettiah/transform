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
export class MatrixClientR0UserUserIdFilterFilterId {
  /**
   * @parameters : [
   *  {
   *    "description": "The user ID to download a filter for.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The filter ID to download.",
   *    "in": "path",
   *    "name": "filterId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "66696p746572"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "\"The filter defintion\"",
   *    "examples": {
   *      "application/json": {
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
   *      }
   *    },
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
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "Unknown filter."
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Download a filter
   *
   */
  @Get('/_matrix/client/r0/user/:userId/filter/:filterId')
  async getFilter(
    @Param('userId') userId: string,
    @Param('filterId') filterId: string
  ): Promise<dto.GetFilterResponse | any> {
    throw new HttpError(501);
  }
}
