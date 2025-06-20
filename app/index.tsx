import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, ArrowRight, Smartphone, Monitor, Tablet, Sparkles, Shield, Zap } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  const features = [
    {
      icon: Sparkles,
      title: 'Lapisan Terorganisir',
      subtitle: 'Struktur yang rapi dan mudah digunakan'
    },
    {
      icon: Shield,
      title: 'Desain Modern & Aman',
      subtitle: 'Interface yang elegan dan data terlindungi'
    },
    {
      icon: Zap,
      title: 'Performa Tinggi',
      subtitle: 'Aplikasi yang cepat dan responsif'
    },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.push('/(tabs)');  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient 
        colors={['#667eea', '#764ba2', '#f093fb']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View 
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <LinearGradient
                    colors={['#ffffff', '#f8f9ff']}
                    style={styles.logo}
                  >
                    <Check size={32} color="#667eea" strokeWidth={3} />
                  </LinearGradient>
                </View>
                <Text style={styles.title}>TaskFlow</Text>
                <Text style={styles.subtitle}>Manajemen Tugas Terbaik</Text>
                <Text style={styles.description}>
                  Kelola tugas dan proyek Anda dengan mudah, efisien, dan terorganisir
                </Text>
              </View>

              {/* Features */}
              <View style={styles.featuresContainer}>
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Animated.View 
                      key={index} 
                      style={[
                        styles.featureItem,
                        {
                          opacity: fadeAnim,
                          transform: [{ 
                            translateY: Animated.add(slideAnim, new Animated.Value(index * 10))
                          }],
                        },
                      ]}
                    >
                      <LinearGradient
                        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                        style={styles.featureCard}
                      >
                        <View style={styles.featureIconContainer}>
                          <LinearGradient
                            colors={['#667eea', '#764ba2']}
                            style={styles.featureIcon}
                          >
                            <IconComponent size={20} color="white" strokeWidth={2.5} />
                          </LinearGradient>
                        </View>
                        <View style={styles.featureContent}>
                          <Text style={styles.featureTitle}>{feature.title}</Text>
                          <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                        </View>
                      </LinearGradient>
                    </Animated.View>
                  );
                })}
              </View>

              {/* Platform Support */}
              <View style={styles.platformSection}>
                <Text style={styles.platformTitle}>✨ Tersedia di semua platform</Text>
                <View style={styles.platformsContainer}>
                  {[
                    { icon: Smartphone, label: 'Mobile' },
                    { icon: Tablet, label: 'Tablet' },
                    { icon: Monitor, label: 'Desktop' },
                  ].map((platform, index) => {
                    const PlatformIcon = platform.icon;
                    return (
                      <Animated.View 
                        key={index} 
                        style={[
                          styles.platformIcon,
                          {
                            opacity: fadeAnim,
                            transform: [{ 
                              scale: Animated.add(fadeAnim, new Animated.Value(0.2))
                            }],
                          },
                        ]}
                      >
                        <LinearGradient
                          colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.8)']}
                          style={styles.platformIconBg}
                        >
                          <PlatformIcon size={24} color="#667eea" strokeWidth={2} />
                        </LinearGradient>
                        <Text style={styles.platformText}>{platform.label}</Text>
                      </Animated.View>
                    );
                  })}
                </View>
              </View>

              {/* Get Started Button - TOMBOL INI! */}
              <Animated.View 
                style={[
                  styles.buttonContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: fadeAnim }],
                  },
                ]}
              >
                <TouchableOpacity 
                  style={styles.getStartedButton}
                  onPress={handleGetStarted}
                  activeOpacity={0.95}
                >
                  <LinearGradient
                    colors={['#ffffff', '#f8f9ff']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>🚀 MULAI SEKARANG</Text>
                    <View style={styles.buttonIconContainer}>
                      <ArrowRight size={24} color="#667eea" strokeWidth={3} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 40,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginBottom: 40,
    gap: 16,
  },
  featureItem: {
    marginBottom: 4,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIconContainer: {
    marginRight: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  featureContent: {
    flex: 1,
  },  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  platformSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  platformTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
    fontFamily: 'Inter-SemiBold',
  },
  platformsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  platformIcon: {
    alignItems: 'center',
    gap: 8,
  },
  platformIconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  platformText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter-SemiBold',
  },
  buttonContainer: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  getStartedButton: {
    overflow: 'hidden',
    borderRadius: 25,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    marginVertical: 10,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',    paddingVertical: 22,
    paddingHorizontal: 50,
    gap: 15,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#667eea',
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  buttonIconContainer: {
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    borderRadius: 15,
    padding: 10,
  },
});