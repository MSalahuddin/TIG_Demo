import { colors } from "styles/theme";

export const shadowedCard = {
  shadowRadius: 7,
  shadowColor: '#000',
  shadowOffset: {height: 3, width: 1},
  elevation: 4,
  shadowOpacity: 0.7,
};

export const styles = {
  labelContainer: {
    backgroundColor: '#fff',
    height: 54,
    alignSelf: 'flex-end',
    width: '100%',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 0,
    alignItems: 'center',
  },
  labelText: {
    status: null,
    color: '#335150',
    marginLeft: 18,
    fontSize: 18,
    fontWeight: 'bold',
  },
  background: {
    width: '120%',
    height: 108,
    margin: 0,
    marginBottom: 0,
    flexDirection: 'row',
    borderRadius: 18,
    marginLeft: -10,
    zIndex: 1,
    maxHeight: 120,
    position: 'relative',
  },
  container: {
    borderRadius: 10,
    marginTop: '10px',
    justifyContent: 'center',
    shadowRadius: 7,
    overflow: 'hidden',
    mx: 10,
    marginBottom: '3px',
    paddingBottom: 1,
    ...shadowedCard,
    shadowOpacity: 0.36,
  },
  header: {
    width: '100%',
    backgroundColor: colors['primary/50'],
  },
  mainBox: {
    backgroundColor: colors['primary/50'],
  },
  secHeadContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  secHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  secHeadButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secHeadButtonIcon: {
    width: 70,
    height: 70,
  },
  secHeadButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  categoryItem: {
    backgroundColor: colors['gray scale/5'],
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  categoryItemIcon: {
    width: 50,
    height: 50,
  },
  categoryItemText: {
    fontSize: 16,
    color: colors['gray scale/90'],
    marginLeft: 20,
  },
  headerContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerLeftButton: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    paddingVertical: 6,
  },
  headerLeftButtonIcon: {
    width: 16,
    height: 16,
  },
  headerLeftButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 14,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  emptyContainer: {
    width: 75,
  },
};
