import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewProject,
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

const AddProject = () => {
  const { control, handleSubmit, setValue, watch } = useForm(
    {
      defaultValues: {
        title: "",
        description: "",
        technologies: "",
        stack: "",
        projectUrl: "",
        projectBanner:null,
      },
    }
  );
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setValue("projectBanner", file);
    };
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    dispatch(addNewProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[100%] px-5 md:w-[1000px]"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
              ADD NEW PROJECT
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              <FormInput
                label="Project Title"
                name="title"
                control={control}
                placeholder="MERN STACK PORTFOLIO"
              />
              <FormTextarea
                label="Description"
                name="description"
                control={control}
                placeholder="Feature 1. Feature 2. Feature 3."
              />
              <FormTextarea
                label="Technologies Used In This Project"
                name="technologies"
                control={control}
                placeholder="HTML, CSS, JAVASCRIPT, REACT"
              />
              <FormSelect
                label="Stack"
                name="stack"
                control={control}
                options={[
                  { value: "Full Stack", label: "Full Stack" },
                  { value: "MERN", label: "MERN" },
                  { value: "MEAN", label: "MEAN" },
                  { value: "Next.JS", label: "NEXT.JS" },
                  { value: "React.JS", label: "REACT.JS" },
                  { value: "Node.JS", label: "NODE.JS" },
                  { value: "Kotlin", label: "Kotlin" },
                  { value: "Flutter", label: "Flutter" },
                  { value: "Dart", label: "Dart" },
                  { value: "Java", label: "Java" },
                  { value: "React Native", label: "React Native" },
                ]}
                placeholder="Select Project Stack"
              />
              <FormSelect
                label="Deployed"
                name="deployed"
                control={control}
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                placeholder="Is this project deployed?"
              />
              <FormInput
                label="Github Repository Link"
                name="gitRepoLink"
                control={control}
                placeholder="Github Repository Link"
                icon={<Link className="absolute w-5 h-5 left-1 top-2" />}
              />
              <FormInput
                label="Project Link"
                name="projectLink"
                control={control}
                placeholder="Project Link"
                icon={<Link className="absolute w-5 h-5 left-1 top-2" />}
              />
              <div className="w-full col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Banner
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {projectBannerPreview ? (
                      <img
                        className="mx-auto h-[250px] w-full text-gray-300"
                        src={projectBannerPreview}
                        alt="Project Banner Preview"
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleSvg}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <SpecialLoadingButton
              content={"ADDING NEW PROJECT"}
              width={"w-56"}
            />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-56"
            >
              Add Project
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const FormInput = ({ label, name, control, placeholder, icon }) => (
  <div className="w-full sm:col-span-4">
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
        {icon}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type="text"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder={placeholder}
              {...field}
            />
          )}
        />
      </div>
    </div>
  </div>
);

const FormTextarea = ({ label, name, control, placeholder }) => (
  <div className="w-full sm:col-span-4">
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Textarea
              placeholder={placeholder}
              {...field}
            />
          )}
        />
      </div>
    </div>
  </div>
);

const FormSelect = ({ label, name, control, options, placeholder }) => (
  <div className="w-full sm:col-span-4">
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  </div>
);

export default AddProject;