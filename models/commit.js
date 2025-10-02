const { Schema, model } = require("mongoose");

const commitSchema = new Schema(
  {
    content: {
      type: String,
      required: true,  // ✅ "require" ki jagah "required"
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",   // ✅ Blog ka model name
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",   // ✅ User ka model name, without space
    },
  },
  { timestamps: true }
);

const Commit = model("Commit", commitSchema);

module.exports = Commit;
