import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Input from "../../Component/Input";
import Img from "../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import { updateAccount } from "../../../src/api/auth";
import { clearSession, getCurrentUser, updateCurrentUser } from "../../../src/utils/session";

export default function OwnerAccountSettings() {
  const navigate = useNavigate();

  const currentUser = useMemo(() => getCurrentUser(), []);

  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [profilePic, setProfilePic] = useState(currentUser?.profilePicture || null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    clearSession();
    window.location.href = "/";
  };

  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfilePic(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const validateAndSave = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setErrors({ fullName: "", email: "", password: "" });

    if (!currentUser?.id) {
      setStatus({ type: "error", message: "Please log in again." });
      return;
    }

    const nextFullName = fullName.trim();
    const nextEmail = email.trim();

    let hasError = false;
    if (!nextFullName) {
      hasError = true;
      setErrors((p) => ({ ...p, fullName: "Full name is required." }));
    }

    if (!nextEmail) {
      hasError = true;
      setErrors((p) => ({ ...p, email: "Email is required." }));
    }

    const wantsPasswordChange = oldPassword || newPassword || confirmPassword;
    if (wantsPasswordChange) {
      if (!oldPassword || !newPassword || !confirmPassword) {
        hasError = true;
        setErrors((p) => ({
          ...p,
          password: "Fill old/new/confirm password to change it.",
        }));
      } else if (newPassword.length < 8) {
        hasError = true;
        setErrors((p) => ({
          ...p,
          password: "New password must be at least 8 characters.",
        }));
      } else if (newPassword !== confirmPassword) {
        hasError = true;
        setErrors((p) => ({ ...p, password: "Passwords do not match." }));
      }
    }

    if (hasError) return;

    try {
      setSaving(true);

      const payload = {
        fullName: nextFullName,
        email: nextEmail,
      };

      if (profilePic) {
        payload.profilePicture = profilePic;
      }

      if (wantsPasswordChange) {
        payload.oldPassword = oldPassword;
        payload.newPassword = newPassword;
      }

      const response = await updateAccount(currentUser.id, payload);
      const user = response.user || {};

      updateCurrentUser({
        id: user.id || currentUser.id,
        fullName: user.fullName || user.name || nextFullName,
        email: user.email || nextEmail,
        role: user.role || user.Role || currentUser.role,
        Role: user.role || user.Role || currentUser.Role,
        profilePicture: user.profilePicture || profilePic || null,
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setStatus({ type: "success", message: "Account updated successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to update account." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none font-sans">
      <div className="lg:hidden flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white"
          aria-label="Back"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-900" />
        </button>

        <h1 className="text-base font-semibold text-gray-900">Account settings</h1>

        <div className="h-10 w-10" />
      </div>

      <form
        onSubmit={validateAndSave}
        className="w-full rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-5 mb-8">
          <img
            src={profilePic || Img}
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover border border-gray-200"
          />

          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Profile photo</p>
            <p className="text-xs text-gray-500">Recommended image size is less than 12MB</p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="inline-flex min-w-40 max-w-xl cursor-pointer items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-95">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickImage}
                />
              </label>

              {profilePic && (
                <button
                  type="button"
                  onClick={() => setProfilePic(null)}
                  className="inline-flex items-center justify-center rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {status.message && (
          <div
            className={`mb-6 rounded-xl px-4 py-3 text-sm font-medium ${
              status.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Input
            id="owner-full-name"
            label="Full name"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
          />
          <Input
            id="owner-email"
            label="Email address"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">Change password</h3>
        </div>

        {errors.password && <p className="mb-4 text-sm font-medium text-red-600">{errors.password}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Input
            id="owner-old-password"
            label="Old password"
            placeholder="Enter old password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            id="owner-new-password"
            label="New password"
            placeholder="Enter new password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            id="owner-confirm-password"
            label="Confirm password"
            placeholder="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="submit"
            disabled={saving}
            className="w-full max-w-2xl sm:w-auto sm:flex-1 rounded-xl bg-gradient-to-r from-[#FFD43B] to-[#E6AF2E] py-3 text-sm  md:text-xl font-semibold text-black shadow-sm hover:opacity-95"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full max-w-2xl sm:w-auto sm:flex-1 rounded-xl bg-gradient-to-r from-red-600/85 to-red-700/75 py-3 text-sm  md:text-xl font-semibold text-black shadow-sm hover:opacity-95"
          >
            Log out
          </button>
        </div>
      </form>
    </div>
  );
}
