import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Calendar, Folder, Check, Briefcase, User, BookOpen, Heart, Home, Car } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ProjectStorage } from '../utils/storage';

export default function AddProjectScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  const [selectedDate, setSelectedDate] = useState('25 Jan, 2024');
  const [selectedColor, setSelectedColor] = useState('#5f33e1');

  const projectColors = [
    '#5f33e1',
    '#ff6b6b',
    '#4ecdc4',
    '#ffa726',
    '#ab47bc',
    '#26a69a',
    '#ef5350',
    '#42a5f5',
  ];

  const projectTypes = [
    { id: 'work', name: 'Kerja', icon: Briefcase },
    { id: 'personal', name: 'Pribadi', icon: User },
    { id: 'study', name: 'Belajar', icon: BookOpen },
    { id: 'health', name: 'Kesehatan', icon: Heart },
    { id: 'home', name: 'Rumah', icon: Home },
    { id: 'travel', name: 'Perjalanan', icon: Car },
  ];

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'Silakan masukkan nama proyek');
      return;
    }

    if (!projectType) {
      Alert.alert('Error', 'Silakan pilih tipe proyek');
      return;
    }

    try {
      await ProjectStorage.addProject({
        title: projectName,
        description: projectDescription,
        type: projectType,
        color: selectedColor,
        taskCount: 0,
        completedTasks: 0,
      });

      Alert.alert(
        'Berhasil',
        'Proyek berhasil dibuat!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Gagal membuat proyek');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Tambah Proyek</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Project Name */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Nama Proyek</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
            placeholder="Masukkan nama proyek..."
            placeholderTextColor={theme.textSecondary}
            value={projectName}
            onChangeText={setProjectName}
          />
        </View>

        {/* Project Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Deskripsi</Text>          <TextInput
            style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
            placeholder="Masukkan deskripsi proyek..."
            placeholderTextColor={theme.textSecondary}
            value={projectDescription}
            onChangeText={setProjectDescription}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Project Type */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Tipe Proyek</Text>
          <View style={styles.typeContainer}>
            {projectTypes.map((type) => {
              const Icon = type.icon;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeItem,
                    { backgroundColor: theme.surface, borderColor: theme.border },
                    projectType === type.id && {
                      backgroundColor: theme.primary + '20',
                      borderColor: theme.primary,
                    },
                  ]}
                  onPress={() => setProjectType(type.id)}
                >
                  <Icon 
                    size={20} 
                    color={projectType === type.id ? theme.primary : theme.textSecondary} 
                  />
                  <Text style={[
                    styles.typeText,
                    { color: theme.text },
                    projectType === type.id && { color: theme.primary }
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Project Color */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Warna Proyek</Text>
          <View style={styles.colorContainer}>
            {projectColors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorItem,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Check size={16} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Due Date */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Tanggal Target</Text>
          <TouchableOpacity style={[styles.dateButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => {}} // Tambahkan fungsi pemilih tanggal di sini
          >
            <Calendar size={20} color={theme.primary} />
            <Text style={[styles.dateText, { color: theme.text }]}>{selectedDate}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.createButton, { backgroundColor: theme.primary }]}
          onPress={handleCreateProject}
        >
          <Check size={20} color="white" />
          <Text style={styles.createButtonText}>Buat Proyek</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  backButton: {
    padding: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholder: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  textInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    height: 100,
    paddingTop: 16,
    textAlignVertical: 'top',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    fontFamily: 'Inter-Regular',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeItem: {
    flex: 1,
    minWidth: '30%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    fontFamily: 'Inter-SemiBold',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
  createButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
});
