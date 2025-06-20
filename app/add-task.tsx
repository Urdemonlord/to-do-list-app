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
import { ArrowLeft, Calendar, Check, Flag, Clock, User } from 'lucide-react-native';

export default function AddTaskScreen() {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Sedang');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedDate, setSelectedDate] = useState('25 Jan, 2024');
  const [selectedTime, setSelectedTime] = useState('09:00');

  const priorities = [
    { id: 'Rendah', name: 'Rendah', color: '#4ecdc4' },
    { id: 'Sedang', name: 'Sedang', color: '#ffa726' },
    { id: 'Tinggi', name: 'Tinggi', color: '#ff6b6b' },
  ];

  const projects = [
    { id: 'mobile-app', name: 'Aplikasi Mobile' },
    { id: 'web-app', name: 'Aplikasi Web' },
    { id: 'design-system', name: 'Sistem Desain' },
    { id: 'marketing', name: 'Kampanye Marketing' },
  ];

  const handleCreateTask = () => {
    if (!taskTitle.trim()) {
      Alert.alert('Error', 'Silakan masukkan judul tugas');
      return;
    }

    Alert.alert(
      'Berhasil',
      'Tugas berhasil dibuat!',
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
        <Text style={styles.headerTitle}>Tambah Tugas</Text>
        <TouchableOpacity onPress={handleCreateTask}>
          <Check size={24} color="#5f33e1" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Task Title */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Judul Tugas</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Masukkan judul tugas"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </View>

        {/* Task Description */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Deskripsi</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Deskripsi tugas (opsional)"
            value={taskDescription}
            onChangeText={setTaskDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Project Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Proyek</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.optionsRow}>
              {projects.map((project) => (
                <TouchableOpacity
                  key={project.id}
                  style={[
                    styles.optionItem,
                    selectedProject === project.id && styles.selectedOptionItem,
                  ]}
                  onPress={() => setSelectedProject(project.id)}
                >
                  <User size={16} color={selectedProject === project.id ? 'white' : '#5f33e1'} />
                  <Text
                    style={[
                      styles.optionText,
                      selectedProject === project.id && styles.selectedOptionText,
                    ]}
                  >
                    {project.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Priority Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Prioritas</Text>
          <View style={styles.priorityGrid}>
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority.id}
                style={[
                  styles.priorityItem,
                  selectedPriority === priority.id && {
                    backgroundColor: priority.color,
                  },
                ]}
                onPress={() => setSelectedPriority(priority.id)}
              >
                <Flag
                  size={20}
                  color={selectedPriority === priority.id ? 'white' : priority.color}
                />
                <Text
                  style={[
                    styles.priorityText,
                    { color: selectedPriority === priority.id ? 'white' : priority.color },
                  ]}
                >
                  {priority.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date and Time */}
        <View style={styles.dateTimeSection}>
          <View style={styles.dateTimeItem}>
            <Text style={styles.inputLabel}>Tanggal</Text>
            <TouchableOpacity style={styles.dateTimeInput}>
              <Calendar size={20} color="#666" />
              <Text style={styles.dateTimeText}>{selectedDate}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateTimeItem}>
            <Text style={styles.inputLabel}>Waktu</Text>
            <TouchableOpacity style={styles.dateTimeInput}>
              <Clock size={20} color="#666" />
              <Text style={styles.dateTimeText}>{selectedTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preview */}
        <View style={styles.previewSection}>
          <Text style={styles.inputLabel}>Pratinjau</Text>
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <View style={styles.previewLeft}>
                <View style={[
                  styles.previewPriority, 
                  { backgroundColor: priorities.find(p => p.id === selectedPriority)?.color }
                ]} />
                <View>
                  <Text style={styles.previewTitle}>
                    {taskTitle || 'Judul Tugas'}
                  </Text>
                  <Text style={styles.previewProject}>
                    {projects.find(p => p.id === selectedProject)?.name || 'Pilih Proyek'}
                  </Text>
                </View>
              </View>
              <View style={[
                styles.previewStatus,
                { backgroundColor: '#ffa726' }
              ]}>
                <Text style={styles.previewStatusText}>Baru</Text>
              </View>
            </View>
            <Text style={styles.previewDate}>{selectedDate} • {selectedTime}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCreateTask}>
          <LinearGradient
            colors={['#5f33e1', '#7c4dff']}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Buat Tugas</Text>
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
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedOptionItem: {
    backgroundColor: '#5f33e1',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#24252c',
    fontFamily: 'Inter-SemiBold',
  },
  selectedOptionText: {
    color: 'white',
  },
  priorityGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  dateTimeSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  dateTimeItem: {
    flex: 1,
  },
  dateTimeInput: {
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
  dateTimeText: {
    fontSize: 16,
    color: '#24252c',
    fontFamily: 'Inter-Regular',
  },
  previewSection: {
    marginBottom: 24,
  },
  previewCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  previewLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  previewPriority: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  previewProject: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  previewStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  previewStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  previewDate: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
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
