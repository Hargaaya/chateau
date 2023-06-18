import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ChatCompletionSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
});

export default mongoose.models.ChatCompletion || model<ChatCompletion>("ChatCompletion", ChatCompletionSchema);
