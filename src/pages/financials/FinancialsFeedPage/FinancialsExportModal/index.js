
import React, { useContext, useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import { getFinancialsReportUrl } from "api/financials";
import { useLoader } from "hooks/useLoader";
import BottomHalfModal from "components/BottomHalfModal";
import Text from "components/Text";
import Box from "components/Box";
import Button from "components/Button";
import AuthContext from "providers/auth";
import { colors } from "styles/theme";
import StyledLine from "components/StyledLine";
import { typography } from "styles/typography";
import { styles } from "./styles";
import useShareRemoteFile from "hooks/useShareRemoteFile";
import TabListSelect from "components/TabListSelect/TabListSelect";

const microcopy = { title: "Share" };
const comingSoon = () => Toast.show({ type: "success", text1: 'Feature Coming Soon.' })
/*
    Note:
    This component may easily be made generic to handle report generation throughout different sections of the app. 

*/

const tabs = [{ text: "PDF File", value: 'pdf' }, { text: "Excel file", value: 'xls' }];

const FinancialsExportModal = ({ variables, reportType, onHide, fileName, ...props }) => {
    const { token } = useContext(AuthContext);
    const [filetype, setFiletype] = useState()
    const { loader, startLoading, stopLoading } = useLoader();
    const shareFile = useShareRemoteFile()

    const handleExport = async () => {
        startLoading()
        try {
            const url = getFinancialsReportUrl(filetype.value, reportType, variables);
            const res = await shareFile(url, { Authorization: token }, { fileName: `${fileName}.${filetype.value}` });
            stopLoading()
        }
        catch (e) {
            console.log(e)
            stopLoading()
        }
        finally {
            onHide()
        }
    }

    useEffect(stopLoading, [props?.visible])

    return (
        <>
            <BottomHalfModal
                closeIcon={false} 
                onHide={onHide}
                {...microcopy}
                {...props}
            >
                {loader}
                <Box mt={3}>
                    <TabListSelect
                        values={tabs}
                        onPress={(selectedItem)=>setFiletype(selectedItem)}
                        isRadio={true}
                        buttonWidth={'100%'}
                        flexDirection={'column'}
                        currentSelectedItem={filetype}
                    />
                </Box>
                <Box style={styles.midContainer}>
                    <StyledLine style={styles.styledLine} />
                    <Text style={styles.midText}>Where to Send?</Text>
                    <StyledLine style={styles.styledLine} />
                </Box>
                <Box style={styles.btnContainer}>
                    <Button
                        shadow={false}
                        style={styles.externalBtn}
                        textStyle={{  ...typography["buttons/large"], color: colors['primary/50'] }}
                        onPress={handleExport}
                    >
                        External
                    </Button>
                    <Button
                        shadow={false}
                        style={styles.internalBtn}
                        textStyle={{ color: "#fff", ...typography["buttons/large"] }}
                        onPress={comingSoon}
                    >
                        In App
                    </Button>
                </Box>
            </BottomHalfModal>
        </>
    )
}
export default FinancialsExportModal