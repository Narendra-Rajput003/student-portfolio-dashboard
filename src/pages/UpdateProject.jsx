import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";
import { Button } from "@/components/ui/button";

const UpdateProject = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
      stack: "",
      gitRepoLink: "",
      deployed: "",
      projectLink: "",
      projectBanner: null,
    },
  });
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleProjectBanner = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setValue("projectBanner", file);
    };
  }, [setValue]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`https://student-portfolio-backend.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const project = res.data.project;
        setValue("title", project.title || "");
        setValue("description", project.description || "");
        setValue("stack", project.stack || "");
        setValue("deployed", project.deployed || "");
        setValue("technologies", project.technologies || "");
        setValue("gitRepoLink", project.gitRepoLink || "");
        setValue("projectLink", project.projectLink || "");
        setProjectBannerPreview(project.projectBanner?.url || "");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, error, setValue, dispatch]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    dispatch(updateProject(id, formData));
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl">UPDATE PROJECT</h2>
              <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <img
                  src={projectBannerPreview || "/avatarHolder.jpg"}
                  alt="projectBanner"
                  className="w-full h-auto"
                />
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleProjectBanner}
                    className="avatar-update-btn mt-4 w-full"
                  />
                </div>
              </div>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <div className="w-full sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Project Title</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="MERN STACK PORTFOLIO"
                        {...field}
                      />
                    </div>
                  </div>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <div className="w-full sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    <div className="mt-2">
                      <Textarea
                        placeholder="Feature 1. Feature 2. Feature 3."
                        {...field}
                      />
                    </div>
                  </div>
                )}
              />
              <Controller
                name="technologies"
                control={control}
                render={({ field }) => (
                  <div className="w-full sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Technologies Used In This Project</label>
                    <div className="mt-2">
                      <Textarea
                        placeholder="HTML, CSS, JAVASCRIPT, REACT"
                        {...field}
                      />
                    </div>
                  </div>
                )}
              />
              <Controller
                name="stack"
                control={control}
                render={({ field }) => (
                  <div className="w-full sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Stack</label>
                    <div className="mt-2">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project Stack" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full Stack">Full Stack</SelectItem>
                          <SelectItem value="Mern">MERN</SelectItem>
                          <SelectItem value="Mean">MEAN</SelectItem>
                          <SelectItem value="Next.JS">NEXT.JS</SelectItem>
                          <SelectItem value="React.JS">REACT.JS</SelectItem>
                          <SelectItem value="Node.js">Node.JS</SelectItem>
                          <SelectItem value="JAVA">JAVA</SelectItem>
                          <SelectItem value="Flutter">Flutter</SelectItem>
                          <SelectItem value="Kotlin">Kotlin</SelectItem>
                          <SelectItem value="Dart">Dart</SelectItem>
                          <SelectItem value="React Native">React Native</SelectItem>
                          

                          </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              />
              <Controller
                name="deployed"
                control={control}
                render={({ field }) => (
                  <div className="w-full sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Deployed</label>
                    <div className="mt-2">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Is this project deployed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              />
              <Controller
                name="gitRepoLink"
                control={control}
                render={({ field }) => (
                  <div className="w-full sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Github Repository Link</label>
                    <div className="mt-2">
                      <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input
                          type="text"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Github Repository Link"
                          {...field}
                        />
                        <Link className="absolute w-5 h-5 left-1 top-2" />
                      </div>
                    </div>
                  </div>
                )}
              />
              <Controller
                name="projectLink"
                control={control}
                render={({ field }) => (
                  <div className="w-full sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Project Link</label>
                    <div className="mt-2">
                      <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input
                          type="text"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Project Link"
                          {...field}
                        />
                        <Link className="absolute w-5 h-5 left-1 top-2" />
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <SpecialLoadingButton content={"Updating"} width={"w-52"} />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;