import mongoose from "mongoose";

const { Schema } = mongoose;

let Conversation;
if (mongoose.models.Conversation) {
  Conversation = mongoose.models.Conversation;
} else {
  const MessageSchema = new Schema({
    input: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  });

  const ConversationSchema = new Schema(
    {
      userEmail: {
        type: String,
        required: true,
      },
      lastMessageAt: {
        type: Date,
        default: null,
      },
      messages: [MessageSchema],
    },
    { timestamps: true }
  );

  Conversation = mongoose.model("Conversation", ConversationSchema);
}

export default Conversation;
