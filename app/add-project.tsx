import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { 
  ArrowLeft, 
  Briefcase, 
  User, 
  GraduationCap, 
  Heart, 
  Home, 
  Car,
  Calendar,
  ChevronDown,
  Check
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function AddProjectScreen() {
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [selectedDate, setSelectedDate] = useState('25 Jan, 2022');
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
    { icon: Briefcase, label: 'Work', value: 'work' },
    { icon: User, label: 'Personal', value: 'personal' },
    { icon: GraduationCap, label: 'Study', value: 'study' },
    { icon: Heart, label: 'Health', value: 'health' },
    { icon: Home, label: 'Home', value: 'home' },
    { icon: Car, label: 'Travel', value: 'travel' },
  ];

  const handleCreateProject = () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'Please enter a project name');
      return;
    }

    if (!projectType) {
      Alert.alert('Error', 'Please select a project type');
      return;
    }

    Alert.alert(
      'Success',
      'Project created successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#24252c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Project</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Project Name */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Project Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter project name"
            value={projectName}
            onChangeText={setProjectName}
            placeholderTextColor="#999"
          />
        </View>

        {/* Project Type */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Project Type</Text>
          <View style={styles.typeGrid}>
            {projectTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.typeItem,
                  projectType === type.value && styles.selectedTypeItem,
                ]}
                onPress={() => setProjectType(type.value)}
              >
                <type.icon
                  size={24}
                  color={projectType === type.value ? 'white' : '#5f33e1'}
                />
                <Text
                  style={[
                    styles.typeLabel,
                    projectType === type.value && styles.selectedTypeLabel,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Start Date</Text>
          <TouchableOpacity style={styles.dateInput}>
            <Calendar size={20} color="#666" />
            <Text style={styles.dateText}>{selectedDate}</Text>
            <ChevronDown size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Color Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Project Color</Text>
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
              >
                {selectedColor === color && (
                  <Check size={16} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Description (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Enter project description"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        {/* Preview Card */}
        <View style={styles.previewSection}>
          <Text style={styles.inputLabel}>Preview</Text>
          <View style={[styles.previewCard, { backgroundColor: selectedColor }]}>
            <View style={styles.previewHeader}>
              <Folder size={24} color="white" />
              <Text style={styles.previewTaskCount}>0 tasks</Text>
            </View>
            <Text style={styles.previewTitle}>
              {projectName || 'Project Name'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: selectedColor }]}
          onPress={handleCreateProject}
        >
          <Text style={styles.createButtonText}>Create Project</Text>
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
    gap: 12,
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
    flex: 1,
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