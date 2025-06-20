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

export default function AddProjectScreen() {
  const router = useRouter();
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

  const handleCreateProject = () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'Silakan masukkan nama proyek');
      return;
    }

    if (!projectType) {
      Alert.alert('Error', 'Silakan pilih jenis proyek');
      return;
    }

    Alert.alert(
      'Berhasil',
      'Proyek berhasil dibuat!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#24252c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Proyek</Text>
        <TouchableOpacity onPress={handleCreateProject}>
          <Check size={24} color="#5f33e1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Project Name */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Nama Proyek</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Masukkan nama proyek"
            value={projectName}
            onChangeText={setProjectName}
          />
        </View>

        {/* Project Description */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Deskripsi</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Deskripsi proyek (opsional)"
            value={projectDescription}
            onChangeText={setProjectDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Project Type */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Jenis Proyek</Text>
          <View style={styles.typeGrid}>
            {projectTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeItem,
                    projectType === type.id && styles.selectedTypeItem,
                  ]}
                  onPress={() => setProjectType(type.id)}
                >
                  <IconComponent
                    size={24}
                    color={projectType === type.id ? 'white' : '#5f33e1'}
                  />
                  <Text
                    style={[
                      styles.typeLabel,
                      projectType === type.id && styles.selectedTypeLabel,
                    ]}
                  >
                    {type.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Due Date */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Tanggal Target</Text>
          <TouchableOpacity style={styles.dateInput}>
            <Text style={styles.dateText}>{selectedDate}</Text>
            <Calendar size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Color Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Warna Proyek</Text>
          <View style={styles.colorGrid}>
            {projectColors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorItem,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorItem,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        {/* Preview */}
        <View style={styles.previewSection}>
          <Text style={styles.inputLabel}>Pratinjau</Text>
          <LinearGradient
            colors={[selectedColor, `${selectedColor}dd`]}
            style={styles.previewCard}
          >
            <View style={styles.previewHeader}>
              <Text style={styles.previewTaskCount}>0/0 tugas</Text>
              <Folder size={20} color="white" />
            </View>
            <Text style={styles.previewTitle}>
              {projectName || 'Nama Proyek'}
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCreateProject}>
          <LinearGradient
            colors={[selectedColor, `${selectedColor}dd`]}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Buat Proyek</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    color: '#24252c',
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#24252c',
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
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeItem: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedTypeItem: {
    backgroundColor: '#5f33e1',
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#24252c',
    marginTop: 8,
    fontFamily: 'Inter-SemiBold',
  },
  selectedTypeLabel: {
    color: 'white',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'space-between',
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
    color: '#24252c',
    fontFamily: 'Inter-Regular',
  },
  colorGrid: {
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
  selectedColorItem: {
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
  previewSection: {
    marginBottom: 24,
  },
  previewCard: {
    padding: 20,
    borderRadius: 16,
    height: 120,
    justifyContent: 'space-between',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewTaskCount: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    fontFamily: 'Inter-Regular',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
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
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
});
