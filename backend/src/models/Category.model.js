import mongoose,{Schema} from "mongoose";

const CATEGORY_ENUM =[
"Women Fashion",
"Dresses (Switched)",
"Dresses (Unswitched)",
"Shoes",
"Bags",
"Jewelry",
"Cosmetics",
"Home and Living",
"Bedsheets",
"Kitchen Essentials",
"Gifts and Specials",
"Gifts",
"Desi Products",
"Gadgets and Tech",
"Gadgets",
"Mobile Accessories",
"Kids Collection",
"Men Fashion",
"Seasonal Deals",
"Sale",
"Watches",
"Bedroom Furniture"
]



const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      enum: CATEGORY_ENUM,
      required: [true, "name is required"],
      trim: true,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
  },
  { timestamps: true }
);



export const Category=mongoose.model("Category",categorySchema)