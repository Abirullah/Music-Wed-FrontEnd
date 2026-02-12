import { useMemo, useState } from "react";
import Button from "../../../Component/Button";
import Input from "../../../Component/Input";
import Img from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import { updateAccount } from "../../../../src/api/auth";
import { getCurrentUser, updateCurrentUser } from "../../../../src/utils/session";

export default function UserInfo() {
  const currentUser = useMemo(() => getCurrentUser(), []);

  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [profilePicture, setProfilePicture] = useState(currentUser?.profilePicture || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfilePicture(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const saveChanges = async () => {
    if (!currentUser?.id) {
      setStatus("Please login first.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setStatus("New password and confirm password do not match.");
      return;
    }

    try {
      setSaving(true);
      setStatus("");

      const payload = {
        fullName,
        email,
      };

      if (profilePicture) {
        payload.profilePicture = profilePicture;
      }

      if (newPassword) {
        payload.oldPassword = oldPassword;
        payload.newPassword = newPassword;
      }

      const response = await updateAccount(currentUser.id, payload);
      const user = response.user || {};

      updateCurrentUser({
        id: user.id || currentUser.id,
        fullName: user.fullName || user.name || fullName,
        email: user.email || email,
        role: user.role || user.Role || currentUser.role,
        Role: user.role || user.Role || currentUser.Role,
        profilePicture: user.profilePicture || profilePicture || null,
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setStatus("Profile updated successfully.");
    } catch (error) {
      setStatus(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow my-4 p-4 sm:p-6 md:p-8">
      <div className="flex  items-center sm:items-center gap-6 mb-8  sm:text-left">
        <img
          src={profilePicture || Img}
          alt="profile"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
        />

        <div>
          <h3 className="font-bold">Profile Picture</h3>
          <p className="text-xs text-gray-500 mb-1">Recommended memory size is less than 12MB</p>
          <label className="inline-flex cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <Button
              text="Upload"
              bg="bg-black md:w-full px-10 sm:px-10 py-1"
              textColor="text-white"
              textSize="text-base sm:text-lg font-bold"
              rounded="rounded-sm shadow-black shadow-sm"
            />
          </label>
        </div>
      </div>

      {status ? <p className="mb-4 text-sm text-gray-700">{status}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Input label="Enter Full Name" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <Input label="Enter Email Address" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <h3 className="text-lg sm:text-xl font-semibold mb-4">Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Input
          label="Enter Old Password"
          placeholder="Enter Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          label="Enter New Password"
          placeholder="Enter New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          label="Enter Confirm Password"
          placeholder="Enter Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button
          text={saving ? "Saving..." : "Save Changes"}
          bg="bg-black px-8 py-2"
          textColor="text-white"
          textSize="text-base font-semibold"
          rounded="rounded-md"
          onClick={saveChanges}
        />
      </div>
    </div>
  );
}
