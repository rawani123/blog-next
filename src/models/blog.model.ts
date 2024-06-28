import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users" // Correct reference
    }
  }, { timestamps: true });
  
  const Blog = mongoose.models.vlogs || mongoose.model("vlogs", blogSchema);

export default Blog;