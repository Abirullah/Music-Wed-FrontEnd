import { useState} from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import Input from "../../../Component/Input";

const initialFormState = {
    uploadPermission: "",
uploadPlatform: "",
subscriberRange: "",
expiryType: "",

  copyright: "",
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
  const [active, setActive] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("uploadContent");
    return saved ? { ...initialFormState, ...JSON.parse(saved) } : initialFormState;
  });
  const [errors, setErrors] = useState({});

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("uploadContentCompleted");
    return saved ? JSON.parse(saved) : { 1: false, 2: false, 3: false, 4: false, 5: false };
  });

  const steps = [
    { id: 1, label: "Song Information" },
    { id: 2, label: "Song Link" },
    { id: 3, label: "Upload Permission" },
    { id: 4, label: "Repost Permission" },
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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.copyright.trim()) newErrors.copyright = "Required";
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
      if (!links.some(link => link && link.trim())) {
        newErrors._links = "At least one link is required";
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
    return (e) => {
      e.preventDefault();
      if (!validateStep(step)) {
        console.log(`Step ${step} validation failed:`, errors);
        return;
      }
      
      console.log(`STEP ${step} DATA:`, formData);
      saveAndComplete(step);
      
      if (step < 5) {
        setActive(step + 1);
      } else {
        handleFinalSubmit();
      }
    };
  };

  const handleFinalSubmit = () => {
    console.log("FINAL DATA:", formData);
    localStorage.removeItem("uploadContent");
    localStorage.removeItem("uploadContentCompleted");
    setFormData(initialFormState);
    setCompleted({ 1: false, 2: false, 3: false, 4: false, 5: false });
    setActive(1);
    alert("Content uploaded successfully ✅");
  };

  const goBack = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  return (
    <div className="flex w-fix gap-10">
      {/* Steps Navigation */}
      <div className="w-[20%] px-6 rounded-lg h-auto shadow-md flex flex-col gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`relative flex items-center ${
              isAllowed(step.id) ? "cursor-pointer" : "cursor-not-allowed opacity-60"
            } border-2 z-10 ${
              completed[step.id]
                ? "text-green-500 bg-green-200 border-none py-2"
                : active === step.id
                ? "bg-gray-700 text-white"
                : "group hover:bg-gray-700 hover:text-white"
            } p-2 rounded-lg`}
            onClick={() => handleClick(step.id)}
          >
            {/* Left Circle */}
            <div
              className={`w-13 h-13 left-[-15px] absolute flex justify-center items-center rounded-full font-bold mr-3 ${
                completed[step.id]
                  ? "bg-green-200 text-green-600 border-2 border-green-500"
                  : "bg-yellow-400 text-white"
              }`}
            >
              {completed[step.id] ? "✓" : step.id}
            </div>

            {/* Text */}
            <div className="text-lg ml-18">{step.label}</div>

            {/* Arrow */}
            <div
              className={`w-8 h-8 border-t-2 border-r-2 border-black right-[-25px] absolute flex justify-center items-center rotate-45 mr-3 ${
                completed[step.id]
                  ? "bg-green-200 border-none py-2"
                  : active === step.id
                  ? "bg-gray-700"
                  : "group-hover:bg-gray-700 bg-white"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="w-[50%]">
        {active === 1 && (
          <StepOne
            data={formData}
            onChange={handleChange}
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
          />
        )}
      </div>

      {/* Note Card */}
      <div className="w-[25%] rounded-xl border h-30 border-gray-200 bg-gradient-to-r from-[#b7c3ee] to-[#f0d9da] p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow">
            <LightBulbIcon className="h-5 w-5 text-gray-700" />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold">Note</span>
            <br />
            Since our customers buy licence for each song, we suggest you to set an
            affordable price
          </p>
        </div>
      </div>
    </div>
  );
}

function StepOne({ data, onChange, onSubmit, errors }) {
  return (
    <form onSubmit={onSubmit} className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h2 className="text-lg font-semibold">Content Information</h2>

        <Input
          id="copyright"
          label="Copyright Owner Name *"
          placeholder="Enter Name"
          value={data.copyright}
          onChange={onChange}
          error={errors.copyright}
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

        <button
          className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function StepTwo({ data, onChange, onSubmit, errors, goBack }) {
  return (
    <form onSubmit={onSubmit} className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h2 className="text-lg font-semibold">Content Links</h2>

        {["instagram", "youtube", "twitter", "facebook", "linkedin", "people", "snapchat", "other"].map((field) => (
          <Input
            key={field}
            id={field}
            label={`${field.charAt(0).toUpperCase() + field.slice(1)} Link`}
            placeholder="Enter link"
            value={data[field]}
            onChange={onChange}
          />
        ))}

        {errors._links && <p className="text-red-500 text-sm">{errors._links}</p>}

        <div className="flex gap-8">
          <button
            type="button"
            onClick={goBack}
            className="w-full bg-gray-100 text-black py-3 rounded-md font-medium hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
function StepThree({ data, onRadioChange, onSubmit, goBack }) {
  const [subStep, setSubStep] = useState(1);

  const next = () => setSubStep((s) => Math.min(s + 1, 4)); 
  const back = () => setSubStep((s) => Math.max(s - 1, 1));

  const RadioCard = ({ label, checked, onChange, edit }) => (
    <label
      className={`border rounded-md p-4 flex items-center justify-between cursor-pointer
      ${checked ? "border-black" : "border-gray-300"}`}
    >
      <div className="flex items-center gap-3">
        <input type="radio" checked={checked} onChange={onChange} />
        <span>{label}</span>
      </div>
      {edit && <span className="text-blue-500">✎</span>}
    </label>
  );

  return (
    <form
      onSubmit={subStep === 4 ? onSubmit : (e) => e.preventDefault()}
      className="min-h-screen flex justify-between bg-gray-50 p-4 flex-col"
    >
      <div className="bg-white border rounded-lg p-6 space-y-6">

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
                className="border rounded-md p-4 w-full text-left"
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

        {/* ===== STEP 4 (EXPIRY) - SHOULD ALWAYS SHOW ===== */}
        {subStep === 4 && (
          <>
            <p className="font-medium">Expiry</p>

            <div className="space-y-3">
              <RadioCard
                label="Expiry"
                checked={data.expiryType === "expiry"}
                onChange={() =>
                  onRadioChange("expiryType", "expiry")
                }
              />

              <RadioCard
                label="Non Expiry"
                checked={data.expiryType === "non-expiry"}
                onChange={() =>
                  onRadioChange("expiryType", "non-expiry")
                }
              />

              <button
                type="button"
                className="border rounded-md p-4 w-full text-left"
              >
                + Add an option if needed
              </button>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex gap-8">
        <button
          type="button"
          onClick={subStep === 1 ? goBack : back}
          className="w-full bg-gray-100 py-3 rounded-md"
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
          className="w-full bg-black text-white py-3 rounded-md"
        >
          {subStep === 4 ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
}

function StepFour({ data, onRadioChange, onSubmit, errors, goBack }) {
  return (
    <form onSubmit={onSubmit} className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full bg-white border border-gray-200 rounded-lg p-6 space-y-5">
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

        <div className="flex gap-8">
          <button
            type="button"
            onClick={goBack}
            className="w-full bg-gray-100 text-black py-3 rounded-md font-medium hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

function StepFive({ data, onChange, onSubmit, errors, goBack }) {
  return (
    <form onSubmit={onSubmit} className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h2 className="text-lg font-semibold">Agreement</h2>
        <hr className="border-t border-gray-300" />

        <div className="w-full px-5 py-3">
          <p className="text-lg mb-5 text-gray-700 leading-relaxed">Annexture *</p>
          <textarea
            id="annexture"
            value={data.annexture}
            onChange={onChange}
            className={`h-[150px] rounded-3xl w-full border p-5 bg-white ${
              errors.annexture ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter annexture details..."
          ></textarea>
          {errors.annexture && <p className="text-red-500 text-xs">{errors.annexture}</p>}
        </div>

        <div className="w-full px-5 py-3">
          <p className="text-lg mb-5 text-gray-700 leading-relaxed">Agreement *</p>
          <textarea
            id="agreement"
            value={data.agreement}
            onChange={onChange}
            className={`h-[150px] rounded-3xl w-full border p-5 bg-white ${
              errors.agreement ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter agreement details..."
          ></textarea>
          {errors.agreement && <p className="text-red-500 text-xs">{errors.agreement}</p>}
        </div>

        <div className="flex gap-8">
          <button
            type="button"
            onClick={goBack}
            className="w-full bg-gray-100 text-black py-3 rounded-md font-medium hover:bg-gray-200 transition"
          >
            Back
          </button>
          <button
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
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
        className={`border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black ${
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




function RadioCard({ label, checked, onChange, rightIcon }) {
  return (
    <label
      className={`border rounded-md p-4 flex items-center justify-between cursor-pointer
        ${checked ? "border-black" : "border-gray-300"}`}
    >
      <div className="flex items-center gap-3">
        <input type="radio" checked={checked} onChange={onChange} />
        <span>{label}</span>
      </div>
      {rightIcon && <span className="text-blue-500">✎</span>}
    </label>
  );
}

