import React from "react";
import CustomPasswordInput from "../custom-password-input";

const ChangePasswordForm = ({ data, setData }) => {
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <form className="space-y-4 md:space-y-6">
        <CustomPasswordInput
          label="Current Password*"
          name="current_password"
          id="current_password"
          value={data.current_password}
          onchange={handleChangeInput}
        />
        <CustomPasswordInput
          label="New password*"
          name="new_password"
          id="new_password"
          value={data.new_password}
          onchange={handleChangeInput}
        />
        <CustomPasswordInput
          label="Confirm password*"
          name="confirm_password"
          id="confirm_password"
          value={data.confirm_password}
          onchange={handleChangeInput}
        />
      </form>
    </>
  );
};

export default ChangePasswordForm;
