import React, { useState } from "react";
import { connect } from "react-redux";
import {
  uploadProfilePhoto,
  loadProfile,
  toggleBackdrop,
  editProfile,
  cleanProfile,
} from "../../../actions/profileAction";
import * as S from "@chakra-ui/react";
import isEmpty from "../../../utils/isEmpty";
import {
  onFieldChange,
  saveProfileBtn,
  addProfile,
  useLoadProfile,
  useSetProfileInSettings,
  useShowToastOnSuccessfulUpdating,
} from "./profile-functions";

const Profile = ({
  profile,
  uploadProfilePhoto,
  loadProfile,
  editProfile,
  cleanProfile,
}) => {
  const { isOpen, onOpen, onClose } = S.useDisclosure();
  const toast = S.useToast();
  const [profileValues, setProfileValues] = useState({
    country: "",
    bio: "",
  });

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  useLoadProfile(loadProfile);
  useSetProfileInSettings(profile, setProfileValues);
  useShowToastOnSuccessfulUpdating(profile, onClose, cleanProfile, toast);

  return (
    <React.Fragment>
      <S.Flex py="2rem">
        <S.Flex>
          <S.Image
            src={profile.profile && `${profile.profile.image}`}
            fallbackSrc="https://i.ibb.co/RBT25fY/default-fallback-image.png"
            style={{ width: "150px", height: "150px", borderRadius: "100%" }}
            alt="user"
          />
        </S.Flex>
        <S.Flex mx="3rem" flexDir="column" py="2rem">
          <S.Flex>
            <S.Text>
              {profile.profile.user ? (
                <strong>
                  <S.Text>{profile.profile.user.name}</S.Text>
                </strong>
              ) : (
                <S.Skeleton height="20px" w="220px" my="5px"></S.Skeleton>
              )}
            </S.Text>
          </S.Flex>
          <S.Flex flexDir="column">
            <S.Text>
              {!isEmpty(profile.profile) ? (
                profile.profile.bio
              ) : (
                <S.Skeleton height="20px" w="180px" mb="5px"></S.Skeleton>
              )}
            </S.Text>
            <S.Text>
              {!isEmpty(profile.profile) ? (
                profile.profile.country
              ) : (
                <S.Skeleton height="20px" w="180px"></S.Skeleton>
              )}
            </S.Text>
          </S.Flex>
          <S.Flex>
            <S.Button
              h="30px"
              onClick={onOpen}
              my="5px"
              fontWeight="normal"
              colorScheme="blackAlpha"
            >
              Edit Profile
            </S.Button>
          </S.Flex>
        </S.Flex>
        <S.Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <S.ModalOverlay />
          <S.ModalContent>
            <S.ModalHeader>Edit Profile</S.ModalHeader>
            <S.ModalCloseButton />
            <S.ModalBody pb={6}>
              <S.FormControl>
                <S.Image
                  src={profile.profile && `${profile.profile.image}`}
                  fallbackSrc="https://i.ibb.co/RBT25fY/default-fallback-image.png"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "100%",
                  }}
                  mb="5px"
                  alt="user"
                />
                <S.FormLabel>Profile Image</S.FormLabel>
                <S.Input
                  ref={initialRef}
                  type="file"
                  style={{ height: "100%" }}
                  onChange={(e) => addProfile(e, uploadProfilePhoto)}
                />
              </S.FormControl>
              <S.FormControl>
                <S.FormLabel>Bio</S.FormLabel>
                <S.Input
                  ref={initialRef}
                  placeholder="Bio"
                  onChange={(e) => onFieldChange(e, setProfileValues)}
                  name="bio"
                  value={profileValues.bio}
                />
              </S.FormControl>

              <S.FormControl mt={4}>
                <S.FormLabel>Country</S.FormLabel>
                <S.Input
                  placeholder="Country"
                  onChange={(e) => onFieldChange(e, setProfileValues)}
                  name="country"
                  value={profileValues.country}
                />
              </S.FormControl>
            </S.ModalBody>

            <S.ModalFooter>
              <S.Button
                colorScheme="blue"
                mr={3}
                onClick={() => saveProfileBtn(editProfile, profileValues)}
              >
                Save
              </S.Button>
              <S.Button onClick={onClose}>Cancel</S.Button>
            </S.ModalFooter>
          </S.ModalContent>
        </S.Modal>
      </S.Flex>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  uploadProfilePhoto,
  loadProfile,
  toggleBackdrop,
  editProfile,
  cleanProfile,
})(Profile);
