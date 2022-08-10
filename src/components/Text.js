import styled from 'styled-components/native';
import {space, color, layout, flexbox, typography} from 'styled-system';
import {Text as UIText} from '@ui-kitten/components';

const Text = styled(UIText)(
  {
    minWidth: 0,
  },
  space,
  color,
  layout,
  flexbox,
  typography,
);

export default Text;
