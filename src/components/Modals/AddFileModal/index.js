import React from 'react';
import BottomHalfModal from '../../BottomHalfModal';
import { ModalOption } from '../../AttachmentModal';
import PhotoField from '../../Forms/Fields/PhotoField';
import { chain } from 'helpers/func';

const AddFileModal = ({visible, onHide, setValue}) => {
    const handleSetValue = chain([val => setValue(val), onHide])
    return (
      <BottomHalfModal visible={visible} onHide={onHide} >
        <PhotoField 
          setValue={handleSetValue} 
          isCamera={true} 
          isGallery={false} 
          Component={ModalOption} 
          text={"Take Photo"}  
          iconProps={{ name: 'camera', pack: "pm",}} 
        />
        <PhotoField 
          setValue={handleSetValue} 
          isGallery={true} 
          isCamera={false}  
          Component={ModalOption} 
          text={"Choose from Library"}  
          iconProps={{ name: 'document', pack: "pm",}}
        />
        <ModalOption text={`Choose from "My Documents"`}  iconProps={{ name: 'fileFromApp', pack: "pm",}}/>
        <ModalOption  text={`Choose from "My Files"`}  iconProps={{ name: 'fileFromApp', pack: "pm",}}/>
      </BottomHalfModal>
    )
  }

  export default AddFileModal;