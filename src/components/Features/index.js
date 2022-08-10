import React from 'react';
import Icon from 'components/Icon';
import { compact } from 'lodash-es';
import Box from 'components/Box';
import { t } from 'helpers/react';
import Text from 'components/Text';
import TouchableText from 'components/TouchableText';

const FeatureValue = ({ content, style, onPress }) => {
    const TextComponent = onPress ? TouchableText : Text;
    return (
        <TextComponent onPress={onPress} style={style} maxWidth={"50%"} numberOfLines={1}>
            {content}
        </TextComponent>
    )
}

const Features = ({ features = [], theme = {}, styles, labelProps, conditional }) => {
    return (
        <Box {...styles?.container}>
            {compact(features).map(({ label, icon, content, contentJsx, iconProps, pack = "eva", styles: _styles, onContentPress }, i) =>
                t(!conditional || (conditional && (content|| contentJsx)), <Box flexDirection={"row"} alignItems={"center"} style={[styles?.row, _styles?.row, i === 0 && {borderTopWidth: 0}]} justifyContent={"space-between"} maxWidth={"100%"} >
                    <Box maxWidth={"50%"} flexDirection={"row"} alignItems={"center"} >
                        {t(icon,
                            <Box top={-2} style={_styles?.iconContainer}>
                                {Icon(icon, pack)({
                                    width: 24,
                                    height: 24,
                                    tintColor: theme['color-primary-700'],
                                    ...styles?.icon,
                                    ...iconProps
                                })}
                            </Box>)}
                        {t(label,
                            <Text mx="2" category="s3" numberOfLines={1} color={theme['grey-600']} style={[styles?.label, _styles?.label]} {...labelProps}>
                                {label}
                            </Text>
                        )}
                    </Box>
                    {t(content, <FeatureValue onPress={onContentPress} style={[[styles?.content, _styles?.content]]} content={content} />)}
                    {contentJsx}
                </Box>)
            )}
        </Box>
    )
}

export default Features;