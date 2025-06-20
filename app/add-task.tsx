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
import { useTheme } from '../contexts/ThemeContext';
import { TaskStorage } from '../utils/storage';

export default function AddTaskScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Sedang');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
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

  const handleCreateTask = async () => {
    if (!taskTitle.trim()) {
      Alert.alert('Error', 'Silakan masukkan judul tugas');
      return;
    }

    try {
      await TaskStorage.addTask({
        title: taskTitle,
        description: taskDescription,
        category: selectedProject || 'Umum',
        status: 'Sedang Berlangsung',
        priority: selectedPriority as 'Tinggi' | 'Sedang' | 'Rendah',
        dueDate: selectedDate,
      });

      Alert.alert(
        'Berhasil',
        'Tugas berhasil dibuat!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Gagal membuat tugas');
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Tambah Tugas</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Title */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Judul Tugas</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
            placeholder="Masukkan judul tugas..."
            placeholderTextColor={theme.textSecondary}
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </View>

        {/* Task Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Deskripsi</Text>          <TextInput
            style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
            placeholder="Masukkan deskripsi tugas..."
            placeholderTextColor={theme.textSecondary}
            value={taskDescription}
            onChangeText={setTaskDescription}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Priority */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Prioritas</Text>
          <View style={styles.priorityContainer}>
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority.id}
                style={[
                  styles.priorityItem,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                  selectedPriority === priority.id && {
                    backgroundColor: priority.color + '20',
                    borderColor: priority.color,
                  },
                ]}
                onPress={() => setSelectedPriority(priority.id)}
              >
                <View style={[styles.priorityIcon, { backgroundColor: priority.color }]}>
                  <Flag size={16} color="white" />
                </View>
                <Text style={[
                  styles.priorityText,
                  { color: theme.text },
                  selectedPriority === priority.id && { color: priority.color }
                ]}>
                  {priority.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Project */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Proyek</Text>
          <View style={styles.projectContainer}>
            {projects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={[
                  styles.projectItem,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                  selectedProject === project.name && {
                    backgroundColor: theme.primary + '20',
                    borderColor: theme.primary,
                  },
                ]}
                onPress={() => setSelectedProject(project.name)}
              >
                <User size={16} color={selectedProject === project.name ? theme.primary : theme.textSecondary} />
                <Text style={[
                  styles.projectText,
                  { color: theme.text },
                  selectedProject === project.name && { color: theme.primary }
                ]}>
                  {project.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.dateTimeContainer}>
          <View style={[styles.section, { flex: 1, marginRight: 8 }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Tanggal</Text>
            <TouchableOpacity style={[styles.dateTimeButton, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Calendar size={20} color={theme.primary} />
              <Text style={[styles.dateTimeText, { color: theme.text }]}>
                {new Date(selectedDate).toLocaleDateString('id-ID')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.section, { flex: 1, marginLeft: 8 }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Waktu</Text>
            <TouchableOpacity style={[styles.dateTimeButton, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Clock size={20} color={theme.primary} />
              <Text style={[styles.dateTimeText, { color: theme.text }]}>{selectedTime}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.createButton, { backgroundColor: theme.primary }]}
          onPress={handleCreateTask}
        >
          <Check size={20} color="white" />
          <Text style={styles.createButtonText}>Buat Tugas</Text>
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
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 8,
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
  priorityIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  projectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
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
  projectText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
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
  dateTimeText: {
    fontSize: 16,
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
});
