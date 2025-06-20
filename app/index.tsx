import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, ArrowRight, Smartphone, Monitor, Tablet } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  
  const features = [
    'Lapisan Terorganisir',
    'Desain Bergaya & Modern',
    'Dapat Disesuaikan Sepenuhnya',
    'Dengan Sistem Desain',
  ];

  const handleGetStarted = () => {
    router.push('/(tabs)');
  };

  return (
    <LinearGradient colors={['#f3f0ff', '#e8e3ff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Manajemen</Text>
            <Text style={styles.subtitle}>Tugas Terbaik</Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.checkIcon}>
                  <Check size={16} color="#5f33e1" />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Support Section */}
          <View style={styles.supportSection}>
            <Text style={styles.supportText}>Mendukung berbagai platform</Text>
            <View style={styles.platformsContainer}>
              <View style={styles.platformIcon}>
                <Smartphone size={24} color="#5f33e1" />
                <Text style={styles.platformText}>Mobile</Text>
              </View>
              <View style={styles.platformIcon}>
                <Tablet size={24} color="#5f33e1" />
                <Text style={styles.platformText}>Tablet</Text>
              </View>
              <View style={styles.platformIcon}>
                <Monitor size={24} color="#5f33e1" />
                <Text style={styles.platformText}>Web</Text>
              </View>
            </View>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#5f33e1', '#7c4dff']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Mulai Sekarang</Text>
              <ArrowRight size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Preview Section */}
        <View style={styles.previewSection}>
          <View style={styles.phonePreview}>
            <View style={styles.phoneScreen}>
              <View style={styles.mockHeader}>
                <View style={styles.mockStatusBar} />
                <Text style={styles.mockTitle}>Tugas Hari Ini</Text>
              </View>
              <View style={styles.mockContent}>
                <View style={styles.mockTask} />
                <View style={styles.mockTask} />
                <View style={styles.mockTask} />
                <View style={styles.mockTask} />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#5f33e1',
    lineHeight: 40,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#24252c',
    fontFamily: 'Inter-Bold',
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#24252c',
    fontFamily: 'Inter-Bold',
  },
  supportSection: {
    marginBottom: 40,
  },
  supportText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5f33e1',
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  platformsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  platformIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
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
  platformText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#24252c',
    fontFamily: 'Inter-SemiBold',
  },
  getStartedButton: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  previewSection: {
    position: 'absolute',
    right: -50,
    top: 100,
    width: width * 0.4,
    height: height * 0.6,
  },
  phonePreview: {
    width: '100%',
    height: '100%',
    backgroundColor: '#24252c',
    borderRadius: 20,
    padding: 4,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  mockHeader: {
    marginBottom: 20,
  },
  mockStatusBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 16,
  },
  mockTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#24252c',
    fontFamily: 'Inter-SemiBold',
  },
  mockContent: {
    flex: 1,
    gap: 12,
  },
  mockTask: {
    height: 40,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
});