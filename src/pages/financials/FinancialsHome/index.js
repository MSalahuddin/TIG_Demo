import React from 'react';
import Box from 'components/Box';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity, View, Text, Image} from 'react-native';
import { FINANCIALS_CATEGORIES } from '../const';
import { styles } from './styles';
import SafeAreaView from 'components/SafeAreaView';



const categories = FINANCIALS_CATEGORIES;

const FinancialsHome = ({ navigation }) => {
  const getOnPress = type => () =>
    navigation.navigate('FinancialsFeed', { type });

  return (
    <Box flex={1} as={SafeAreaView} style={styles.mainBox}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.headerLeftButton}>
          <Image
            source={require('img/icons/menu.png')}
            style={styles.headerLeftButtonIcon}
          />
          <Text style={styles.headerLeftButtonText}>menu</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Finances</Text>

        <View style={styles.emptyContainer} />
      </View>

      <View style={styles.secHeadContainer}>
        <View style={styles.secHeadRow}>
          <View style={styles.secHeadButton}>
            <TouchableOpacity onPress={()=> navigation.navigate('ManualExpense')}>
              <Image
                source={require('img/icons/manual-expense.png')}
                style={styles.secHeadButtonIcon}
              />
            </TouchableOpacity>
            <Text style={styles.secHeadButtonText}>Manual Expense</Text>
          </View>
          <View style={styles.secHeadButton}>
            <TouchableOpacity onPress={() => navigation.navigate('ManualPaymentPage')}>
              <Image
                source={require('img/icons/manual-payment.png')}
                style={styles.secHeadButtonIcon}
              />
            </TouchableOpacity>
            <Text style={styles.secHeadButtonText}>Manual Payment</Text>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={categories}
          dataExtractor={item => item}
          renderItem={({ item: { name, type, icon } }) => (
            <TouchableOpacity
              onPress={getOnPress(type)}
              style={styles.categoryItem}>
              <Image source={icon} style={styles.categoryItemIcon} />
              <Text style={styles.categoryItemText}>{name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Box>
  );
};

export default FinancialsHome;
