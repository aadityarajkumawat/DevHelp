import { useEffect } from "react";

export const onFieldChange = (e, fn) => {
  let val = e.target.value;
  let name = e.target.name;

  fn((prev) => ({ ...prev, [name]: val }));
};

export const saveProfileBtn = (fn, vals) => {
  fn(vals);
};

export const addProfile = (e, fn) => {
  const fd = new FormData();
  fd.append("profile", e.target.files[0]);
  fn(fd);
};

export const useLoadProfile = (fn) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line
  }, []);
};

export const useSetProfileInSettings = (p, fn) => {
  useEffect(() => {
    if (p.profile) {
      fn((prev) => ({
        ...prev,
        bio: p.profile.bio,
        country: p.profile.country,
      }));
    }
  }, [p]);
};

export const useShowToastOnSuccessfulUpdating = (p, cls, cln, tst) => {
  useEffect(() => {
    if (p.editProfileRes) {
      tst({
        position: "bottom-left",
        title: "Profile Updated!",
        description: "Your profile has been successfully updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      cls();
      cln();
    }
  }, [p.editProfileRes]);
};
