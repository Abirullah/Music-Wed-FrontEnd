import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import Input from "../../../Component/Input";
import StepperPills from "../Parts/StepperPills";
import MobileBottomSheet from "../Parts/MobileBottomSheet";

const initialFormState = {
  musicCategory: "Song",

  copyright: "",
  musicLink: "",
  cover: "",
  musicName: "",
  artistName: "",
  releaseDate: "",
  language: "",
  genre: "",
  mood: "",

  spotify: "",
  youtube: "",
  gaana: "",
  amazon: "",
  wynk: "",
  apple: "",
  other: "",

  pricingLicense: "",
  pricingUse: "",
  pricingPlace: "",
  seatingCapacity: "",
  priceYear: "",
  priceSixMonths: "",

  affiliateLink: "",

  agreement1: "",
  agreement2: "",
};

const steps = [
  { id: 1, label: "Song information" },
  { id: 2, label: "Song links" },
  { id: 3, label: "Pricing" },
  { id: 4, label: "Song links" },
  { id: 5, label: "Agreement" },
];

export default function UploadASong() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [noteOpen, setNoteOpen] = useState(false);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("uploadedSong");
    if (!saved) return initialFormState;
    try {
      const parsed = JSON.parse(saved);
      return {
        ...initialFormState,
        ...parsed,
        spotify: parsed.spotify ?? parsed.shopify ?? "",
        gaana: parsed.gaana ?? parsed.jio ?? "",
        other: parsed.other ?? parsed.songLink ?? "",
      };
    } catch {
      return initialFormState;
    }
  });

  const [errors, setErrors] = useState({});
  const [completed, setCompleted] = useState(() => {
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem("uploadCompleted") || "{}");
    } catch {
      saved = {};
    }
    return { 1: false, 2: false, 3: false, 4: false, 5: false, ...saved };
  });

  const isAllowed = (id) => {
    if (id === 1) return true;
    if (id === 2) return completed[1];
    if (id === 3) return completed[2];
    if (id === 4) return completed[3];
    if (id === 5) return completed[3]; // allow skipping step 4
    return false;
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

  const handleRadioChange = (name, value) => {
    setFormData((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.copyright?.trim()) newErrors.copyright = "Required";
      if (!formData.musicLink?.trim()) newErrors.musicLink = "Required";
      if (!formData.cover?.trim()) newErrors.cover = "Required";
      if (!formData.musicName?.trim()) newErrors.musicName = "Required";
      if (!formData.artistName?.trim()) newErrors.artistName = "Required";
      if (!formData.releaseDate?.trim()) newErrors.releaseDate = "Required";
      if (!formData.language?.trim()) newErrors.language = "Required";
      if (!formData.genre?.trim()) newErrors.genre = "Required";
      if (!formData.mood?.trim()) newErrors.mood = "Required";
    }

    if (step === 2) {
      const links = [
        formData.spotify,
        formData.youtube,
        formData.gaana,
        formData.amazon,
        formData.wynk,
        formData.apple,
        formData.other,
      ].map((v) => (v || "").trim());

      if (!links.some(Boolean)) newErrors._links = "At least one link is required";
    }

    if (step === 3) {
      if (!formData.pricingLicense) newErrors.pricingLicense = "Required";

      if (formData.pricingLicense === "Public places") {
        if (!formData.pricingUse) newErrors.pricingUse = "Required";
        if (!formData.pricingPlace) newErrors.pricingPlace = "Required";
        if (!formData.seatingCapacity?.trim()) newErrors.seatingCapacity = "Required";
        if (!formData.priceYear?.trim()) newErrors.priceYear = "Required";
        if (!formData.priceSixMonths?.trim()) newErrors.priceSixMonths = "Required";
      }
    }

    if (step === 5) {
      if (!formData.agreement1?.trim()) newErrors.agreement1 = "Required";
      if (!formData.agreement2?.trim()) newErrors.agreement2 = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAndComplete = (step) => {
    localStorage.setItem("uploadedSong", JSON.stringify(formData));
    const newCompleted = { ...completed, [step]: true };
    setCompleted(newCompleted);
    localStorage.setItem("uploadCompleted", JSON.stringify(newCompleted));
  };

  const handleFinalSubmit = () => {
    console.log("FINAL SONG DATA:", formData);
    localStorage.removeItem("uploadedSong");
    localStorage.removeItem("uploadCompleted");
    setFormData(initialFormState);
    setCompleted({ 1: false, 2: false, 3: false, 4: false, 5: false });
    setActive(1);
    alert("Song uploaded successfully ✅");
  };

  const handleSubmitStep = (step) => (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    saveAndComplete(step);

    if (step === 1) setActive(2);
    if (step === 2) setActive(3);
    if (step === 3) setActive(4);
    if (step === 4) setActive(5);
    if (step === 5) handleFinalSubmit();
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

        <h1 className="text-base font-semibold text-gray-900">Music upload</h1>

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

        {/* Step content */}
        <div className="w-full lg:w-[50%]">
          {active === 1 && (
            <SongInfoStep
              data={formData}
              errors={errors}
              onChange={handleChange}
              onRadioChange={handleRadioChange}
              onSubmit={handleSubmitStep(1)}
            />
          )}

          {active === 2 && (
            <SongLinksStep
              data={formData}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmitStep(2)}
            />
          )}

          {active === 3 && (
            <PricingStep
              data={formData}
              errors={errors}
              setErrors={setErrors}
              onChange={handleChange}
              onRadioChange={handleRadioChange}
              onSubmit={handleSubmitStep(3)}
              goBack={() => setActive(2)}
            />
          )}

          {active === 4 && (
            <MoreLinksStep
              data={formData}
              onChange={handleChange}
              onSubmit={handleSubmitStep(4)}
              goBack={() => setActive(3)}
            />
          )}

          {active === 5 && (
            <AgreementStep
              data={formData}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmitStep(5)}
              goBack={() => setActive(4)}
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
              Since our customers buy licence for each song, we suggest you to
              set an affordable price.
            </p>
          </div>
        </div>
      </div>

      <MobileBottomSheet open={noteOpen} title="Note" onClose={() => setNoteOpen(false)}>
        Since our customers buy licence for each song, we suggest you to set an
        affordable price.
      </MobileBottomSheet>
    </div>
  );
}

function Card({ title, children, footer }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 space-y-5 shadow-sm">
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
      {children}
      {footer}
    </div>
  );
}

function SongInfoStep({ data, onChange, onRadioChange, onSubmit, errors }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <Card
        title="Song Information"
        footer={
          <button
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
            type="submit"
          >
            Submit
          </button>
        }
      >
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Music category</p>
          <div className="flex items-center gap-6 text-sm">
            {["Song", "Instrumental"].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="musicCategory"
                  checked={data.musicCategory === value}
                  onChange={() => onRadioChange("musicCategory", value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <Input
          id="copyright"
          label="Copyright owner name *"
          placeholder="Enter name"
          value={data.copyright}
          onChange={onChange}
          error={errors.copyright}
        />

        <Input
          id="musicLink"
          label="Upload music *"
          placeholder="Enter link from platform (Ex: Spotify, YouTube, iMusic, etc.)"
          value={data.musicLink}
          onChange={onChange}
          error={errors.musicLink}
        />

        <Input
          id="cover"
          label="Upload cover template *"
          placeholder="Enter link from platform (Ex: Spotify, YouTube, iMusic, etc.)"
          value={data.cover}
          onChange={onChange}
          error={errors.cover}
        />

        <Input
          id="musicName"
          label="Music name *"
          placeholder="Enter music name"
          value={data.musicName}
          onChange={onChange}
          error={errors.musicName}
        />

        <Input
          id="artistName"
          label="Artist name *"
          placeholder="Enter artist name"
          value={data.artistName}
          onChange={onChange}
          error={errors.artistName}
        />

        <Input
          id="releaseDate"
          type="month"
          label="Month & year of release *"
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
          label="Select genre *"
          id="genre"
          value={data.genre}
          onChange={onChange}
          options={["Pop", "Hip Hop", "Rock", "Electronic", "Classical", "Jazz"]}
          error={errors.genre}
        />

        <Select
          label="Enter mood *"
          id="mood"
          value={data.mood}
          onChange={onChange}
          options={["Happy", "Sad", "Chill", "Energetic", "Romantic", "Motivational"]}
          error={errors.mood}
        />
      </Card>
    </form>
  );
}

function SongLinksStep({ data, onChange, onSubmit, errors }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <Card
        title="Song links"
        footer={
          <button
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition"
            type="submit"
          >
            Submit
          </button>
        }
      >
        <Input
          id="spotify"
          label="Spotify Link"
          placeholder="Enter link"
          value={data.spotify}
          onChange={onChange}
        />
        <Input
          id="youtube"
          label="Youtube Link"
          placeholder="Enter link"
          value={data.youtube}
          onChange={onChange}
        />
        <Input
          id="gaana"
          label="Gaana Link"
          placeholder="Enter link"
          value={data.gaana}
          onChange={onChange}
        />
        <Input
          id="amazon"
          label="Amazon Music Link"
          placeholder="Enter link"
          value={data.amazon}
          onChange={onChange}
        />
        <Input
          id="wynk"
          label="Wynk Music Link"
          placeholder="Enter link"
          value={data.wynk}
          onChange={onChange}
        />
        <Input
          id="apple"
          label="Apple Music Link"
          placeholder="Enter link"
          value={data.apple}
          onChange={onChange}
        />
        <Input
          id="other"
          label="Other Link"
          placeholder="Enter link"
          value={data.other}
          onChange={onChange}
        />

        {errors._links ? (
          <p className="text-red-500 text-sm">{errors._links}</p>
        ) : null}
      </Card>
    </form>
  );
}

function PricingStep({
  data,
  errors,
  setErrors,
  onRadioChange,
  onChange,
  onSubmit,
  goBack,
}) {
  const [subStep, setSubStep] = useState(1);

  const RadioCard = ({ label, checked, onSelect, right }) => (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full border rounded-xl p-4 flex items-center justify-between text-left transition ${
        checked ? "border-black" : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <div className="flex items-center gap-3">
        <input type="radio" checked={checked} readOnly />
        <span>{label}</span>
      </div>
      {right}
    </button>
  );

  const validateSubStep = () => {
    const nextErrors = {};

    if (subStep === 1) {
      if (!data.pricingLicense) nextErrors.pricingLicense = "Required";
    }

    if (data.pricingLicense === "Public places") {
      if (subStep === 2 && !data.pricingUse) nextErrors.pricingUse = "Required";
      if (subStep === 3 && !data.pricingPlace) nextErrors.pricingPlace = "Required";
      if (subStep === 4) {
        if (!data.seatingCapacity?.trim()) nextErrors.seatingCapacity = "Required";
        if (!data.priceYear?.trim()) nextErrors.priceYear = "Required";
        if (!data.priceSixMonths?.trim()) nextErrors.priceSixMonths = "Required";
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (!validateSubStep()) return;
    setSubStep((s) => Math.min(s + 1, 4));
  };

  const back = () => setSubStep((s) => Math.max(s - 1, 1));

  return (
    <form
      onSubmit={subStep === 4 ? onSubmit : (e) => e.preventDefault()}
      className="w-full flex flex-col gap-5"
    >
      <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pricing</h2>
          <span className="text-sm text-gray-500">Step {subStep}/4</span>
        </div>

        <div className="h-[2px] bg-gray-200">
          <div
            className="h-[2px] bg-black transition-all"
            style={{ width: `${(subStep / 4) * 100}%` }}
          />
        </div>

        {subStep === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              License for the song that you selected
            </p>

            {[
              "Public places",
              "Commercial / Business purpose",
              "Metaverse",
              "Specific / Custom licences",
            ].map((value) => (
              <RadioCard
                key={value}
                label={value}
                checked={data.pricingLicense === value}
                onSelect={() => onRadioChange("pricingLicense", value)}
              />
            ))}

            {errors.pricingLicense ? (
              <p className="text-red-500 text-sm">{errors.pricingLicense}</p>
            ) : null}
          </div>
        )}

        {subStep === 2 && (
          <div className="space-y-3">
            {data.pricingLicense === "Public places" ? (
              <>
                <p className="text-sm text-gray-600">
                  License to use music in public places as
                </p>

                {["Background", "Live performance"].map((value) => (
                  <RadioCard
                    key={value}
                    label={value}
                    checked={data.pricingUse === value}
                    onSelect={() => onRadioChange("pricingUse", value)}
                  />
                ))}

                {errors.pricingUse ? (
                  <p className="text-red-500 text-sm">{errors.pricingUse}</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-gray-600">
                Pricing flow for this license type will be available soon.
              </p>
            )}
          </div>
        )}

        {subStep === 3 && (
          <div className="space-y-3">
            {data.pricingLicense === "Public places" ? (
              <>
                <p className="text-sm text-gray-600">
                  What kind of public place(s) can your music be used at the
                  background?
                </p>

                {[
                  "Clubs, pubs & night clubs",
                  "Restaurants, dining rooms, bars, lounges, coffee houses, etc",
                  "Multiplex & shopping center, arcades, IT parks, etc",
                  "Lodges, guest houses, vacation homes, resorts, etc",
                  "Banquet halls & auditoriums, sports, service oriented premises, waiting premises, transport services",
                ].map((value) => {
                  const selected = data.pricingPlace === value;
                  return (
                    <RadioCard
                      key={value}
                      label={value}
                      checked={selected}
                      onSelect={() => onRadioChange("pricingPlace", value)}
                      right={
                        selected ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-green-100 text-green-700 text-sm font-bold">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-blue-500 text-blue-500 text-sm">
                            ✎
                          </span>
                        )
                      }
                    />
                  );
                })}

                {errors.pricingPlace ? (
                  <p className="text-red-500 text-sm">{errors.pricingPlace}</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-gray-600">
                Continue to the next step to submit pricing.
              </p>
            )}
          </div>
        )}

        {subStep === 4 && (
          <div className="space-y-5">
            {data.pricingLicense === "Public places" ? (
              <>
                <p className="text-sm text-gray-600">
                  Public places, {data.pricingUse || "Background"} —{" "}
                  {data.pricingPlace || "Select a category"}
                </p>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-4">
                  <p className="text-sm font-semibold text-gray-700">List 1</p>

                  <Input
                    id="seatingCapacity"
                    label="Seating capacity"
                    placeholder="Example: 30 seater"
                    value={data.seatingCapacity}
                    onChange={onChange}
                    error={errors.seatingCapacity}
                  />

                  <Input
                    id="priceYear"
                    label="Price of licence (1 year validity)"
                    placeholder="Enter value"
                    value={data.priceYear}
                    onChange={onChange}
                    error={errors.priceYear}
                  />

                  <Input
                    id="priceSixMonths"
                    label="Price of licence (6 months validity)"
                    placeholder="Enter value"
                    value={data.priceSixMonths}
                    onChange={onChange}
                    error={errors.priceSixMonths}
                  />

                  <button
                    type="button"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 text-sm font-medium hover:bg-gray-50"
                  >
                    + Add an option if needed
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                You can submit now to continue.
              </p>
            )}
          </div>
        )}
      </div>

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

function MoreLinksStep({ data, onChange, onSubmit, goBack }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <Card
        title="Song links"
        footer={
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
        }
      >
        <Input
          id="affiliateLink"
          label="Affiliate link (optional)"
          placeholder="Enter link"
          value={data.affiliateLink}
          onChange={onChange}
        />

        <p className="text-sm text-gray-500">
          Add any extra link you want your customers to see.
        </p>
      </Card>
    </form>
  );
}

function AgreementStep({ data, onChange, onSubmit, errors, goBack }) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <Card
        title="Agreement"
        footer={
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
        }
      >
        <div className="w-full space-y-3">
          <p className="text-sm font-medium text-gray-700">Annexture *</p>
          <textarea
            id="agreement1"
            value={data.agreement1}
            onChange={onChange}
            className={`h-[140px] rounded-2xl w-full border p-4 bg-white ${
              errors.agreement1 ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.agreement1 ? (
            <p className="text-red-500 text-xs">{errors.agreement1}</p>
          ) : null}
        </div>

        <div className="w-full space-y-3">
          <p className="text-sm font-medium text-gray-700">Agreement *</p>
          <textarea
            id="agreement2"
            value={data.agreement2}
            onChange={onChange}
            className={`h-[220px] rounded-2xl w-full border p-4 bg-white ${
              errors.agreement2 ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.agreement2 ? (
            <p className="text-red-500 text-xs">{errors.agreement2}</p>
          ) : null}
        </div>
      </Card>
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
      {error ? <p className="text-red-500 text-xs">{error}</p> : null}
    </div>
  );
}
