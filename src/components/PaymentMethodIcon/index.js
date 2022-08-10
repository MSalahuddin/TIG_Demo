import React, { useMemo } from 'react';

import Svg, { Path } from 'react-native-svg';
import { colors } from 'styles/theme';

const PaymentMethodIcon = ({method = '', fill= colors["primary/50"]}) => {
    const {d, height = 18, width = 18} = useMemo(() =>methodsToD[method.toLowerCase()] || {},[method]);
    if(!d) return null
    return (
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} fill="none" >
        <Path fillRule="evenodd" clipRule="evenodd" d={d} fill={fill} />
      </Svg>
    )
};

const methodsToD = {
    cash: {d: `M7.04339 0.166504H7.06602H10.9327H10.9553C12.0563 0.166501 12.9132 0.166499 13.6006 0.222661C14.2985 0.279684 14.8656 0.397087 15.3756 0.656975C16.2224 1.0884 16.9108 1.77682 17.3422 2.62355C17.6021 3.1336 17.7195 3.70067 17.7765 4.3986C17.8327 5.08595 17.8327 5.94283 17.8327 7.04372V7.04374V7.04377V7.04379V7.04382V7.04384V7.04386V7.0665V7.59984V7.62248V7.62251V7.62253V7.62255V7.62258V7.6226V7.62263C17.8327 8.72351 17.8327 9.58039 17.7765 10.2677C17.7195 10.9657 17.6021 11.5327 17.3422 12.0428C16.9108 12.8895 16.2224 13.5779 15.3756 14.0094C14.8656 14.2693 14.2985 14.3867 13.6006 14.4437C12.9132 14.4998 12.0563 14.4998 10.9553 14.4998H10.9327H7.06602H7.04337C5.94242 14.4998 5.08549 14.4998 4.39811 14.4437C3.70018 14.3867 3.13312 14.2693 2.62306 14.0094C1.77633 13.5779 1.08792 12.8895 0.656486 12.0428C0.396599 11.5327 0.279196 10.9657 0.222173 10.2677C0.166011 9.58036 0.166013 8.72342 0.166016 7.62247V7.62246V7.59984V7.0665V7.04387V7.04387C0.166013 5.94291 0.166011 5.08598 0.222173 4.3986C0.279196 3.70067 0.396599 3.1336 0.656486 2.62355C1.08792 1.77682 1.77633 1.0884 2.62306 0.656975C3.13312 0.397087 3.70018 0.279684 4.39811 0.222661C5.0855 0.166499 5.94243 0.166501 7.04338 0.166504H7.04339ZM3.07705 1.54798C3.39531 1.38582 3.77738 1.28769 4.33263 1.23259C4.33211 1.84529 4.32697 2.10812 4.28465 2.3209C4.08738 3.31262 3.31213 4.08787 2.32041 4.28513C2.10763 4.32746 1.84481 4.3326 1.2321 4.33312C1.2872 3.77787 1.38533 3.3958 1.54749 3.07754C1.88305 2.41897 2.41848 1.88354 3.07705 1.54798ZM1.16602 7.0665C1.16602 6.38497 1.16616 5.81733 1.17783 5.33318C1.79489 5.33324 2.18205 5.33225 2.5155 5.26592C3.90391 4.98975 4.98926 3.9044 5.26543 2.51599C5.33176 2.18253 5.33275 1.79538 5.33269 1.17831C5.81684 1.16665 6.38449 1.1665 7.06602 1.1665H10.9327C11.6142 1.1665 12.1819 1.16665 12.666 1.17831C12.6659 1.79538 12.6669 2.18253 12.7333 2.51598C13.0094 3.9044 14.0948 4.98975 15.4832 5.26592C15.8167 5.33225 16.2038 5.33324 16.8209 5.33318C16.8325 5.81733 16.8327 6.38498 16.8327 7.0665V7.59984C16.8327 8.28137 16.8325 8.84902 16.8209 9.33316C16.2038 9.33311 15.8167 9.3341 15.4832 9.40042C14.0948 9.6766 13.0094 10.7619 12.7333 12.1504C12.6669 12.4838 12.6659 12.871 12.666 13.488C12.1819 13.4997 11.6142 13.4998 10.9327 13.4998H7.06602C6.38449 13.4998 5.81684 13.4997 5.33269 13.488C5.33275 12.871 5.33176 12.4838 5.26543 12.1504C4.98926 10.7619 3.90391 9.6766 2.5155 9.40042C2.18204 9.3341 1.79489 9.33311 1.17783 9.33316C1.16616 8.84901 1.16602 8.28137 1.16602 7.59984V7.0665ZM1.2321 10.3332C1.2872 10.8885 1.38533 11.2705 1.54749 11.5888C1.88305 12.2474 2.41848 12.7828 3.07705 13.1184C3.39531 13.2805 3.77738 13.3787 4.33263 13.4337C4.33211 12.821 4.32697 12.5582 4.28465 12.3454C4.08738 11.3537 3.31213 10.5785 2.32041 10.3812C2.10763 10.3389 1.84481 10.3337 1.2321 10.3332ZM15.6783 10.3812C15.8911 10.3389 16.1539 10.3337 16.7666 10.3332C16.7115 10.8885 16.6134 11.2705 16.4512 11.5888C16.1157 12.2474 15.5802 12.7828 14.9217 13.1184C14.6034 13.2805 14.2213 13.3787 13.6661 13.4337C13.6666 12.821 13.6717 12.5582 13.7141 12.3454C13.9113 11.3537 14.6866 10.5785 15.6783 10.3812ZM16.7666 4.33312C16.7115 3.77787 16.6134 3.3958 16.4512 3.07754C16.1157 2.41897 15.5802 1.88354 14.9217 1.54798C14.6034 1.38582 14.2213 1.28769 13.6661 1.23259C13.6666 1.84529 13.6717 2.10812 13.7141 2.32089C13.9113 3.31262 14.6866 4.08787 15.6783 4.28513C15.8911 4.32746 16.1539 4.3326 16.7666 4.33312ZM8.99925 6.16691C8.35491 6.16691 7.83258 6.68924 7.83258 7.33358C7.83258 7.97791 8.35491 8.50024 8.99925 8.50024C9.64358 8.50024 10.1659 7.97791 10.1659 7.33358C10.1659 6.68924 9.64358 6.16691 8.99925 6.16691ZM6.83258 7.33358C6.83258 6.13696 7.80263 5.16691 8.99925 5.16691C10.1959 5.16691 11.1659 6.13696 11.1659 7.33358C11.1659 8.53019 10.1959 9.50024 8.99925 9.50024C7.80263 9.50024 6.83258 8.53019 6.83258 7.33358ZM3.16602 16.8332C2.88987 16.8332 2.66602 17.057 2.66602 17.3332C2.66602 17.6093 2.88987 17.8332 3.16602 17.8332H14.8327C15.1088 17.8332 15.3327 17.6093 15.3327 17.3332C15.3327 17.057 15.1088 16.8332 14.8327 16.8332H3.16602Z`},
    check:{d: `M8.88208 0.166508L8.99936 0.166512L9.11663 0.166508C11.1764 0.166403 12.3326 0.166344 13.2873 0.467351C15.3098 1.10506 16.8941 2.68936 17.5319 4.71193C17.8329 5.6666 17.8328 6.82282 17.8327 8.88259L17.8327 8.99985V11.6428C17.8327 13.2846 17.1805 14.8591 16.0196 16.0201C14.8587 17.181 13.2841 17.8332 11.6423 17.8332H8.99935L8.8821 17.8332C6.82233 17.8333 5.66611 17.8333 4.71144 17.5323C2.68887 16.8946 1.10458 15.3103 0.466863 13.2878C0.165856 12.3331 0.165915 11.1769 0.166019 9.11712L0.166023 8.99985L0.166019 8.88257C0.165915 6.82282 0.165856 5.6666 0.466863 4.71193C1.10458 2.68936 2.68887 1.10506 4.71144 0.467351C5.66611 0.166344 6.82233 0.166403 8.88208 0.166508ZM8.99936 1.16651C6.79036 1.16651 5.80099 1.17235 5.01214 1.42107C3.30074 1.96067 1.96018 3.30123 1.42058 5.01263C1.17186 5.80148 1.16602 6.79085 1.16602 8.99985C1.16602 11.2088 1.17186 12.1982 1.42058 12.9871C1.96018 14.6985 3.30074 16.039 5.01214 16.5786C5.80099 16.8273 6.79036 16.8332 8.99935 16.8332H11.6423C11.7059 16.8332 11.7694 16.832 11.8327 16.8297V15.5332V15.5118V15.5117C11.8327 14.9698 11.8327 14.5328 11.8616 14.1788C11.8914 13.8144 11.9543 13.4943 12.1052 13.1982C12.3449 12.7278 12.7273 12.3453 13.1977 12.1056C13.4939 11.9547 13.814 11.8918 14.1784 11.8621C14.5323 11.8331 14.9694 11.8331 15.5113 11.8332H15.5327H16.8292C16.8315 11.7699 16.8327 11.7064 16.8327 11.6428V8.99985C16.8327 6.79085 16.8269 5.80148 16.5781 5.01263C16.0385 3.30123 14.698 1.96067 12.9866 1.42107C12.1977 1.17235 11.2084 1.16651 8.99936 1.16651ZM15.3125 15.313C14.6248 16.0006 13.7641 16.4754 12.8327 16.6949V15.5332C12.8327 14.9649 12.8331 14.5687 12.8583 14.2603C12.883 13.9577 12.9291 13.7838 12.9962 13.6522C13.14 13.3699 13.3695 13.1405 13.6517 12.9966C13.7834 12.9296 13.9572 12.8835 14.2598 12.8587C14.5682 12.8335 14.9644 12.8332 15.5327 12.8332H16.6944C16.4749 13.7646 16.0001 14.6253 15.3125 15.313ZM4.83269 4.33318C4.55655 4.33318 4.33269 4.55703 4.33269 4.83318C4.33269 5.10932 4.55655 5.33318 4.83269 5.33318H11.4994C11.7755 5.33318 11.9994 5.10932 11.9994 4.83318C11.9994 4.55703 11.7755 4.33318 11.4994 4.33318H4.83269ZM4.33269 8.16651C4.33269 7.89037 4.55655 7.66651 4.83269 7.66651H9.83269C10.1088 7.66651 10.3327 7.89037 10.3327 8.16651C10.3327 8.44265 10.1088 8.66651 9.83269 8.66651H4.83269C4.55655 8.66651 4.33269 8.44265 4.33269 8.16651ZM4.83269 10.9998C4.55655 10.9998 4.33269 11.2237 4.33269 11.4998C4.33269 11.776 4.55655 11.9998 4.83269 11.9998H6.49936C6.7755 11.9998 6.99936 11.776 6.99936 11.4998C6.99936 11.2237 6.7755 10.9998 6.49936 10.9998H4.83269Z`},
    credit: {d:`M7.04339 3.45626e-08H7.06602H10.9327H10.9553C12.0563 -2.52844e-06 12.9132 -4.6146e-06 13.6006 0.0561574C14.2985 0.11318 14.8656 0.230583 15.3756 0.490471C16.2224 0.921901 16.9108 1.61031 17.3422 2.45704C17.6021 2.9671 17.7195 3.53416 17.7765 4.23209C17.8327 4.91947 17.8327 5.77638 17.8327 6.87731V6.87734V6.87736V6.9V9.1V9.12264V9.12267V9.12269C17.8327 10.2236 17.8327 11.0805 17.7765 11.7679C17.7195 12.4658 17.6021 13.0329 17.3422 13.543C16.9108 14.3897 16.2224 15.0781 15.3756 15.5095C14.8656 15.7694 14.2985 15.8868 13.6006 15.9438C12.9132 16 12.0563 16 10.9553 16H10.9327H7.06602H7.04338C5.94243 16 5.0855 16 4.39811 15.9438C3.70018 15.8868 3.13312 15.7694 2.62306 15.5095C1.77633 15.0781 1.08792 14.3897 0.656486 13.543C0.396599 13.0329 0.279196 12.4658 0.222173 11.7679C0.166011 11.0805 0.166013 10.2236 0.166016 9.12263V9.1V6.9V6.87737V6.87737C0.166013 5.77641 0.166011 4.91948 0.222173 4.23209C0.279196 3.53416 0.396599 2.9671 0.656486 2.45704C1.08792 1.61031 1.77633 0.921901 2.62306 0.490471C3.13312 0.230584 3.70018 0.11318 4.39811 0.0561574C5.0855 -4.52519e-06 5.94243 -2.52844e-06 7.04338 3.45626e-08H7.04339ZM4.47954 1.05284C3.84345 1.10481 3.42264 1.20539 3.07705 1.38148C2.41848 1.71703 1.88305 2.25247 1.54749 2.91103C1.38532 3.22931 1.28719 3.61139 1.2321 4.16667H16.7666C16.7115 3.61139 16.6134 3.22931 16.4512 2.91103C16.1156 2.25247 15.5802 1.71703 14.9216 1.38148C14.5761 1.20539 14.1552 1.10481 13.5192 1.05284C12.8772 1.00039 12.061 1 10.9327 1H7.06602C5.93766 1 5.12146 1.00039 4.47954 1.05284ZM1.16602 6.9C1.16602 6.21847 1.16616 5.65082 1.17783 5.16667H16.8209C16.8325 5.65082 16.8327 6.21847 16.8327 6.9V9.1C16.8327 10.2284 16.8323 11.0446 16.7798 11.6865C16.7279 12.3226 16.6273 12.7434 16.4512 13.089C16.1156 13.7475 15.5802 14.283 14.9216 14.6185C14.5761 14.7946 14.1552 14.8952 13.5192 14.9472C12.8772 14.9996 12.061 15 10.9327 15H7.06602C5.93766 15 5.12147 14.9996 4.47954 14.9472C3.84345 14.8952 3.42264 14.7946 3.07705 14.6185C2.41848 14.283 1.88305 13.7475 1.54749 13.089C1.37141 12.7434 1.27082 12.3226 1.21885 11.6865C1.1664 11.0446 1.16602 10.2284 1.16602 9.1V6.9ZM3.99925 7.5C3.7231 7.5 3.49925 7.72386 3.49925 8C3.49925 8.27614 3.7231 8.5 3.99925 8.5H7.33258C7.60872 8.5 7.83258 8.27614 7.83258 8C7.83258 7.72386 7.60872 7.5 7.33258 7.5H3.99925Z`},
    other: {d: `M0.166687 3C0.166687 1.57802 1.32804 0.416664 2.75002 0.416664C4.172 0.416664 5.33335 1.57802 5.33335 3C5.33335 4.42197 4.172 5.58333 2.75002 5.58333C1.32804 5.58333 0.166687 4.42197 0.166687 3ZM2.75002 1.41666C1.88033 1.41666 1.16669 2.13031 1.16669 3C1.16669 3.86969 1.88033 4.58333 2.75002 4.58333C3.61971 4.58333 4.33335 3.86969 4.33335 3C4.33335 2.13031 3.61971 1.41666 2.75002 1.41666ZM12.6667 3C12.6667 1.57802 13.828 0.416664 15.25 0.416664C16.672 0.416664 17.8334 1.57802 17.8334 3C17.8334 4.42197 16.672 5.58333 15.25 5.58333C13.828 5.58333 12.6667 4.42197 12.6667 3ZM15.25 1.41666C14.3803 1.41666 13.6667 2.13031 13.6667 3C13.6667 3.86969 14.3803 4.58333 15.25 4.58333C16.1197 4.58333 16.8334 3.86969 16.8334 3C16.8334 2.13031 16.1197 1.41666 15.25 1.41666ZM9.00002 0.416664C7.57804 0.416664 6.41669 1.57802 6.41669 3C6.41669 4.42197 7.57804 5.58333 9.00002 5.58333C10.422 5.58333 11.5834 4.42197 11.5834 3C11.5834 1.57802 10.422 0.416664 9.00002 0.416664ZM7.41669 3C7.41669 2.13031 8.13033 1.41666 9.00002 1.41666C9.86971 1.41666 10.5834 2.13031 10.5834 3C10.5834 3.86969 9.86971 4.58333 9.00002 4.58333C8.13033 4.58333 7.41669 3.86969 7.41669 3Z`, height: "6"},
    ['in app']:{d:`M0.166687 3C0.166687 1.57802 1.32804 0.416664 2.75002 0.416664C4.172 0.416664 5.33335 1.57802 5.33335 3C5.33335 4.42197 4.172 5.58333 2.75002 5.58333C1.32804 5.58333 0.166687 4.42197 0.166687 3ZM2.75002 1.41666C1.88033 1.41666 1.16669 2.13031 1.16669 3C1.16669 3.86969 1.88033 4.58333 2.75002 4.58333C3.61971 4.58333 4.33335 3.86969 4.33335 3C4.33335 2.13031 3.61971 1.41666 2.75002 1.41666ZM12.6667 3C12.6667 1.57802 13.828 0.416664 15.25 0.416664C16.672 0.416664 17.8334 1.57802 17.8334 3C17.8334 4.42197 16.672 5.58333 15.25 5.58333C13.828 5.58333 12.6667 4.42197 12.6667 3ZM15.25 1.41666C14.3803 1.41666 13.6667 2.13031 13.6667 3C13.6667 3.86969 14.3803 4.58333 15.25 4.58333C16.1197 4.58333 16.8334 3.86969 16.8334 3C16.8334 2.13031 16.1197 1.41666 15.25 1.41666ZM9.00002 0.416664C7.57804 0.416664 6.41669 1.57802 6.41669 3C6.41669 4.42197 7.57804 5.58333 9.00002 5.58333C10.422 5.58333 11.5834 4.42197 11.5834 3C11.5834 1.57802 10.422 0.416664 9.00002 0.416664ZM7.41669 3C7.41669 2.13031 8.13033 1.41666 9.00002 1.41666C9.86971 1.41666 10.5834 2.13031 10.5834 3C10.5834 3.86969 9.86971 4.58333 9.00002 4.58333C8.13033 4.58333 7.41669 3.86969 7.41669 3Z`, height: "6"},
    ['manual']:{d:`M0.166687 3C0.166687 1.57802 1.32804 0.416664 2.75002 0.416664C4.172 0.416664 5.33335 1.57802 5.33335 3C5.33335 4.42197 4.172 5.58333 2.75002 5.58333C1.32804 5.58333 0.166687 4.42197 0.166687 3ZM2.75002 1.41666C1.88033 1.41666 1.16669 2.13031 1.16669 3C1.16669 3.86969 1.88033 4.58333 2.75002 4.58333C3.61971 4.58333 4.33335 3.86969 4.33335 3C4.33335 2.13031 3.61971 1.41666 2.75002 1.41666ZM12.6667 3C12.6667 1.57802 13.828 0.416664 15.25 0.416664C16.672 0.416664 17.8334 1.57802 17.8334 3C17.8334 4.42197 16.672 5.58333 15.25 5.58333C13.828 5.58333 12.6667 4.42197 12.6667 3ZM15.25 1.41666C14.3803 1.41666 13.6667 2.13031 13.6667 3C13.6667 3.86969 14.3803 4.58333 15.25 4.58333C16.1197 4.58333 16.8334 3.86969 16.8334 3C16.8334 2.13031 16.1197 1.41666 15.25 1.41666ZM9.00002 0.416664C7.57804 0.416664 6.41669 1.57802 6.41669 3C6.41669 4.42197 7.57804 5.58333 9.00002 5.58333C10.422 5.58333 11.5834 4.42197 11.5834 3C11.5834 1.57802 10.422 0.416664 9.00002 0.416664ZM7.41669 3C7.41669 2.13031 8.13033 1.41666 9.00002 1.41666C9.86971 1.41666 10.5834 2.13031 10.5834 3C10.5834 3.86969 9.86971 4.58333 9.00002 4.58333C8.13033 4.58333 7.41669 3.86969 7.41669 3Z`, height: "6"}
  }

  
  export default PaymentMethodIcon

  