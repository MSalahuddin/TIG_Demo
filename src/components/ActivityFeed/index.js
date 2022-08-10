import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Box from 'components/Box';
import InfiniteFlatList from 'components/InfiniteFlatList';
import activityFeedQuery from "queries/activity/ActivityFeed.gql";
import ActivityFeedItem from './ActivityFeedItem';
import { useGetListProps } from 'hooks/useGetListProps';
import Text from 'components/Text';
import CommentBox from './CommentBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsOpen } from 'hooks/useIsOpen';
import { useKeyboardEffect } from 'hooks/useKeyboardEffect';
import { t } from 'helpers/react';
import { renderSectionHeader as _renderSectionHeader } from 'pages/tasks/TaskList';
import { styles } from "./styles";
import { sectionExtractor, _getSections, renderSectionHeader } from "../../helpers/list";

const renderFeedItem = ({ item = {}, nav, onLinkPress }) => <ActivityFeedItem item={item} nav={nav} onLinkPress={onLinkPress} />
const ActivityFeed = ({ feedId, listProps: _listProps, onLinkPress, keyboardPadding = true, comments = true }) => {
  const [scrollRef, setScrollRef] = useState(null);
  const [sections, setSections] = useState([]);
  const nav = useNavigation();
  const listRef = useRef();

  const { isOpen: keyboardIsOpen, open: setKeyboardIsOpen, close: setKeyboardIsClosed } = useIsOpen();

  useKeyboardEffect({ onIsOpen: setKeyboardIsOpen, onIsClosed: setKeyboardIsClosed });

  const listProps = useGetListProps({
    dataKey: "activities",
    renderItem: ({ item }) => renderFeedItem({ item, nav, onLinkPress }),
    variables: { feedId },
    limit: 18,
    onResCallback: (res) => getSections(res?.data),
    sections,
    sectionExtractor: (item) => sectionExtractor({ date: item?.createdAt}),
    renderSectionHeader: (section) => renderSectionHeader(section, styles.sectionHeaderText),
    ..._listProps
  }, [sections]);

  const getSections = (_data) => {
    const sections = _getSections(_data?.activities?.edges, "createdAt")
    return setSections(sections)
  }

  return (
    <>
      <KeyboardAwareScrollView
        innerRef={(ref) => setScrollRef(ref)}
        behavior='position'
        onContentSizeChange={() => keyboardIsOpen && scrollRef.scrollToEnd({ animated: true })}
        contentContainerStyle={{ justifyContent: "space-between", height: "100%" }}
      >
        <Box flex={1}>
          <InfiniteFlatList
            query={activityFeedQuery}
            ref={listRef}
            {...listProps}
            ListEmptyComponent={
              <Text category="h6" textAlign="center" appearance="hint">
                No Activity
              </Text>
            }
          />
        </Box>
        {t(comments, <Box  height={60} marginBottom={(keyboardPadding && keyboardIsOpen) ? 36 : 0} alignSelf={"flex-end"} >
          <CommentBox feedId={feedId} refreshFeed={() => listRef?.current?.refresh()} />
        </Box>)}
      </KeyboardAwareScrollView>
    </>
  )
}

export default ActivityFeed