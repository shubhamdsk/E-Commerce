import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      price: {
         type: Number,
         required: true,
         trim: true,
      },
      category: {
         type: String,
         required: true,
         trim: true,
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "users",
         required: true,
      },
      company: {
         type: String,
         required: true,
         trim: true,
      },

   },
   { timestamps: true }
);

export default mongoose.model("Product", productSchema);
