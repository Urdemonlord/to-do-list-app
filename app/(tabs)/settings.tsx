import React, { useState, useEffect } from 'react';
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
import { 
  Bell, 
  Moon, 
  Globe, 
  HelpCircle, 
  Shield, 
  ChevronRight,
  Database,
  Trash2,
} from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { SettingsStorage, TaskStorage, ProjectStorage } from '../../utils/storage';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const loadSettings = async () => {
    try {
      const settings = await SettingsStorage.getSettings();
      setNotificationsEnabled(settings.notifications);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleNotificationToggle = async (value: boolean) => {
    setNotificationsEnabled(value);
    try {
      await SettingsStorage.updateSetting('notifications', value);
    } catch (error) {
      console.error('Error updating notification setting:', error);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Hapus Semua Data',
      'Apakah Anda yakin ingin menghapus semua tugas dan proyek? Tindakan ini tidak dapat dibatalkan.',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await TaskStorage.saveTasks([]);
              await ProjectStorage.saveProjects([]);
              Alert.alert('Berhasil', 'Semua data telah dihapus');
            } catch (error) {
              Alert.alert('Error', 'Gagal menghapus data');
            }
          }
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'Tentang Aplikasi',
      'To-Do List App v1.0\n\nAplikasi manajemen tugas yang berjalan sepenuhnya di perangkat Anda. Semua data disimpan secara lokal dan tidak dikirim ke server manapun.',
      [{ text: 'OK' }]
    );
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const menuItems = [
    { 
      icon: Moon, 
      title: 'Mode Gelap', 
      subtitle: 'Beralih ke tema gelap',
      action: 'toggle-dark',
    },
    { 
      icon: Bell, 
      title: 'Notifikasi', 
      subtitle: 'Kelola preferensi notifikasi',
      action: 'toggle-notifications',
    },
    { 
      icon: Globe, 
      title: 'Bahasa', 
      subtitle: 'Ubah bahasa aplikasi',
      action: 'language',
    },
    { 
      icon: Database, 
      title: 'Data Aplikasi', 
      subtitle: 'Kelola data yang tersimpan',
      action: 'data',
    },
    { 
      icon: Trash2, 
      title: 'Hapus Semua Data', 
      subtitle: 'Hapus semua tugas dan proyek',
      action: 'clear-data',
    },
    { 
      icon: HelpCircle, 
      title: 'Tentang Aplikasi', 
      subtitle: 'Informasi aplikasi',
      action: 'about',
    },
    { 
      icon: Shield, 
      title: 'Kebijakan Privasi', 
      subtitle: 'Data Anda aman dan disimpan lokal',
      action: 'privacy',
    },
  ];

  const handleMenuPress = (action: string) => {
    switch (action) {
      case 'language':
        Alert.alert('Bahasa', 'Saat ini hanya tersedia dalam Bahasa Indonesia');
        break;
      case 'data':
        Alert.alert('Data Aplikasi', 'Semua data disimpan secara lokal di perangkat Anda menggunakan AsyncStorage');
        break;
      case 'clear-data':
        handleClearData();
        break;
      case 'about':
        handleAbout();
        break;
      case 'privacy':
        Alert.alert('Kebijakan Privasi', 'Aplikasi ini tidak mengumpulkan atau mengirim data pribadi Anda ke server manapun. Semua data tersimpan aman di perangkat Anda.');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Pengaturan</Text>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.menuSection, { backgroundColor: theme.surface }]}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border }
                ]}
                onPress={() => handleMenuPress(item.action)}
              >
                <View style={[styles.iconContainer, { backgroundColor: theme.primary + '15'}]}>
                  <Icon size={20} color={theme.primary} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={[styles.menuItemTitle, { color: theme.text }]}>{item.title}</Text>
                  <Text style={[styles.menuItemSubtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>
                </View>
                {item.action === 'toggle-dark' ? (
                  <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#767577', true: theme.primary }}
                    thumbColor={isDark ? theme.surface : '#f4f3f4'}
                  />
                ) : item.action === 'toggle-notifications' ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationToggle}
                    trackColor={{ false: '#767577', true: theme.primary }}
                    thumbColor={notificationsEnabled ? theme.surface : '#f4f3f4'}
                  />
                ) : (
                  <ChevronRight size={20} color={theme.textSecondary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Informasi Aplikasi */}
        <View style={[styles.infoSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>Aplikasi Serverless</Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Aplikasi ini berjalan sepenuhnya di perangkat Anda tanpa memerlukan koneksi internet atau server eksternal. 
            Semua data tugas dan proyek disimpan secara aman menggunakan penyimpanan lokal perangkat.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  scrollContent: {
    paddingVertical: 24,
    paddingBottom: 50,
  },
  menuSection: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  menuItemSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  infoSection: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },  infoText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
});
