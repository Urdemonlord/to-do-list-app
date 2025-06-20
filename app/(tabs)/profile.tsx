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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient colors={['#5f33e1', '#7c4dff']} style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>LV</Text>
            </View>
            <Text style={styles.userName}>Livia Vaccaro</Text>
            <Text style={styles.userEmail}>livia.vaccaro@email.com</Text>            <TouchableOpacity style={styles.editButton}>
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
        </View>        {/* Current Task Progress */}
        <View style={styles.currentTaskSection}>
          <Text style={styles.sectionTitle}>Tugas Saat Ini</Text>
          <View style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Buat Wireframe</Text>
                <Text style={styles.taskCategory}>Desain Aplikasi Mobile</Text>
              </View>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>Tinggi</Text>
              </View>
            </View>
            <View style={styles.taskProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%' }]} />
              </View>
              <Text style={styles.progressText}>75%</Text>
            </View>
            <Text style={styles.dueText}>Batas: Hari ini</Text>
          </View>
        </View>        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Pengaturan</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.title)}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>
                  <item.icon size={20} color="#5f33e1" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.menuRight}>
                {item.title === 'Notifikasi' ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#ccc', true: '#5f33e1' }}
                  />
                ) : item.title === 'Mode Gelap' ? (
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                    trackColor={{ false: '#ccc', true: '#5f33e1' }}
                  />
                ) : (
                  <ChevronRight size={20} color="#ccc" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <LogOut size={20} color="#ff6b6b" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -20,
    marginBottom: 24,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#24252c',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  currentTaskSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#24252c',
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  taskCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  taskCategory: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  priorityBadge: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  taskProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5f33e1',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5f33e1',
    fontFamily: 'Inter-SemiBold',
  },
  dueText: {
    fontSize: 12,
    color: '#ff6b6b',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  menuSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    marginBottom: 2,
    fontFamily: 'Inter-SemiBold',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  menuRight: {
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
    fontFamily: 'Inter-SemiBold',
  },
});