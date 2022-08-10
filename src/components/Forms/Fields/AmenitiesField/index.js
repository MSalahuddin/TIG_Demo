import React, { useRef } from 'react';
import PopoverField from '../PopoverField';
import getAmenitiesQuery from 'queries/properties/getAmenities.gql';
import addAmenityMutation from 'queries/properties/addAmenity.gql';
import { useGetListProps } from 'hooks/useGetListProps';
import { AmenityButton } from '../CategoryInputField';
import { colors } from 'styles/theme';
import TagsValue from 'components/Forms/TagsValue';
import ButtonField from '../ButtonField';
import Text from 'components/Text';
import { TouchableOpacity } from 'react-native';
import { useMutation } from 'urql';
import { useIsOpen } from 'hooks/useIsOpen';
import { t } from 'helpers/react';
import { typography } from 'styles/typography';
import AppendedTextField from '../AppendedTextField';
import SelectListItem from 'components/SelectListItem/SelectListItem';



const renderItem = ({ item, isSelected, onPress }) => (
    <SelectListItem text={item.name} item={item} isSelected={isSelected} onPress={onPress}/>
   
);

const AmenitiesField = ({ value, setValue, amenityType = 1 }) => {
    const { isOpen, close, toggle } = useIsOpen()
    const listRef = useRef()
    const listProps = useGetListProps({ dataKey: 'amenities', ref: listRef });
    const [_, addAmenity] = useMutation(addAmenityMutation);
    const handleAddAmenity = async (addAmenityText) => {
        const input = { amenityType, name: addAmenityText }
        const res = await addAmenity({ input });
        listRef.current?.refresh()
        close()
    };

    const headerRight = (
        <TouchableOpacity onPress={toggle}>
            <Text color={colors['primary/50']} style={typography['body/small – medium']}>{t(!isOpen, "Add new", "Cancel")}</Text>
        </TouchableOpacity>
    );

    const titleAppender = isOpen && <AppendedTextField onAddition={handleAddAmenity} />

    const handleRemoveAmenity = (amenity,) => {
        let amenities = value.slice().filter(a => a.id !== amenity.id);
        setValue(amenities)
    }

    return (
        <PopoverField
            value={value?.length && <TagsValue onTagDelete={handleRemoveAmenity} style={{ marginTop: 20 }} value={value} />}
            Component={ButtonField}
            setValue={setValue}
            copy={{ label: "List of all amenities", btn: "Add From List" }}
            triggerKey={"onPress"}
            navigationProps={{
                query: getAmenitiesQuery,
                listRef,
                header: "Select Amenities",
                initialValues: value,
                onSelect: (values) => setValue(values),
                valueKey: "id",
                variables: amenityType && {type: amenityType},
                value,
                renderItem,
                headerRight,
                titleAppender,
                ...listProps
            }}
        />
    )
}

export default AmenitiesField