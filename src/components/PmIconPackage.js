import { Icon } from '@ui-kitten/components';
import React from 'react';

const IconProvider = ({default: Icon}) => ({
  toReactElement: props => (
    <Icon
      {...props}
      tintColor={props.tintColor || props.style?.tintColor || '#000'}
      backgroundColor={
        props.backgroundColor || props.style?.backgroundColor || '#fff'
      }
      width={props.width || props.style?.width}
    />
  ),
});

const PmIconsPack = {
  name: 'pm',
  icons: {
    actions: IconProvider(require('img/icons/actions.svg')),
    archive: IconProvider(require('img/icons/archive.svg')),
    bath: IconProvider(require('img/icons/bath.svg')),
    bed: IconProvider(require('img/icons/bed.svg')),
    bell: IconProvider(require('img/icons/bell.svg')),
    boxes: IconProvider(require('img/icons/boxes.svg')),
    calendar: IconProvider(require('img/icons/calendar.svg')),
    calendar_b: IconProvider(require('img/icons/calendar_b.svg')),
    calendar_black: IconProvider(require('img/icons/calendar_black.svg')),
    checkIcon: IconProvider(require('img/icons/check.svg')),

    calendar_theme: IconProvider(require('img/icons/calendar_theme.svg')),
    
    date: IconProvider(require('img/icons/date_icon.svg')),
    comment: IconProvider(require('img/icons/comment.svg')),

    clock: IconProvider(require('img/icons/clock.svg')),
    alert: IconProvider(require('img/icons/alert.svg')),
    repeat: IconProvider(require('img/icons/repeats.svg')),
    ["default-service-type"]: IconProvider(require("img/icons/default-service-type.svg")),
    document: IconProvider(require('img/icons/document.svg')),
    dollar: IconProvider(require('img/icons/dollar.svg')),
    fileFromApp: IconProvider(require('img/icons/fileFromApp.svg')),
    documents: IconProvider(require('img/icons/documents.svg')),
    ['documents-active']: IconProvider(
      require('img/icons/documents-active.svg'),
    ),

    expandInput: IconProvider(require('img/icons/expandInput.svg')),
    edit: IconProvider(require('img/icons/edit.svg')),
    edit_icon: IconProvider(require('img/icons/edit-icon.svg')),
    error: IconProvider(require('img/icons/error.svg')),
    camera: IconProvider(require('img/icons/camera.svg')),
    export: IconProvider(require('img/icons/export.svg')),
    ["export-white"]: IconProvider(require('img/icons/export-white.svg')),

    filter: IconProvider(require('img/icons/filter.svg')),
    folder: IconProvider(require('img/icons/folder.svg')),
    graph: IconProvider(require('img/icons/graph.svg')),
    ["graph-grey"]: IconProvider(require('img/icons/graph-grey.svg')),

    home: IconProvider(require('img/icons/home.svg')),
    location: IconProvider(require('img/icons/location.svg')),
    maintenance: IconProvider(require('img/icons/maintenance.svg')),
    ['maintenance-active']: IconProvider(
      require('img/icons/maintenance-active.svg'),
    ),
    ['maintenance-old']: IconProvider(require('img/icons/maintenance-old.svg')),
    ['notice']: IconProvider(require('img/icons/notice.svg')),
    profile: IconProvider(require('img/icons/profile.svg')),
    properties: IconProvider(require('img/icons/properties.svg')),
    ['properties-active']: IconProvider(
      require('img/icons/properties-active.svg'),
    ),
    resource: IconProvider(require('img/icons/resource.svg')),
    settings: IconProvider(require('img/icons/settings.svg')),
    tasks: IconProvider(require('img/icons/tasks.svg')),
    ['tasks-active']: IconProvider(require('img/icons/tasks-active.svg')),
    tenants: IconProvider(require('img/icons/tenants.svg')),
    ['tenants-active']: IconProvider(require('img/icons/tenants-active.svg')),
    unit: IconProvider(require('img/icons/unit.svg')),
    building: IconProvider(require('img/icons/building.svg')),
    ['plus-circle']: IconProvider(require('img/icons/plus-circle.svg')),
    ['plus-circle-outline']: IconProvider(
      require('img/icons/plus-circle-outline.svg'),
    ),
    ['home-outline']: IconProvider(require('img/icons/home-outline.svg')),
    ['info-circle-outline']: IconProvider(
      require('img/icons/info-circle-outline.svg'),
    ),
    ['red-circle-cross']: IconProvider(require("img/icons/red-circle-cross.svg")),
    restore: IconProvider(require("img/icons/restore.svg")),
    tick: IconProvider(require("img/icons/tick.svg")),
    ['grey-tick']: IconProvider(require("img/icons/grey-tick.svg")),
    ['green-tick']: IconProvider(require("img/icons/green-tick.svg")),
    ['green-circle-tick']: IconProvider(require("img/icons/green-circle-tick.svg")),

    ['bank-account']: IconProvider(require("img/icons/bank-account.svg")),
    ['rent-payment-details']: IconProvider(require("img/icons/rent-payment-details.svg")),
    ['outstanding-debt-details']: IconProvider(require("img/icons/outstanding-debt-details.svg")),
    phone: IconProvider(require("img/icons/phone.svg")),
    email: IconProvider(require("img/icons/email.svg")),
    // payment methods
    cash: IconProvider(require('img/icons/payment-methods/payment-method-cash.svg')),
    check: IconProvider(require('img/icons/payment-methods/payment-method-check.svg')),
    other: IconProvider(require('img/icons/payment-methods/other.svg')),
    paypal: IconProvider(require('img/icons/payment-methods/paypal.svg')),
    ["credit-card"]: IconProvider(require('img/icons/payment-methods/payment-method-credit-card.svg')),
    ["transaction-details-cash"]: IconProvider(require('img/icons/transaction-details/cash.svg')),
    ["transaction-details-check"]: IconProvider(require('img/icons/transaction-details/check.svg')),
    ["transaction-details-credit-card"]: IconProvider(require('img/icons/transaction-details/credit-card.svg')),
    ["transaction-details-other"]: IconProvider(require('img/icons/transaction-details/other.svg')),
    ["transaction-details-paypal"]: IconProvider(require('img/icons/transaction-details/paypal.svg')),
    ["remove-filter"]: IconProvider(require('img/icons/remove-filter.svg')),
    ["delete"]: IconProvider(require('img/icons/remove-filter.svg')),

    ["dropdown-filter"]: IconProvider(require('img/icons/dropdown-filter.svg')),
    ["amount-paid"]: IconProvider(require('img/icons/amount-paid.svg')),
    ["folder-transparent"]: IconProvider(require('img/icons/folder-transparent.svg')),
    ["chevron-left"]: IconProvider(require('img/icons/chevron-left.svg')),
    ["humburger-menu"]: IconProvider(require('img/icons/humburger-menu.svg')),
    ["document_icon"]: IconProvider(require('img/icons/document_icon.svg')),
    ["flag-black"]: IconProvider(require('img/icons/flag-black.svg')),
    ["overdue-black"]: IconProvider(require('img/icons/overdue-black.svg')),
    ["flag-white"]: IconProvider(require('img/icons/flag-white.svg')),
    ["overdue-white"]: IconProvider(require('img/icons/overdue-white.svg')),

    ["nav-home"]: IconProvider(require('img/icons/svg/home.svg')),
    ["nav-home-active"]: IconProvider(require('img/icons/svg/home-filled.svg')),
    ["nav-people"]: IconProvider(require('img/icons/svg/people.svg')),
    ["nav-people-active"]: IconProvider(require('img/icons/svg/people-filled.svg')),
    ["nav-wrench"]: IconProvider(require('img/icons/svg/wrench.svg')),
    ["nav-wrench-active"]: IconProvider(require('img/icons/svg/wrench-filled.svg')),
    ["nav-document"]: IconProvider(require('img/icons/svg/document.svg')),
    ["nav-document-active"]: IconProvider(require('img/icons/svg/document-filled.svg')),
    ["nav-list"]: IconProvider(require('img/icons/svg/list.svg')),
    ["nav-list-active"]: IconProvider(require('img/icons/svg/list-filled.svg')),
    ["nav-person"]: IconProvider(require('img/icons/svg/person.svg')),
    ["nav-person-active"]: IconProvider(require('img/icons/svg/person-filled.svg')),
    save: IconProvider(require("img/icons/save.svg")),
    ["edit-icon"]: IconProvider(require("img/icons/edit-icon.svg")),
    move: IconProvider(require("img/icons/move.svg")),
    download: IconProvider(require("img/icons/download.svg")),
    send: IconProvider(require("img/icons/send.svg")),
    ["add_archive"]: IconProvider(require("img/icons/add_archive.svg")),
    remove: IconProvider(require("img/icons/remove.svg")),
    share: IconProvider(require("img/icons/share.svg")),
    ['red-dustbin']: IconProvider(require("img/icons/red-dustbin.svg")),
    ['cross-filled']: IconProvider(require('img/icons/svg/cross-filled.svg'))
  },
};

export default PmIconsPack;
