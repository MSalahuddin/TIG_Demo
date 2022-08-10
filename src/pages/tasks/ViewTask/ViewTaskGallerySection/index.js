import GalleryInput from "components/Forms/Fields/GalleryInput";
import React from "react";
import ViewTaskSection from "../ViewTaskSection";


const ViewTaskGallerySection = ({ files, theme }) => {
    if (!files) return null;
    return (
        <ViewTaskSection  styles={{content: {mx: 0}, container: {my: 0}}} label={"Files"} display={files?.length} theme={theme} divider>
            <GalleryInput
                value={files.map(f => ({
                    uri: f.url,
                    type: f.fileType,
                }))}
                readOnly
            />
        </ViewTaskSection>
    )
};

export default ViewTaskGallerySection;