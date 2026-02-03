import { useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import Input from "../../../Component/Input";


export default function SongForm() {
  const [active, setActive] = useState(1);
  const initialFormState = {
    copyright: "",
    musicLink: "",
    cover: "",
    musicName: "",
    artistName: "",
    releaseDate: "",
    language: "",
    genre: "",
    mood: "",
    shopify: "",
    youtube: "",
    songLink: "",
    amazon: "",
    jio: "",
    wynk: "",
    apple: "",
    other: "",
    agreement1: "",
    agreement2: "",
  };

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("uploadedSong");
    return saved ? { ...initialFormState, ...JSON.parse(saved) } : initialFormState;
  });
  const [errors, setErrors] = useState({});

  const [completed, setCompleted] = useState(() => ({ 1: false, 2: false, 5: false, ...(JSON.parse(localStorage.getItem("uploadCompleted") || "{}")) }));

  const isAllowed = (id) => {
    if (id === 1) return true;
    if (id === 2) return completed[1];
    if (id === 5) return completed[2];
    return false;
  }

  const handleClick = (id) => {
    if (!isAllowed(id)) return;
    setActive(id);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((s) => ({ ...s, [id]: value }));
    setErrors((err) => ({ ...err, [id]: "" }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.copyright) newErrors.copyright = "Required";
      if (!formData.musicLink) newErrors.musicLink = "Required";
      if (!formData.cover) newErrors.cover = "Required";
      if (!formData.musicName) newErrors.musicName = "Required";
      if (!formData.artistName) newErrors.artistName = "Required";
      if (!formData.releaseDate) newErrors.releaseDate = "Required";
  
      if (!formData.language) newErrors.language = "Required";
      if (!formData.genre) newErrors.genre = "Required";
      if (!formData.mood) newErrors.mood = "Required";
    }
    if (step === 2) {
      const links = [formData.shopify, formData.youtube, formData.songLink, formData.amazon, formData.jio, formData.wynk, formData.apple, formData.other];
      if (!links.some(Boolean)) newErrors._links = "At least one link is required";
    }
    if (step === 5) {
      if (!formData.agreement1) newErrors.agreement1 = "Required";
      if (!formData.agreement2) newErrors.agreement2 = "Required";
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
    // clear saved draft and completed state so the form is ready for a new upload
    localStorage.removeItem("uploadedSong");
    localStorage.removeItem("uploadCompleted");
    setFormData(initialFormState);
    setCompleted({ 1: false, 2: false, 5: false });
    setActive(1);
    alert("Song uploaded successfully ✅");
  };

  const handleSubmitStep = (step) => (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    saveAndComplete(step);
    if (step === 1) setActive(2);
    if (step === 2) setActive(5);
    if (step === 5) handleFinalSubmit();
  };

  return (
    <div className="flex w-fix  gap-10">
    <div className="w-[20%] px-6 rounded-lg h-auto shadow-md flex flex-col gap-8">
        <div
          className={`relative flex items-center ${isAllowed(1) ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'} border-2 z-10 ${completed[1] ? ' text-green-500 bg-green-200 border-none py-2' : active === 1 ? 'bg-gray-700 text-white' : 'group hover:bg-gray-700 hover:text-white'} p-2 rounded-lg`}
          onClick={() => handleClick(1)}
        >
          <div className={`w-13 h-13 left-[-15px] absolute  flex justify-center items-center rounded-full font-bold mr-3 ${completed[1] ? 'bg-green-200 text-green-600 border-2 border-green-500' : 'bg-yellow-400 text-white'}`}>
            {completed[1] ? '✓' : '1'}
          </div>
          <div className="text-lg ml-18">Song Information</div>
          <div
            className={`w-8 h-8 border-t-2 border-r-2 border-black right-[-25px] absolute flex justify-center items-center rotate-45 mr-3  ${completed[1] ? ' bg-green-200 border-none py-2' : active === 1 ? 'bg-gray-700' : 'group-hover:bg-gray-700 bg-white'}`}
          ></div>
        </div>


     <div
          className={`relative flex items-center ${isAllowed(2) ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'} border-2 z-10 ${completed[2] ? ' text-green-500 bg-green-200 border-none py-2' : active === 2 ? 'bg-gray-700 text-white' : 'group hover:bg-gray-700 hover:text-white'} p-2 rounded-lg`}
          onClick={() => handleClick(2)}
        >
          <div className={`w-13 h-13 left-[-15px] absolute  flex justify-center items-center rounded-full font-bold mr-3 ${completed[2] ? 'bg-green-200 text-green-600 border-2 border-green-500' : 'bg-yellow-400 text-white'}`}>
            {completed[2] ? '✓' : '2'}
          </div>
          <div className="text-lg ml-18">Song Link</div>
          <div
            className={`w-8 h-8 border-t-2 border-r-2 border-black right-[-25px] absolute text-white flex justify-center items-center rotate-45 mr-3  ${completed[2] ? 'bg-green-200 border-none py-2' : active === 2 ? 'bg-gray-700' : 'group-hover:bg-gray-700 bg-white'}`}
          ></div>
        </div>

      <div
          className={`relative flex items-center ${isAllowed(5) ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'} border-2 z-10 ${completed[5] ? ' text-green-500 bg-green-200 border-none py-2' : active === 5 ? 'bg-gray-700 text-white' : 'group hover:bg-gray-700 hover:text-white'} p-2 rounded-lg`}
          onClick={() => handleClick(5)}
        >
          <div className={`w-13 h-13 left-[-15px] absolute  flex justify-center items-center rounded-full font-bold mr-3 ${completed[5] ? 'bg-green-200 text-green-600 border-2 border-green-500' : 'bg-yellow-400'}`}>
            {completed[5] ? '✓' : '5'}
          </div>
          <div className="text-lg ml-18">Agreement</div>
          <div
            className={`w-8 h-8 border-t-2 border-r-2 border-black right-[-25px] absolute text-white flex justify-center items-center rotate-45 mr-3  ${completed[5] ? ' bg-green-200 border-none py-2' : active === 5 ? 'bg-gray-700' : 'group-hover:bg-gray-700 bg-white'}`}
          ></div>
        </div>
    </div>
  
    {active === 1 && (
  <StepOne
    data={formData}
    onChange={handleChange}
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
    />
  )}

    {active === 5 && (
      <StepThree
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmitStep(5)}
        errors={errors}
        goBack={() => setActive(2)}
      />
    )}


 <div className="w-[25%] rounded-xl border h-30 border-gray-200 bg-gradient-to-r from-[#b7c3ee] to-[#f0d9da] p-4 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow">
          <LightBulbIcon className="h-5 w-5 text-gray-700" />
        </div>

        {/* Text */}
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
    <form onSubmit={onSubmit} className="min-h-screen  w-[50%] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full  bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h2 className="text-lg font-semibold">Song Information</h2>

        <Input id="copyright" label="Copyright Owner Name *" placeholder="Enter Name" value={data.copyright} onChange={onChange} error={errors.copyright} />

        <Input id="musicLink" label="Upload Music *" placeholder="Enter link from platform (Ex: Spotify, YouTube, iMusic, etc.)" value={data.musicLink} onChange={onChange} error={errors.musicLink} />

        <Input id="cover" label="Upload Cover Template *" placeholder="Enter link from platform (Ex: Spotify, YouTube, iMusic, etc.)" value={data.cover} onChange={onChange} error={errors.cover} />

        <Input id="musicName" label="Music Name *" placeholder="Enter music name" value={data.musicName} onChange={onChange} error={errors.musicName} />

        <Input id="artistName" label="Artist Name *" placeholder="Enter artist name" value={data.artistName} onChange={onChange} error={errors.artistName} />

        <Input id="releaseDate" type="month" label="Month & Year of copyrightRelease *" value={data.releaseDate} onChange={onChange} error={errors.releaseDate} />

        <Select label="Language *" id="language" value={data.language} onChange={onChange} options={["English", "Spanish", "French"]} error={errors.language} />

        <Select label="Select Genre *" id="genre" value={data.genre} onChange={onChange} options={["Pop", "Hip Hop", "Rock", "Electronic"]} error={errors.genre} />

        <Select label="Enter Mood *" id="mood" value={data.mood} onChange={onChange} options={["Happy", "Sad", "Chill", "Energetic"]} error={errors.mood} />

        <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition" type="submit">
          Submit
        </button>
      </div>
    </form>
  );}
function StepTwo({ data, onChange, onSubmit, errors }) {
  return (
    <form onSubmit={onSubmit} className="min-h-screen  w-[50%] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full  justify-center bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h2 className="text-lg font-semibold">Song Link</h2>

        <Input id="shopify" label="Shopify Link" placeholder="Enter Link" value={data.shopify} onChange={onChange} />

        <Input id="youtube" label="YouTube Link" placeholder="Enter link " value={data.youtube} onChange={onChange} />

        <Input id="songLink" label="Song Link" placeholder="Enter link" value={data.songLink} onChange={onChange} />

        <Input id="amazon" label="Amazon Music Link" placeholder="Enter Link" value={data.amazon} onChange={onChange} />

        <Input id="jio" label="JioSaavn Link" placeholder="Enter Link" value={data.jio} onChange={onChange} />

        <Input id="wynk" label="Wynk Music Link" placeholder="Enter Link" value={data.wynk} onChange={onChange} />

        <Input id="apple" label="Apple Music Link" placeholder="Enter Link" value={data.apple} onChange={onChange} />
        <Input id="other" label="Other Link" placeholder="Enter Link" value={data.other} onChange={onChange} />

        {errors._links && <p className="text-red-500">{errors._links}</p>}

        <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
function StepThree({ data, onChange, onSubmit, errors, goBack }) {
  return (
    <form onSubmit={onSubmit} className="min-h-screen  w-[50%] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full  justify-center bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h2 className="text-lg font-semibold">Agreement</h2>
        <br className="border-2 border-gray-400" />

        <div className="w-full px-5 py-3 ">
          <p className="text-lg mb-5 text-gray-700 leading-relaxed ">Annexture</p>
          <textarea id="agreement1" value={data.agreement1} onChange={onChange} className={`h-[20%] rounded-3xl w-full border p-5 bg-white ${errors.agreement1 ? 'border-red-500' : 'border-gray-300'}`}></textarea>
          {errors.agreement1 && <p className="text-red-500 text-xs">{errors.agreement1}</p>}
        </div>

       <div className="w-full px-5 py-3 ">
          <p className="text-lg mb-5 text-gray-700 leading-relaxed ">Agreement</p>
          <textarea id="agreement2" value={data.agreement2} onChange={onChange} className={`h-full rounded-3xl w-full border p-5 bg-white ${errors.agreement2 ? 'border-red-500' : 'border-gray-300'}`}></textarea>
          {errors.agreement2 && <p className="text-red-500 text-xs">{errors.agreement2}</p>}
        </div>

        <div className="flex gap-8">
          <button type="button" onClick={goBack} className="w-full bg-gray-100 text-black py-3 rounded-md font-medium hover:bg-gray-200 transition">
          Back
        </button>
        <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition" type="submit">
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
      <select id={id} value={value} onChange={onChange} className={`border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : 'border-gray-300'}`}>
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


  
