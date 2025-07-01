import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // res.json(201).json({message: "Everything is okay "})
  //? get uer details
  //? validate data
  //? check if user is already exists or not? email,username?
  //? check for image and CoverImage
  //? upload them to cloudinary
  //? create user object
  //? remove password,refresh token
  //? return res


  // get uer details
  const { username, fullname, email, password } = req.body;
  console.log(username);
  
  // if(username === ""){
    //     throw new ApiError(400,"username is required");
    // }
    
    // validate data
    
    if (
        [username, fullname, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All field are required");
    }


    // check if user is already exists or not? email,username?
    const existedUser = UserActivation.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser) {
        throw new ApiError(400, "User with this email or username already exists");
    }


    // check for image and CoverImage
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required !!!");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
    if (!avatar) {
        throw new ApiError(400, "Avatar is required !!!");
    }
    // upload them to cloudinary
    const user = await User.create({
        username,
        fullname,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || null
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong, while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully !!!")
    )
    // create user object
    // remove password,refresh token
    // return res
});

export { registerUser };
