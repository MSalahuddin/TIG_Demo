
import React, { useEffect } from "react";
import ImagePicker from 'react-native-image-picker';

const CameraInput = ({ onSubmit, isOpen = true, close, options = { mediaType: 'photo' }, isCamera = true, isGallery = false }) => {
  const selectCallback = async (data) => {
    try {
      onSubmit([{ name: data?.fileName || data?.origURL, ...data }])
    } catch (e) {
      return console.log(e)
    } finally {
      close()
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (isCamera) return ImagePicker.launchCamera(options, selectCallback)
    if (isGallery) return ImagePicker.launchImageLibrary(options, selectCallback)
  }, [isOpen])
  return <></>
}
export default CameraInput