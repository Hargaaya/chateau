import { Schema, model, models } from "mongoose";

/* User Schema
 * @param {string} _id - User's Email
 * @param {Chat[]} chats - User's chats
 * @param {Board[]} boards - User's boards
 * @param {Settings} settings - User's settings
 * @param {Date} created_at - User's creation date
 * @param {Date} updated_at - User's last update date
 * @returns {User} - User's schema
 */

export type User = {
  _id: string;
  chats: Chat[];
  boards: Board[];
  settings: Settings;
  createdAt?: Date;
  updatedAt?: Date;
};

const user = new Schema<User>(
  {
    _id: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        messages: [
          {
            _id: {
              type: String,
              required: true,
            },
            role: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: false,
            },
            liked: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        ],
        createdAt: {
          type: Date,
          required: false,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          required: false,
          default: Date.now,
        },
      },
    ],
    boards: [
      {
        name: {
          type: String,
          required: true,
        },
        snippets: [
          {
            hash: {
              type: String,
              required: true,
            },
            language: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    settings: {
      model: {
        type: String,
        required: true,
        default: "gpt-3.5-turbo",
      },
      apiKey: {
        type: String,
        required: false,
      },
      theme: {
        type: String,
        required: true,
        default: "system",
      },
      codeTheme: {
        type: String,
        required: true,
        default: "dracula",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<User>("User", user);
