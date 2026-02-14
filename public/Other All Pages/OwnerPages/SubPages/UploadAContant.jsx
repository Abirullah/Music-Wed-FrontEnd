import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import Input from "../../../Component/Input";
import StepperPills from "../Parts/StepperPills";
import MobileBottomSheet from "../Parts/MobileBottomSheet";
import { uploadContent } from "../../../../src/api/owner";
import { getCurrentUser } from "../../../../src/utils/session";

const initialFormState = {
  uploadPermission: "",
  uploadPlatform: "",
  subscriberRange: "",
  expiryType: "",

  uploadHeading: "",
  uploadExpiryValue: "",
  uploadNonExpiryValue: "",

  copyright: "",
  coverTemplate: "",
  contentName: "",
  artistName: "",
  releaseDate: "",
  language: "",
  genre: "",
  mood: "",
  experience: "",

  instagram: "",
  youtube: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  people: "",
  snapchat: "",
  other: "",

  repostPermission: "",

  annexture: "",
  agreement: "",
};

export default function UploadAContent() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [noteOpen, setNoteOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [contentFile, setContentFile] = useState(null);
  const [coverTemplateFile, setCoverTemplateFile] = useState(null);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("uploadContent");
    if (!saved) return initialFormState;

    try {
      const parsed = JSON.parse(saved);
      return {
        ...initialFormState,
        ...parsed,
        // File objects are not persisted in localStorage; force users to pick files again.
        coverTemplate: "",
      };
    } catch {
      return initialFormState;
    }
  });
  const [errors, setErrors] = useState({});

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("uploadContentCompleted");
    return saved ? JSON.parse(saved) : { 1: false, 2: false, 3: false, 4: false, 5: false };
  });

  const steps = [
    { id: 1, label: "Content information" },
    { id: 2, label: "Content link" },
    { id: 3, label: "Permission to upload" },
    { id: 4, label: "Permission to repost" },
    { id: 5, label: "Agreement" },
  ];

  const isAllowed = (id) => {
    if (id === 1) return true;
    return completed[id - 1];
  };

  const handleClick = (id) => {
    if (!isAllowed(id)) return;
    setActive(id);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((s) => ({ ...s, [id]: value }));
    setErrors((err) => ({ ...err, [id]: "" }));
  };

  const handleRadio = (name, value) => {
    setFormData((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleFileChange = (field, file) => {
    if (field === "contentFile") {
      setContentFile(file || null);
      setErrors((prev) => ({ ...prev, contentFile: "" }));
    }

    if (field === "coverTemplateFile") {
      setCoverTemplateFile(file || null);
      setFormData((prev) => ({ ...prev, coverTemplate: file?.name || "" }));
      setErrors((prev) => ({ ...prev, coverTemplate: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.copyright.trim()) newErrors.copyright = "Required";
      if (!coverTemplateFile) newErrors.coverTemplate = "Cover template file is required";
      if (!contentFile) newErrors.contentFile = "Content file is required";
      if (!formData.contentName.trim()) newErrors.contentName = "Required";
      if (!formData.artistName.trim()) newErrors.artistName = "Required";
      if (!formData.releaseDate.trim()) newErrors.releaseDate = "Required";
      if (!formData.language.trim()) newErrors.language = "Required";
      if (!formData.genre.trim()) newErrors.genre = "Required";
      if (!formData.mood.trim()) newErrors.mood = "Required";
    }

    if (step === 2) {
      const links = [
        formData.instagram,
        formData.youtube,
        formData.twitter,
        formData.facebook,
        formData.linkedin,
        formData.people,
        formData.snapchat,
        formData.other,
      ];
      if (!links.some(link => link && link.trim()) && !contentFile) {
        newErrors._links = "At least one link or content file is required";
      }
    }

    if (step === 3 && !formData.uploadPermission) 
      newErrors.uploadPermission = "Required";

    if (step === 4 && !formData.repostPermission) 
      newErrors.repostPermission = "Required";

    if (step === 5) {
      if (!formData.annexture.trim()) newErrors.annexture = "Required";
      if (!formData.agreement.trim()) newErrors.agreement = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAndComplete = (step) => {
    localStorage.setItem("uploadContent", JSON.stringify(formData));
    const newCompleted = { ...completed, [step]: true };
    setCompleted(newCompleted);
    localStorage.setItem("uploadContentCompleted", JSON.stringify(newCompleted));
  };

  const handleSubmitStep = (step) => {
    return async (e) => {
      e.preventDefault();
      if (submitting) return;
      if (!validateStep(step)) {
        return;
      }

      saveAndComplete(step);

      if (step < 5) {
        setActive(step + 1);
      } else {
        await handleFinalSubmit();
      }
    };
  };

  const handleFinalSubmit = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser?.id) {
      setSubmitError("Please login as owner to upload.");
      return;
    }

    if (!contentFile || !coverTemplateFile) {
      setSubmitError("Please select both content and cover template files before final submit.");
      setErrors((prev) => ({
        ...prev,
        ...(contentFile ? {} : { contentFile: "Content file is required" }),
        ...(coverTemplateFile ? {} : { coverTemplate: "Cover template file is required" }),
      }));
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value ?? "");
      });

      if (contentFile) {
        payload.set("contentFile", contentFile);
      }

      if (coverTemplateFile) {
        payload.set("coverTemplateFile", coverTemplateFile);
      }

      await uploadContent(currentUser.id, payload);

      localStorage.removeItem("uploadContent");
      localStorage.removeItem("uploadContentCompleted");

      navigate("/owner/upload", {
        state: { uploadSuccess: "content" },
      });
    } catch (error) {
      setSubmitError(error.message || "Content upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white"
          aria-label="Back"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-900" />
        </button>

        <h1 className="text-base font-semibold text-gray-900">Upload Content</h1>

        <button
          type="button"
          onClick={() => setNoteOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white"
          aria-label="Note"
        >
          <LightBulbIcon className="h-6 w-6 text-gray-900" />
        </button>
      </div>

      <StepperPills
        steps={steps}
        active={active}
        completed={completed}
        isAllowed={isAllowed}
        onStepClick={handleClick}
      />
      {submitError ? (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {submitError}
        </p>
      ) : null}

      <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-10">
        {/* Desktop steps */}
        <div className="hidden lg:flex lg:w-[20%] px-6 rounded-lg h-fit bg-white shadow-md flex-col gap-6 py-6">
          {steps.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => handleClick(step.id)}
              disabled={!isAllowed(step.id)}
              className={`relative flex items-center border z-10 p-3 rounded-lg text-left transition ${
                isAllowed(step.id) ? "cursor-pointer" : "cursor-not-allowed opacity-60"
              } ${
                completed[step.id]
                  ? "text-green-700 bg-green-50 border-green-200"
                  : active === step.id
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div
                className={`absolute -left-4 flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                  completed[step.id]
                    ? "bg-green-600 text-white"
                    : "bg-yellow-400 text-white"
                }`}
              >
                {completed[step.id] ? "✓" : step.id}
              </div>

              <div className="ml-8 text-base font-medium">{step.label}</div>

              <div
                className={`absolute -right-3 h-6 w-6 rotate-45 border-t border-r border-black ${
                  completed[step.id]
                    ? "bg-green-50 border-transparent"
                    : active === step.id
                    ? "bg-gray-900 border-transparent"
                    : "bg-white"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="w-full lg:w-[50%]">
          {active === 1 && (
            <StepOne
              data={formData}
              contentFile={contentFile}
              coverTemplateFile={coverTemplateFile}
              onChange={handleChange}
              onFileChange={handleFileChange}
              onRadioChange={handleRadio}
              onSubmit={handleSubmitStep(1)}
              errors={errors}
            />
          )}

          {active === 2 && (
            <StepTwo
              data={formData}
              onChange={handleChange}
              onSubmit={handleSubmitStep(2)}
              errors={errors}
              goBack={goBack}
            />
          )}

          {active === 3 && (
            <StepThree
              data={formData}
              onRadioChange={handleRadio}
              onChange={handleChange}
              onSubmit={handleSubmitStep(3)}
              errors={errors}
              goBack={goBack}
            />
          )}

          {active === 4 && (
            <StepFour
              data={formData}
              onRadioChange={handleRadio}
              onSubmit={handleSubmitStep(4)}
              errors={errors}
              goBack={goBack}
            />
          )}

          {active === 5 && (
            <StepFive
              data={formData}
              onChange={handleChange}
              onSubmit={handleSubmitStep(5)}
              errors={errors}
              goBack={goBack}
              isSubmitting={submitting}
            />
          )}
        </div>

        {/* Desktop note */}
        <div className="hidden lg:block lg:w-[25%] rounded-xl border border-gray-200 bg-gradient-to-r from-[#b7c3ee] to-[#f0d9da] p-4 shadow-sm h-fit">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white shadow">
              <LightBulbIcon className="h-5 w-5 text-gray-700" />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold">Note</span>
              <br />
              Any headings without prices will not be displayed to your customers.
            </p>
          </div>
        </div>
      </div>

      <MobileBottomSheet open={noteOpen} title="Note" onClose={() => setNoteOpen(false)}>
        Any headings without prices will not be displayed to your customers.
      </MobileBottomSheet>
    </div>
  );
}

function StepOne({
  data,
  contentFile,
  coverTemplateFile,
  onChange,
  onFileChange,
  onSubmit,
  errors,
}) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 space-y-5 shadow-sm">
        <h2 className="text-lg font-semibold">Content Information</h2>

        <Input
          id="copyright"
          label="Copyright Owner Name *"
          placeholder="Enter Name"
          value={data.copyright}
          onChange={onChange}
          error={errors.copyright}
        />

        <FilePicker
          label="Upload content file *"
          file={contentFile}
          fallbackName={contentFile?.name}
          accept="video/*,audio/*"
          error={errors.contentFile}
          onFileSelect={(file) => onFileChange("contentFile", file)}
        />

        <FilePicker
          label="Upload cover template file *"
          file={coverTemplateFile}
          fallbackName={data.coverTemplate}
          accept="image/*"
          error={errors.coverTemplate}
          onFileSelect={(file) => onFileChange("coverTemplateFile", file)}
        />

        <Input
          id="contentName"
          label="Content Name *"
          placeholder="Enter content name"
          value={data.contentName}
          onChange={onChange}
          error={errors.contentName}
        />

        <Input
          id="artistName"
          label="Artist Name *"
          placeholder="Enter artist name"
          value={data.artistName}
          onChange={onChange}
          error={errors.artistName}
        />

        <Input
          id="releaseDate"
          type="month"
          label="Month & Year of Release *"
          value={data.releaseDate}
          onChange={onChange}
          error={errors.releaseDate}
        />

        <Select
          label="Language *"
          id="language"
          value={data.language}
          onChange={onChange}
          options={["English", "Spanish", "French", "Hindi", "Other"]}
          error={errors.language}
        />

        <Select
          label="Select Genre *"
          id="genre"
          value={data.genre}
          onChange={onChange}
          options={["Pop", "Hip Hop", "Rock", "Electronic", "Classical", "Jazz"]}
          error={errors.genre}
        />

        <Select
          label="Enter Mood *"
          id="mood"
          value={data.mood}
          onChange={onChange}
          options={["Happy", "Sad", "Chill", "Energetic", "Romantic", "Motivational"]}
          error={errors.mood}
        />

        <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

function StepTwo({ data, onChange, onSubmit, errors, goBack }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 space-y-5 shadow-sm">
        <h2 className="text-lg font-semibold">Content Links</h2>

        {["instagram", "youtube", "facebook", "twitter", "linkedin", "people"].map((field) => (
          <Input
            key={field}
            id={field}
            label={`${field === "people" ? "Pepul" : field.charAt(0).toUpperCase() + field.slice(1)} Link`}
            placeholder="Enter link"
            value={data[field]}
            onChange={onChange}
          />
        ))}

        {errors._links && <p className="text-red-500 text-sm">{errors._links}</p>}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={goBack}
            className="w-full bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
function StepThree({ data, onRadioChange, onChange, onSubmit, goBack }) {
  const [subStep, setSubStep] = useState(1);

  const next = () => setSubStep((s) => Math.min(s + 1, 4)); 
  const back = () => setSubStep((s) => Math.max(s - 1, 1));

  return (
    <form
      onSubmit={subStep === 4 ? onSubmit : (e) => e.preventDefault()}
      className="w-full flex flex-col gap-5"
    >
      <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 space-y-6 shadow-sm">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Permission to Upload</h2>
          <span className="text-sm text-gray-500">Step {subStep}/4</span>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-[2px] bg-gray-200">
          <div
            className="h-[2px] bg-black transition-all"
            style={{ width: `${(subStep / 4) * 100}%` }}
          />
        </div>

        {/* ===== STEP 1 ===== */}
        {subStep === 1 && (
          <>
            <p className="font-medium">
              Permission to remix / combine the selected content
            </p>

            <div className="space-y-3">
              <RadioCard
                label="Commercial / Business purpose"
                checked={data.uploadPermission === "commercial"}
                onChange={() =>
                  onRadioChange("uploadPermission", "commercial")
                }
              />

              <RadioCard
                label="Specific / Custom licence"
                checked={data.uploadPermission === "custom"}
                onChange={() =>
                  onRadioChange("uploadPermission", "custom")
                }
              />
            </div>
          </>
        )}

        {/* ===== STEP 2 ===== */}
        {subStep === 2 && (
          <>
            <p className="font-medium">Commercial / Business purpose</p>

            <div className="space-y-3">
              {["Youtube", "Instagram", "Facebook", "Discuss with Copyva team"].map(
                (p) => (
                  <RadioCard
                    key={p}
                    label={p}
                    checked={data.uploadPlatform === p}
                    onChange={() =>
                      onRadioChange("uploadPlatform", p)
                    }
                  />
                )
              )}

              <button
                type="button"
                className="border rounded-xl p-4 w-full text-left"
              >
                + Add an option if needed
              </button>
            </div>
          </>
        )}

        {/* ===== STEP 3 ===== */}
        {subStep === 3 && data.uploadPermission === "commercial" && data.uploadPlatform === "Youtube" && (
          <>
            <p className="font-medium">Youtube</p>

            <div className="space-y-3">
              {[
                "0 to 50,000 subscribers",
                "50,000 to 5,00,000 subscribers",
                "5,00,000 to 20,00,000 subscribers",
                "20 lakhs (2 million) to 1 crore (10 million)",
                "More than 1 crore (10 million)",
              ].map((range) => (
                <RadioCard
                  key={range}
                  label={range}
                  checked={data.subscriberRange === range}
                  onChange={() =>
                    onRadioChange("subscriberRange", range)
                  }
                  edit
                />
              ))}
            </div>
          </>
        )}

        {/* ===== STEP 3 ALTERNATIVE (if not Youtube) ===== */}
        {subStep === 3 && data.uploadPermission === "commercial" && data.uploadPlatform && data.uploadPlatform !== "Youtube" && (
          <>
            <p className="font-medium">{data.uploadPlatform} Platform Settings</p>
            <div className="space-y-3">
              <div className="border rounded-md p-4">
                <p className="text-gray-600">Standard platform settings applied for {data.uploadPlatform}</p>
              </div>
            </div>
          </>
        )}

        {/* ===== STEP 3 FOR CUSTOM LICENSE ===== */}
        {subStep === 3 && data.uploadPermission === "custom" && (
          <>
            <p className="font-medium">Custom License Configuration</p>
            <div className="space-y-3">
              <textarea
                className="w-full border rounded-md p-3"
                placeholder="Describe your custom license requirements..."
                value={data.customLicense || ""}
                onChange={(e) => onRadioChange("customLicense", e.target.value)}
              />
            </div>
          </>
        )}

        {/* ===== STEP 4 (PRICING LIST) ===== */}
        {subStep === 4 && (
          <>
            <p className="font-medium">
              License to use {data.uploadPlatform || "Platform"} —{" "}
              {data.subscriberRange || "Select subscriber range"}
            </p>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-4">
              <p className="text-sm font-semibold text-gray-700">List 1</p>

              <Input
                id="uploadHeading"
                label="Add heading"
                placeholder="Enter your heading"
                value={data.uploadHeading}
                onChange={onChange}
              />

              <Input
                id="uploadExpiryValue"
                label="Expiry"
                placeholder="Enter value"
                value={data.uploadExpiryValue}
                onChange={onChange}
              />

              <Input
                id="uploadNonExpiryValue"
                label="Non Expiry"
                placeholder="Enter value"
                value={data.uploadNonExpiryValue}
                onChange={onChange}
              />

              <button
                type="button"
                className="border rounded-xl p-4 w-full text-left bg-white hover:bg-gray-50"
              >
                + Add an option if needed
              </button>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={subStep === 1 ? goBack : back}
          className="w-full bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() => {
            if (subStep === 4) {
              // call the passed onSubmit handler with a fake event
              onSubmit({ preventDefault: () => {} });
            } else {
              next();
            }
          }}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
        >
          {subStep === 4 ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
}

function StepFour({ data, onRadioChange, onSubmit, errors, goBack }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 space-y-5 shadow-sm">
        <h2 className="text-lg font-semibold">Permission to Repost</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Repost Permission *</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="repostPermission"
                checked={data.repostPermission === "yes"}
                onChange={() => onRadioChange("repostPermission", "yes")}
                className="w-4 h-4"
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="repostPermission"
                checked={data.repostPermission === "no"}
                onChange={() => onRadioChange("repostPermission", "no")}
                className="w-4 h-4"
              />
              No
            </label>
          </div>
          {errors.repostPermission && <p className="text-red-500 text-xs">{errors.repostPermission}</p>}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={goBack}
            className="w-full bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

function StepFive({ data, onChange, onSubmit, errors, goBack, isSubmitting = false }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 space-y-5 shadow-sm">
        <h2 className="text-lg font-semibold">Agreement</h2>
        <hr className="border-t border-gray-300" />

        <div className="w-full">
          <p className="text-sm font-medium mb-2 text-gray-700">Annexture *</p>
          <textarea
            id="annexture"
            value={data.annexture}
            onChange={onChange}
            className={`h-[150px] rounded-2xl w-full border p-4 bg-white ${
              errors.annexture ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter annexture details..."
          ></textarea>
          {errors.annexture && <p className="text-red-500 text-xs">{errors.annexture}</p>}
        </div>

        <div className="w-full">
          <p className="text-sm font-medium mb-2 text-gray-700">Agreement *</p>
          <textarea
            id="agreement"
            value={data.agreement}
            onChange={onChange}
            className={`h-[150px] rounded-2xl w-full border p-4 bg-white ${
              errors.agreement ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter agreement details..."
          ></textarea>
          {errors.agreement && <p className="text-red-500 text-xs">{errors.agreement}</p>}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={goBack}
            className="w-full bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

function FilePicker({
  label,
  file,
  fallbackName = "",
  accept,
  error = "",
  onFileSelect,
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{label}</p>
      <label
        className={`cursor-pointer rounded-xl border px-4 py-3 text-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(event) => onFileSelect?.(event.target.files?.[0] || null)}
        />
        {file?.name || fallbackName || "Choose file"}
      </label>
      {error ? <p className="text-red-500 text-xs">{error}</p> : null}
    </div>
  );
}

function Select({ label, options, id, value = "", onChange = () => {}, error = "" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function RadioCard({ label, checked, onChange, edit }) {
  return (
    <label
      className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer ${
        checked ? "border-black" : "border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <input type="radio" checked={checked} onChange={onChange} />
        <span>{label}</span>
      </div>
      {edit ? <span className="text-blue-500">✎</span> : null}
    </label>
  );
}
