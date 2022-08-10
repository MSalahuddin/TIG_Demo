function formatPhoneNumber(phoneNumberString) {
  try {
    var cleaned = ('' + phoneNumberString).replace(/[^0-9+]/g, '');
    var match = cleaned.match(/^(\+\d{1,3})?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? match[1] + ' ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  } catch {}
  return phoneNumberString;
}

export default formatPhoneNumber;
