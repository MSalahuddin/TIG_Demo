import React, { useMemo } from 'react';
import Text from 'components/Text';
import Box from 'components/Box';
import Avatar from 'components/Avatar';
import { t } from 'helpers/react';
import Button from 'components/Button';
import { format } from 'helpers/date';
import { typography } from 'styles/typography';
import { LINK_PAGES_TO_SCREEN } from '../consts';
import { styles } from './styles';
import { View } from 'react-native';
import { colors } from 'styles/theme';

const formatTime = (date) => format(date, "hh:mm aaa", "", { toDate: true })

const ActivityFeedItem = ({ item, nav, onLinkPress }) => {
    const { text, actions, user, createdAt } = item;
    const { picture } = user || {};
    const {links} = useMemo(() => actions ?  JSON.parse(actions) : {}, [actions])
    const handleLinkPress = (link) => {
      if(onLinkPress) onLinkPress();
      nav.navigate(LINK_PAGES_TO_SCREEN[link?.page], link?.params)
    }
    return (
      <View>
        <Box mb={0} flexDirection={"row"} justifyContent={"space-between"} flex={1}>
          <Box height={72}  pl={3}>
            <Avatar
              size="small"
              source={picture ? { uri: picture } : require('img/profile.svgpng')}
            />
          </Box>
          <Box px={3} flex={1}>
            <Box flexDirection={"row"} justifyContent={"space-between"}>
              <Box >
                <Text style={{ ...typography["body/small – bold"] }}>
                  {user?.fullName}
                </Text>
              </Box>
              <Text style={{ ...typography["body/x-small – regular"], color:colors["gray scale/40"] }}>
                {formatTime(createdAt)?.toLowerCase()}
              </Text>
            </Box>
            <Box>
              <Text style={{ ...typography["body/small – regular"] }}mb={2}>
                {text} 
              </Text>
            </Box>
            {t(links,
              <Box flex={1}  justifyContent={"center"} mb={4}>
                {links?.map(link =>
                  <Button 
                    size="small" 
                    shadow={false} 
                    onPress={() => handleLinkPress(link) }
                    style={styles.btn} 
                    textStyle={styles.btnTxt}
                  >View</Button>
    
                )}
              </Box>
            )}
          </Box>
        </Box>
      </View>

    )
  }

  export default ActivityFeedItem;