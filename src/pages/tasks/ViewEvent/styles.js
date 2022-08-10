const sectionContainer = {
    marginLeft: 3,
    marginRight: 3
}

export const styles = {
    sectionContainer: {
    },
    features: theme =>   ({
        container: { width: '100%', marginBottom: 3 },
        content: {
            color: theme['color-primary-700'],
            textTransform: 'uppercase',
            fontSize: 14,
        },
        label: { textTransform: 'uppercase' },
        row: { marginTop: 7 },
        icon: { height: 18, width: 18 },
    }),
    buttonContainer: {
        marginTop: 3,
        marginBottom: 3,
        margin: 3,
        paddingHorizontal: 18,
    },
    assignees: {
        content: { marginTop: 1, mx: 0 },
        label: { marginBottom: 0, marginTop: 0 },
        container: { marginTop: 1, ...sectionContainer },
        avatar: { container: { px: 0 }, avatar: { size: null }, textContainer: { ml: 1 } },
    },

    buildingSection: {
        content: { marginTop: 1, mx: 0 },
        label: { marginBottom: 0 },
        container: { marginTop: 1, marginBottom: 1, ...sectionContainer },
    },
    building: {
        container: { px: 0 },
        avatar: { size: null },
        textContainer: { ml: 1 },
    },
    content: {
        content: { margin: 0 },
        container: { marginBottom: 0, ...sectionContainer },
    },
};
