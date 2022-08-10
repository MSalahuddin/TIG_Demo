import React from 'react';
import styled from 'styled-components/native';

import Button from 'components/Button';

import { t } from 'helpers/react';
import { useIsOpen } from 'hooks/useIsOpen';
import GalleryItems from './GalleryItems';
import SelectButtonInput from 'components/SelectButtonInput';
import Box from 'components/Box';
import InputLabel from 'components/InputLabel';
import { input_label_16 } from 'styles/reusable-classes';
import AddFileModal from 'components/Modals/AddFileModal';

const AddButton = styled(Button)`
  padding-horizontal: 0;
  padding-vertical: 5;
  min-height: 0;
  min-width: 0;
  margin-left: 5;
`;

const RemoveButton = styled(AddButton)`
  padding: 0;
  position: absolute;
  right: -7;
  bottom: 110;
  z-index: 1;
  elevation: 1;
`;


const GalleryInput = ({
    label,
    value = [],
    onAdd,
    onRemove,
    readOnly,
    maxCount = 5,
    disabled,
    download,
    labelTransform,
    displayMenu,
    navigation,
    closeMenu,
    inputProps,
    ...props
}) => {
    const { isOpen, close, open } = useIsOpen();
    const canAdd = (value?.length ?? 0) < maxCount;

    return (
        <>
            <Box {...props}>
                {t((!readOnly && canAdd), (
                    value.length ? (
                        <Box width={"100%"} flexDirection={"row"} justifyContent={"space-between"}  >
                            <InputLabel label={label}  labelStyle={input_label_16}/>
                            <Button
                                size="tiny"
                                width={"18%"}
                                appearance="ghost"
                                containerStyle={{ justifyContent: "center" }}
                                margin={0}
                                textStyle={{ fontSize: 14, paddingTop: 7 }}
                                disabled={!onAdd || disabled}
                                onPress={open}
                            >
                                Add
                            </Button>

                        </Box>
                    ) : (
                        < SelectButtonInput
                            addLabel={"Choose Files"}
                            label={label}
                            onAdd={open}
                            {...inputProps}
                        />
                    )
                ))}
                <GalleryItems value={value} readOnly={readOnly} disabled={disabled} onRemove={onRemove} download={download} />
            </Box>
            <AddFileModal visible={isOpen} setValue={onAdd} onHide={close}/>
        </>
    );
};

GalleryInput.styledComponentName = 'Input';
GalleryInput.ignoreForm = true;

export default GalleryInput;
