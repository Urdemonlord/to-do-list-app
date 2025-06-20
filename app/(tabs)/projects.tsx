import React, { useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, MoreHorizontal, Calendar, Users } from 'lucide-react-native';
import { ProjectStorage, Project } from '../../utils/storage';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function ProjectsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = useCallback(async () => {
    const storedProjects = await ProjectStorage.getProjects();
    setProjects(storedProjects);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProjects();
    }, [fetchProjects])
  );

  const handleProjectPress = (projectId: string) => {
    Alert.alert(
      'Detail Proyek',
      `Membuka detail proyek ${projectId}`,
      [
        { text: 'Tutup', style: 'cancel' },
        { text: 'Edit', onPress: () => console.log('Edit project') },
        { text: 'Lihat Tugas', onPress: () => router.push('/(tabs)/tasks') },
      ]
    );
  };

  const handleProjectOptions = (projectId: string) => {
    Alert.alert(
      'Opsi Proyek',
      'Pilih tindakan untuk proyek ini',
      [
        {
          text: 'Lihat Detail',
          onPress: () => handleProjectPress(projectId),
        },
        {
          text: 'Edit Proyek',
          onPress: () => router.push({
            pathname: '/edit-project',
            params: { id: projectId }
          } as any),
        },
        {
          text: 'Lihat Tugas',
          onPress: () => router.push({
            pathname: '/(tabs)/tasks',
            params: { projectId }
          } as any),
        },
        {
          text: 'Batal',
          style: 'cancel',
        },
      ],
    );
  };

  const handleAddProject = () => {
    router.push('/add-project' as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: theme.text }]}>Proyek</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Daftar semua proyek aktif</Text>
          </View>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push('/add-project')}
            activeOpacity={0.7}
          >
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Project Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>{projects.length}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Total Proyek</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {projects.filter(p => p.completedTasks === p.taskCount).length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Selesai</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {projects.filter(p => p.completedTasks < p.taskCount).length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Berlangsung</Text>
          </View>
        </View>

        {/* Projects Grid */}
        <View style={styles.projectsGrid}>
          {projects.map((project) => {
            const progress = project.taskCount > 0 ? (project.completedTasks / project.taskCount) * 100 : 0;
            return (
            <TouchableOpacity
              key={project.id}
              style={styles.projectCard}
              onPress={() => handleProjectPress(project.id)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={[project.color, `${project.color}dd`]}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.projectTitle} numberOfLines={1}>
                    {project.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleProjectOptions(project.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MoreHorizontal size={20} color="white" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.projectDescription} numberOfLines={2}>
                  {project.description}
                </Text>

                <View style={styles.projectStats}>
                  <View style={styles.statRow}>
                    <Calendar size={16} color="white" />
                    <Text style={styles.statText}>{new Date(project.createdAt).toLocaleDateString('id-ID')}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Users size={16} color="white" />
                    <Text style={styles.statText}>{project.taskCount} tugas</Text>
                  </View>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${progress}%` }
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {project.completedTasks}/{project.taskCount} tugas
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )})}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  projectCard: {
    width: (width - 56) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardGradient: {
    padding: 16,
    height: 200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    flex: 1,
  },
  projectDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'white',
    opacity: 0.9,
    marginBottom: 16,
  },
  projectStats: {
    gap: 8,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'white',
    opacity: 0.9,
  },
  progressContainer: {
    marginTop: 'auto',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'white',
    opacity: 0.9,
  },
});