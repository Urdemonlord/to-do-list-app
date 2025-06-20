import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Bell, 
  Moon, 
  Globe, 
  HelpCircle, 
  Shield, 
  LogOut,
  ChevronRight 
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const menuItems = [
    { icon: User, title: 'Edit Profil', subtitle: 'Perbarui informasi pribadi Anda' },
    { icon: Bell, title: 'Notifikasi', subtitle: 'Kelola preferensi notifikasi Anda' },
    { icon: Moon, title: 'Mode Gelap', subtitle: 'Beralih ke tema gelap' },
    { icon: Globe, title: 'Bahasa', subtitle: 'Ubah bahasa aplikasi' },
    { icon: HelpCircle, title: 'Bantuan & Dukungan', subtitle: 'Dapatkan bantuan dan hubungi dukungan' },
    { icon: Shield, title: 'Kebijakan Privasi', subtitle: 'Baca kebijakan privasi kami' },
  ];

  const stats = [
    { label: 'Tugas Selesai', value: '127' },
    { label: 'Proyek', value: '8' },
    { label: 'Hari Berturut', value: '15' },
  ];

  const handleMenuPress = (title: string) => {
    switch (title) {
      case 'Edit Profil':
        Alert.alert('Edit Profil', 'Fitur akan segera hadir!');
        break;
      case 'Bantuan & Dukungan':
        Alert.alert('Bantuan & Dukungan', 'Hubungi kami di support@todoapp.com');
        break;
      case 'Kebijakan Privasi':
        Alert.alert('Kebijakan Privasi', 'Membuka halaman kebijakan privasi...');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Keluar', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <LinearGradient 
          colors={['#5f33e1', '#7c4dff']} 
          style={styles.profileHeader}
        >
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>LV</Text>
            </View>
            <Text style={styles.userName}>Livia Vaccaro</Text>
            <Text style={styles.userEmail}>livia.vaccaro@email.com</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleMenuPress('Edit Profil')}
            >
              <Text style={styles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.title)}
              >
                <View style={styles.menuItemContent}>
                  <View style={styles.menuItemIcon}>
                    <Icon size={20} color="#5f33e1" />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  </View>
                  {(item.title === 'Notifikasi' || item.title === 'Mode Gelap') ? (
                    <Switch
                      value={item.title === 'Notifikasi' ? notificationsEnabled : darkModeEnabled}
                      onValueChange={item.title === 'Notifikasi' 
                        ? setNotificationsEnabled 
                        : setDarkModeEnabled}
                      trackColor={{ false: '#e0e0e0', true: '#b39ddb' }}
                      thumbColor={
                        (item.title === 'Notifikasi' ? notificationsEnabled : darkModeEnabled) 
                          ? '#5f33e1' 
                          : '#f5f5f5'
                      }
                    />
                  ) : (
                    <ChevronRight size={20} color="#666" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#ff4d4d" />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f0ff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  menuItem: {
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff3f3',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  logoutText: {
    color: '#ff4d4d',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});