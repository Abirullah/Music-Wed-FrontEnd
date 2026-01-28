import Button from "../../Component/Button";
import Input from "../../Component/Input";

export default function OwnerPrivacyAndContent() {
  return (
    <div className="space-y-8">
      {/* Privacy Settings */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6">Privacy Settings</h2>

        <div className="space-y-6">
          {/* Profile Visibility */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div>
              <h3 className="font-medium text-lg">Profile Visibility</h3>
              <p className="text-sm text-gray-500">
                Make your profile visible to other users
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* Show Earnings */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div>
              <h3 className="font-medium text-lg">Show Earnings</h3>
              <p className="text-sm text-gray-500">
                Display your total earnings publicly
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5 cursor-pointer" />
          </div>

          {/* Show Upload Count */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div>
              <h3 className="font-medium text-lg">Show Upload Count</h3>
              <p className="text-sm text-gray-500">
                Display your upload count publicly
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Content Policies */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6">Content Policies</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Guidelines
            </label>
            <textarea
              defaultValue="I agree that all content I upload is original and does not infringe on any copyrights or intellectual property rights."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Terms & Conditions
            </label>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 mt-1 cursor-pointer"
              />
              <p className="text-sm text-gray-600">
                I agree to the Terms & Conditions and understand that any
                violation may result in account suspension.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Input
            label="Email Address"
            placeholder="Enter email for notifications"
            type="email"
          />
          <Input
            label="Phone Number"
            placeholder="Enter phone for support"
            type="tel"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Support Email"
            placeholder="Enter support email"
            type="email"
          />
          <Input
            label="Business Website"
            placeholder="Enter your website URL"
            type="url"
          />
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex gap-4">
        <Button
          text="Save Changes"
          bg="bg-black px-20 py-3"
          textColor="text-white"
          textSize="text-lg font-bold"
          rounded="rounded-lg"
        />
        <Button
          text="Cancel"
          bg="bg-gray-200 px-20 py-3"
          textColor="text-black"
          textSize="text-lg font-bold"
          rounded="rounded-lg"
        />
      </div>
    </div>
  );
}
