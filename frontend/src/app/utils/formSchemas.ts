import { z } from "zod";

// sign up form schema

const SignupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
      phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => /^\d{11}$/.test(val), { message: "Phone number must be exactly 11 digits" }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),

});


type SignupFormData = z.infer<typeof SignupSchema>;
export { SignupSchema }
export type {
    SignupFormData

}
// login form schema 
const LoginSchema = z.object({

    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),

});
type LoginFormData = z.infer<typeof LoginSchema>;
export { LoginSchema }
export type { LoginFormData }

// creatProduct form schema
const CreateProductSchema = z.object({
    productImg: z
        .custom((val) => val instanceof FileList && val.length > 0, {
            message: 'Product image is required and must be a file',
        }),
    categoryName: z.enum(
 [
"Perfume","Smart Watch","Fashion","Beauty & Skincare","Electronics","Mobile Phones","Laptops","Tablets","Desktop Computers","Computer Accessories","Cameras","Headphones","Speakers","Home Appliances","Kitchen Appliances","Refrigerators","Washing Machines","Air Conditioners","Furniture","Living Room Furniture","Bedroom Furniture","Office Furniture","Clothing Men","Clothing Women","Clothing Kids","Shoes Men","Shoes Women","Shoes Kids","Bags & Luggage","Watches","Jewelry","Books","Stationery","Sports Equipment","Fitness & Gym","Toys","Baby Products","Health Care","Pharmacy","Groceries","Snacks & Beverages","Fresh Fruits","Fresh Vegetables","Meat","Chicken","Fish","Frozen Foods","Dairy","Bread","Breakfast Foods","Cooking Oils","Rice","Pasta","Flour","Spices","Sauces","Condiments","Biscuits","Chocolates","Juices","Energy Drinks","Tea","Coffee","Canned Foods","Pickles","Dry Fruits","Nuts","Baby Food","Instant Foods","Pet Supplies","Automobile Accessories","Motorbikes","Car Accessories","Gardening","Home Decor","Lighting","Tools & Hardware","Construction Materials","Musical Instruments","Gaming Consoles","Video Games","Software","Streaming Devices","Smart Home Devices","Medical Equipment","Safety & Security","Gift Items","Seasonal Items","Arts & Crafts","Cleaning Supplies","Personal Care","Travel Accessories","Office Supplies","Mattresses","Home Storage","Outdoor Furniture","Camping Gear","Hiking Gear","Cycling Accessories","Gym Accessories","Party Supplies","School Supplies","Wedding Items","Religious Items","Local Handicrafts","Car Care","Bike Parts","Industrial Tools","Laboratory Equipment","Medical Consumables","Kitchen Utensils","Bakeware","Cutlery","Glassware","Water Bottles","Lunch Boxes","Cleaning Tools","Laundry Products","Bath Products","Fragrance Oils","Home Fragrances",

"LED TVs","OLED TVs","QLED TVs","Smart Lights","Wireless Chargers","Power Banks","Bluetooth Keyboards","Mechanical Keyboards","Graphics Cards","Processors","Motherboards","RAM","SSD","HDD","PC Cases","Monitors","Projectors","Printers","Scanners","Ink Cartridges","Routers","Modems","Network Switches","VR Headsets","Drones","Microwave Ovens","Toasters","Electric Kettles","Induction Cooktops","Rice Cookers","Air Fryers","Food Processors","Blenders","Water Purifiers","Geysers","Heaters","Irons","Vacuum Cleaners","Robot Vacuums","Dishwashers","Sewing Machines","Electric Fans","Ceiling Fans","Table Fans","Exhaust Fans","Chandeliers","LED Bulbs","Strip Lights","Power Tools","Hand Tools","Cordless Drills","Wrenches","Screwdrivers","Safety Gloves","Safety Helmets","Fire Extinguishers","Smoke Detectors","Baby Diapers","Baby Wipes","Strollers","Car Seats","Baby Cribs","Educational Toys","Soft Toys","Board Games","Puzzles","Sports Shoes","Football Gear","Cricket Gear","Tennis Gear","Badminton Gear","Swimming Gear","Camping Tents","Sleeping Bags","Outdoor Stoves","Barbecue Tools","Garden Tools","Plant Seeds","Fertilizers","Pesticides","Flower Pots","Artificial Plants","Wall Clocks","Paintings","Photo Frames","Wall Stickers","Curtains","Carpets","Rugs","Bedsheets","Pillows","Blankets","Comforters","Table Covers","Dining Sets","Sofas","Chairs","Study Tables","Bookshelves",

"Kitchen Towels","Mops","Brooms","Cleaning Liquids","Dish Soaps","Detergents","Bleach","Multi Surface Cleaners","Air Fresheners","Toilet Cleaners","Tissue Papers","Hair Oils","Shampoos","Conditioners","Hair Colors","Hair Waxes","Hair Gels","Face Wash","Face Creams","Serums","Sunscreen","Lip Balm","Lipsticks","Nail Polish","Makeup Kits","Makeup Brushes","Shaving Cream","Razors","Beard Oils","Beard Trimmers","Hair Dryers","Hair Straighteners","Curling Irons","Perfume Oils","Deodorants","Body Wash","Hand Wash","Toothpaste","Toothbrushes","Mouthwash","Dental Floss","Painkillers","Vitamins","Supplements","Protein Powder","Mass Gainers","Energy Bars","Glucose","First Aid Kits","Bandages","Disinfectants","Ointments","Thermometers","Blood Pressure Monitors","Glucose Meters","Wheelchairs","Walkers","Crutches","Hospital Beds","Surgical Gloves","Face Masks","Hand Sanitizers",

"Cooking Salt","Black Pepper","Red Chili","Turmeric","Cumin","Coriander","Cardamom","Cloves","Cinnamon","Bay Leaf","Vinegar","Soy Sauce","BBQ Sauce","Ketchup","Mayonnaise","Mustard","Honey","Jams","Peanut Butter","Dates","Raisins","Cashews","Almonds","Walnuts","Pistachios","Popcorn","Cookies","Cakes","Cupcakes","Pastries","Ice Cream","Frozen Parathas","Frozen Nuggets","Frozen Fries","Milk","Butter","Cheese","Yogurt","Cream","Eggs","Brown Bread","White Bread","Buns","Noodles","Vermicelli","Macaroni","Tomato Paste","Green Tea","Black Tea","Herbal Tea","Chocolate Milk","Cereal","Cornflakes","Muesli","Oats","Sugar","Brown Sugar","Jaggery","Cooking Cream","Tomato Sauce","Chili Sauce","Pickled Vegetables","Frozen Pizza",

"Handbags","Wallets","Suitcases","Travel Bags","Laptop Bags","Tote Bags","Clutches","Backpacks","School Bags","Briefcases","Keychains","Belts","Caps","Hats","Scarves","Gloves","Socks","Sunglasses","Contact Lenses","Eye Drops","Wristbands","Headbands",

"Sofa Covers","Chair Covers","Bedside Tables","Dressing Tables","Study Lamps","Night Lamps","Fans","Irons","Kettles","Extension Boards","Switch Covers","Door Mats","Shoe Racks","Cloth Racks","Iron Stands","Laundry Baskets","Water Dispensers","Electric Stoves","Gas Stoves","Pressure Cookers","Tawa","Pans","Kadai","Spatula","Graters","Sifters","Chopping Boards","Knives","Kitchen Scales","Aprons","Oven Mitts","Food Storage Boxes","Jars","Glass Jugs","Plates","Bowls","Spoons","Forks","Knives","Coffee Mugs","Tea Cups","Bake Molds","Rolling Pins","Cookie Cutters","Measuring Cups","Thermos Bottles","Oil Sprayers","Salad Bowls",


]
),
    title: z.string().min(1, 'Title is required'),
    price: z.coerce.number().min(1, { message: 'price is required' }),
    description: z.string().min(1, 'Description is required'),
    countInStock: z.coerce.number().min(1, { message: 'Stock count is required' }),
    brand: z.string().min(1, 'Brand is required'),
});
type CreateProductFormData = z.infer<typeof CreateProductSchema>
export { CreateProductSchema }
export type { CreateProductFormData }

// address form schema 
const AddressSchema = z.object({
   
    Province: z.enum(
       [
          "Lahore",
  "Faisalabad",
  "Multan",
  "Rawalpindi",
  "Gujranwala",
  "Sialkot",
   "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu and Kashmir"
       ],
        {
            errorMap: () => ({ message: "Invalid province. Please select a valid province." }),
        }
    ), // Province must be one of the specified values
    City: z
        .string()
        .nonempty("City is required"), // Custom error for City
   
    Building: z
        .string()
        .optional()
        .or(z.literal("").optional()), // Optional Building field
    HouseNo: z
        .string()
        .nonempty("House or office number is required"), // Required HouseNo field with message
    Floor: z
        .string()
        .optional(), // Optional Floor
  Street: z
  .string()
  .regex(/^[A-Za-z0-9\s\/-]{3,}$/, "Invalid street format. Example: G16/3 Street 48"),

});
type AddressFormData = z.infer<typeof AddressSchema>;

export { AddressSchema };
export type { AddressFormData };
