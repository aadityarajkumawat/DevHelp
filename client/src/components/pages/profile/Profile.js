import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  uploadProfilePhoto,
  loadProfile,
  toggleBackdrop,
  editProfile,
  cleanProfile,
} from "../../../actions/profileAction";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import isEmpty from "../../../utils/isEmpty";

const Profile = ({
  profile,
  uploadProfilePhoto,
  loadProfile,
  editProfile,
  cleanProfile,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [profileValues, setProfileValues] = useState({
    country: "",
    bio: "",
  });

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (profile.profile) {
      setProfileValues((prev) => ({
        ...prev,
        bio: profile.profile.bio,
        country: profile.profile.country,
      }));
    }
  }, [profile]);

  useEffect(() => {
    if (profile.editProfileRes) {
      toast({
        position: "bottom-left",
        title: "Profile Updated!",
        description: "Your profile has been successfully updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      cleanProfile();
    }
  }, [profile.editProfileRes]);

  const addProfile = (e) => {
    const fd = new FormData();
    fd.append("profile", e.target.files[0]);
    uploadProfilePhoto(fd);
  };

  const onFieldChange = (e) => {
    let val = e.target.value;
    let name = e.target.name;

    setProfileValues((prev) => ({ ...prev, [name]: val }));
  };

  const saveProfileBtn = () => {
    editProfile(profileValues);
  };

  return (
    <React.Fragment>
      <Flex py="2rem">
        <Flex>
          <Image
            src={profile.profile && `${profile.profile.image}`}
            fallbackSrc="https://i.ibb.co/RBT25fY/default-fallback-image.png"
            style={{ width: "150px", height: "150px", borderRadius: "100%" }}
            alt="user"
          />
        </Flex>
        <Flex mx="3rem" flexDir="column" py="2rem">
          <Flex>
            <Text>
              {profile.profile.user ? (
                <strong>
                  <Text>{profile.profile.user.name}</Text>
                </strong>
              ) : (
                <Skeleton height="20px" w="220px" my="5px"></Skeleton>
              )}
            </Text>
          </Flex>
          <Flex flexDir="column">
            <Text>
              {!isEmpty(profile.profile) ? (
                profile.profile.bio
              ) : (
                <Skeleton height="20px" w="180px" mb="5px"></Skeleton>
              )}
            </Text>
            <Text>
              {!isEmpty(profile.profile) ? (
                profile.profile.country
              ) : (
                <Skeleton height="20px" w="180px"></Skeleton>
              )}
            </Text>
          </Flex>
          <Flex>
            <Button
              h="30px"
              onClick={onOpen}
              my="5px"
              fontWeight="normal"
              colorScheme="blackAlpha"
            >
              Edit Profile
            </Button>
          </Flex>
        </Flex>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Image
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
                <FormLabel>Profile Image</FormLabel>
                <Input
                  ref={initialRef}
                  type="file"
                  style={{ height: "100%" }}
                  onChange={addProfile}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Bio"
                  onChange={onFieldChange}
                  name="bio"
                  value={profileValues.bio}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Country</FormLabel>
                <Input
                  placeholder="Country"
                  onChange={onFieldChange}
                  name="country"
                  value={profileValues.country}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveProfileBtn}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
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
