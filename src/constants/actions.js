const { compact } = require("lodash-es");

export const backAction =  {
    left: true,
    icon: 'arrow-ios-back',
};

const editAction = {
    icon: 'edit',
    pack: 'pm',
    height: 18,
    width: 18,
};

const filterAction = {
    icon: 'filter',
    pack: 'pm',
    status: 'basic',
    height: 18,
    width: 18,
};

const boxesAction = {
    left: true,
    icon: 'boxes',
    pack: 'pm',
    status: 'basic',
    height: 18,
    width: 18,
};

const  exportAction  = {
    icon: "export", pack: "pm"
}

const plusAction = {
    icon: "plus",
    height: 18,
    width: 18,
    style: {marginTop: -3}
}

const editIconAction = {
    icon: "edit_icon",
    pack: "pm",
    height: 18,
    width: 18,
    style: {marginTop: -3}
}

const actions = {
    back: backAction,
    edit: editAction,
    filter: filterAction,
    boxes: boxesAction,
    export: exportAction,
    plus: plusAction,
    editIcon: editIconAction
};

export const getActions = (...args) => compact(args).map(([key, additional]) => ({ ...actions[key], ...additional }))
