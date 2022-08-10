import React from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import { button_styles } from 'styles/button';
import AuthProvider from 'providers/auth';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import format from 'date-fns/format';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import { t } from 'helpers/react';
import { ScrollView } from 'react-native';
import { usaDateFormat } from 'constants/dateFormat';

const Personal = ({ navigation, data, isSelf }) => {
    const { logout } = React.useContext(AuthProvider);
    const personal = data
    return (
        <FeaturesTab
            features={[
                { label: "ID", content: personal?.identificationNumber },
                { label: "DOB", content: personal?.birthday ? format(new Date(personal?.birthday), usaDateFormat) : "" },
                { label: "Personal Email", content: personal?.email },
                { label: "Cell Phone", content: personal?.phone ? formatPhoneNumber(personal?.phone) : "" },
                { label: "Home address", content: personal?.address ? personal?.address : "" },
            ]}
        >
            {t(isSelf, <Box px={3} mt={3}>
                <Box
                    as={Button}
                    children={'Change Password'}
                    onPress={() => navigation.navigate('ChangePassword')}
                    disabled={!data}
                    mt={3}
                    {...button_styles["primary"]}
                />
                <Box
                    as={Button}
                    children={'Sign out'}
                    onPress={logout}
                    disabled={!data}
                    mt={3}
                    px={3}
                    {...button_styles["clear_red_border"]}
                />
            </Box>)}
        </FeaturesTab>
    )
};

export default Personal;