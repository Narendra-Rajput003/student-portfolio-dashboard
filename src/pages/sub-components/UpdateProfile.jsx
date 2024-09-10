import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      aboutMe: user?.aboutMe || "",
      portfolioURL: user?.portfolioURL || "",
      linkedInURL: user?.linkedInURL === "undefined" ? "" : user?.linkedInURL,
      githubURL: user?.githubURL === "undefined" ? "" : user?.githubURL,
      instagramURL: user?.instagramURL === "undefined" ? "" : user?.instagramURL,
      twitterURL: user?.twitterURL === "undefined" ? "" : user?.twitterURL,
      facebookURL: user?.facebookURL === "undefined" ? "" : user?.facebookURL,
    },
  });

  const avatar = watch("avatar");
  const resume = watch("resume");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    dispatch(updateProfile(formData));
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setValue(name, file);
      setValue(`${name}Preview`, reader.result);
    };
  };

  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Profile</h1>
            <p className="text-balance text-muted-foreground">
              Update Your Profile Here
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={watch("avatarPreview") || "/avatarHolder.jpg"}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "avatar")}
                    className="avatar-update-btn"
                  />
                </div>
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                <Link to={user?.resume?.url} target="_blank">
                  <img
                    src={watch("resumePreview") || "/avatarHolder.jpg"}
                    alt="resume"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </Link>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "resume")}
                    className="avatar-update-btn"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && <p>{errors.fullName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                type="text"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea {...register("aboutMe")} />
            </div>
            <div className="grid gap-2">
              <Label>Portfolio URL</Label>
              <Input type="text" {...register("portfolioURL")} />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input type="text" {...register("linkedInURL")} />
            </div>
            <div className="grid gap-2">
              <Label>Github URL</Label>
              <Input type="text" {...register("githubURL")} />
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input type="text" {...register("instagramURL")} />
            </div>
            <div className="grid gap-2">
              <Label>Twitter(X) URL</Label>
              <Input type="text" {...register("twitterURL")} />
            </div>
            <div className="grid gap-2">
              <Label>Facebook URL</Label>
              <Input type="text" {...register("facebookURL")} />
            </div>
            {!loading ? (
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating"} />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;