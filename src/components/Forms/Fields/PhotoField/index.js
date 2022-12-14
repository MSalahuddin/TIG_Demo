import { defaultTypeResolver } from 'graphql';
import { useIsOpen } from 'hooks/useIsOpen';

import React from 'react';
import ButtonField from "../ButtonField";
import CameraInput from '../CameraInput';
import Gallery from '../GalleryInput/Gallery';

const defaultCopy = { label: "Please select a photo", btn: "Add from Phone" };
const PhotoField = ({ Component = ButtonField, copy = defaultCopy, value, setValue, isCamera = false, isGallery = true, ...props }) => {
    const { isOpen, close, open } = useIsOpen();

    const handleDelete = (img) => {
        let photos = value.slice().filter(p => p.uri !== img.uri);
        setValue(photos)
    };

    const handleSetValue = (val) => {
        try {
            if (!val?.[0]?.didCancel) return setValue([...(value || []), ...val])
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Component
                copy={copy}
                onPress={open}
                clearAll={false}
                value={!!value?.length && <Gallery values={value} onDelete={handleDelete} />}
                {...props}
            />
            <CameraInput
                onSubmit={handleSetValue}
                isGallery={isGallery}
                isCamera={isCamera}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default PhotoField;
