import Button from "../../../Component/Button";
import Input from "../../../Component/Input";
import Img from "../../../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";

export default function UserInfo() {
  return (
    <div className="w-full bg-white rounded-xl shadow my-4 p-4 sm:p-6 md:p-8">

      {/* Profile Section */}
      <div className="flex  items-center sm:items-center gap-6 mb-8  sm:text-left">
        <img
          src={Img}
          alt="profile"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
        />

        <div>
          <h3 className="font-bold">Profile Picture</h3>
          <p className="text-xs text-gray-500 mb-1">
            Recommended memory size is less than 12MB
          </p>
          <Button
            text="Upload"
            bg="bg-black md:w-full px-10 sm:px-10 py-1"
            textColor="text-white"
            textSize="text-base sm:text-lg font-bold"
            rounded="rounded-sm shadow-black shadow-sm"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Input label="Enter Full Name" placeholder="Enter Full Name" />
        <Input label="Enter Email Address" placeholder="Enter Email Address" />
      </div>

      
      <h3 className="text-lg sm:text-xl font-semibold mb-4">
        Change Password
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Input
          label="Enter Old Password"
          placeholder="Enter Old Password"
          type="password"
        />
        <Input
          label="Enter New Password"
          placeholder="Enter New Password"
          type="password"
        />
        <Input
          label="Enter Confirm Password"
          placeholder="Enter Confirm Password"
          type="password"
        />
      </div>

      <h3 className="text-lg sm:text-xl font-semibold mb-4">Bank Account</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Enter Account Number"
          placeholder="Enter Account Number"
        />
        <Input
          label="Confirm Account Number"
          placeholder="Confirm Account Number"
        />
        <Input label="IFSC Code" placeholder="Enter IFSC Number" />
      </div>
    </div>
  );
}
