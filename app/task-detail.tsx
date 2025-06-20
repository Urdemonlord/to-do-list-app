import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Clock, 
  Calendar, 
  Flag, 
  User, 
  CheckCircle,
  Circle,
  MessageSquare,
  Paperclip
} from 'lucide-react-native';

export default function TaskDetailScreen() {
  const router = useRouter();
  const { taskId } = useLocalSearchParams();
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock data untuk detail tugas
  const taskDetail = {
    id: taskId || '1',
    title: 'Analisis Kompetitif',
    description: 'Melakukan analisis mendalam terhadap kompetitor utama untuk memahami strategi dan positioning mereka di pasar.',
    category: 'Sprint Desain',
    status: 'Sedang Berlangsung',
    priority: 'Tinggi',
    dueDate: '25 Jan 2024',
    dueTime: '14:00',
    assignee: 'Tim Desain',
    progress: 65,
    comments: 3,
    attachments: 2,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Tinggi':
        return '#ff6b6b';
      case 'Sedang':
        return '#ffa726';
      case 'Rendah':
        return '#4ecdc4';
      default:
        return '#ccc';
    }
  };

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
    Alert.alert(
      'Status Tugas',
      isCompleted ? 'Tugas ditandai belum selesai' : 'Tugas ditandai selesai!',
      [{ text: 'OK' }]
    );
  };

  const handleEditTask = () => {
    Alert.alert('Edit Tugas', 'Fitur edit tugas akan segera hadir!');
  };

  const handleDeleteTask = () => {
    Alert.alert(
      'Hapus Tugas',
      'Apakah Anda yakin ingin menghapus tugas ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Terhapus', 'Tugas berhasil dihapus');
            router.back();
          },
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
        <Text style={styles.headerTitle}>Detail Tugas</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleEditTask} style={styles.actionButton}>
            <Edit size={20} color="#5f33e1" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteTask} style={styles.actionButton}>
            <Trash2 size={20} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Task Card */}
        <View style={styles.taskCard}>
          {/* Status Toggle */}
          <TouchableOpacity 
            style={styles.statusToggle}
            onPress={handleToggleComplete}
            activeOpacity={0.7}
          >
            {isCompleted ? (
              <CheckCircle size={24} color="#4ecdc4" />
            ) : (
              <Circle size={24} color="#ccc" />
            )}
            <Text style={[
              styles.statusText,
              isCompleted && styles.completedText
            ]}>
              {isCompleted ? 'Selesai' : 'Tandai Selesai'}
            </Text>
          </TouchableOpacity>

          {/* Task Title */}
          <Text style={[
            styles.taskTitle,
            isCompleted && styles.completedTitle
          ]}>
            {taskDetail.title}
          </Text>

          {/* Task Description */}
          <Text style={styles.taskDescription}>
            {taskDetail.description}
          </Text>

          {/* Task Meta */}
          <View style={styles.taskMeta}>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Calendar size={16} color="#666" />
                <Text style={styles.metaText}>{taskDetail.dueDate}</Text>
              </View>
              <View style={styles.metaItem}>
                <Clock size={16} color="#666" />
                <Text style={styles.metaText}>{taskDetail.dueTime}</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Flag size={16} color={getPriorityColor(taskDetail.priority)} />
                <Text style={styles.metaText}>Prioritas {taskDetail.priority}</Text>
              </View>
              <View style={styles.metaItem}>
                <User size={16} color="#666" />
                <Text style={styles.metaText}>{taskDetail.assignee}</Text>
              </View>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressPercentage}>{taskDetail.progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${taskDetail.progress}%` }
              ]} />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Aksi Cepat</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionItem}>
              <MessageSquare size={20} color="#5f33e1" />
              <Text style={styles.actionText}>Komentar</Text>
              <Text style={styles.actionCount}>{taskDetail.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <Paperclip size={20} color="#5f33e1" />
              <Text style={styles.actionText}>Lampiran</Text>
              <Text style={styles.actionCount}>{taskDetail.attachments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} onPress={handleEditTask}>
              <Edit size={20} color="#5f33e1" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Project Info */}
        <View style={styles.projectInfo}>
          <Text style={styles.sectionTitle}>Informasi Proyek</Text>
          <View style={styles.projectCard}>
            <LinearGradient
              colors={['#5f33e1', '#7c4dff']}
              style={styles.projectGradient}
            >
              <Text style={styles.projectCategory}>{taskDetail.category}</Text>
              <Text style={styles.projectStatus}>{taskDetail.status}</Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity 
          onPress={handleToggleComplete}
          style={[
            styles.completeButton,
            isCompleted && styles.completedButton
          ]}
        >
          <LinearGradient
            colors={
              isCompleted 
                ? ['#4ecdc4', '#26a69a'] 
                : ['#5f33e1', '#7c4dff']
            }
            style={styles.buttonGradient}
          >
            {isCompleted ? (
              <CheckCircle size={20} color="white" />
            ) : (
              <Circle size={20} color="white" />
            )}
            <Text style={styles.completeButtonText}>
              {isCompleted ? 'Selesai' : 'Tandai Selesai'}
            </Text>
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    fontFamily: 'Inter-SemiBold',
  },
  completedText: {
    color: '#4ecdc4',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#24252c',
    marginBottom: 12,
    fontFamily: 'Inter-Bold',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  taskMeta: {
    gap: 12,
    marginBottom: 24,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  progressSection: {
    gap: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    fontFamily: 'Inter-SemiBold',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5f33e1',
    fontFamily: 'Inter-Bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5f33e1',
    borderRadius: 4,
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#24252c',
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
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
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#24252c',
    fontFamily: 'Inter-SemiBold',
  },
  actionCount: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  projectInfo: {
    marginBottom: 24,
  },
  projectCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  projectGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectCategory: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  projectStatus: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    fontFamily: 'Inter-Regular',
  },
  bottomAction: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
  completeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  completedButton: {
    opacity: 0.8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
});
