import React from 'react';
import { useRouter } from 'expo-router';
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

const { width } = Dimensions.get('window');

export default function ProjectsScreen() {
  const router = useRouter();

  const projects = [
    {
      id: 1,
      title: 'Aplikasi Mobile',
      description: 'Pengembangan aplikasi mobile untuk e-commerce',
      color: '#5f33e1',
      progress: 75,
      totalTasks: 12,
      completedTasks: 9,
      dueDate: '15 Feb 2024',
      members: 4,
    },
    {
      id: 2,
      title: 'Website Perusahaan',
      description: 'Redesign website utama perusahaan',
      color: '#ff6b6b',
      progress: 45,
      totalTasks: 8,
      completedTasks: 4,
      dueDate: '28 Feb 2024',
      members: 3,
    },
    {
      id: 3,
      title: 'Sistem Manajemen',
      description: 'Sistem manajemen internal untuk HR',
      color: '#4ecdc4',
      progress: 90,
      totalTasks: 15,
      completedTasks: 14,
      dueDate: '10 Feb 2024',
      members: 5,
    },
    {
      id: 4,
      title: 'Marketing Campaign',
      description: 'Kampanye pemasaran digital Q1 2024',
      color: '#ffa726',
      progress: 30,
      totalTasks: 6,
      completedTasks: 2,
      dueDate: '31 Mar 2024',
      members: 2,
    },
  ];  const handleProjectPress = (projectId: number) => {
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

  const handleAddProject = () => {
    router.push('/add-project' as any);
  };

  return (
    <SafeAreaView style={styles.container}>      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Proyek</Text>
        <TouchableOpacity 
          onPress={handleAddProject}
          activeOpacity={0.7}
        >
          <Plus size={24} color="#5f33e1" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{projects.length}</Text>
          <Text style={styles.statLabel}>Total Proyek</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {projects.filter((p) => p.progress === 100).length}
          </Text>
          <Text style={styles.statLabel}>Selesai</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {projects.filter((p) => p.progress < 100).length}
          </Text>
          <Text style={styles.statLabel}>Sedang Berlangsung</Text>
        </View>
      </View>

      <ScrollView style={styles.projectsContainer} showsVerticalScrollIndicator={false}>
        {/* Add Project Card */}
        <TouchableOpacity
          style={styles.addProjectCard}
          onPress={handleAddProject}
          activeOpacity={0.7}
        >
          <View style={styles.addProjectContent}>
            <View style={styles.addIcon}>
              <Plus size={24} color="#5f33e1" />
            </View>
            <Text style={styles.addProjectText}>Buat Proyek Baru</Text>
            <Text style={styles.addProjectSubtext}>
              Mulai proyek baru dan kelola tugas-tugas Anda dengan mudah
            </Text>
          </View>
        </TouchableOpacity>

        {/* Projects Grid */}
        <View style={styles.projectsGrid}>
          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={styles.projectCard}
              onPress={() => handleProjectPress(project.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[project.color, `${project.color}dd`]}
                style={styles.projectGradient}
              >
                <View style={styles.projectHeader}>
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                </View>

                <View style={styles.projectFooter}>
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskCount}>
                      {project.completedTasks}/{project.totalTasks} tugas
                    </Text>
                    <View style={styles.projectMeta}>
                      <View style={styles.metaItem}>
                        <Calendar size={12} color="white" />
                        <Text style={styles.metaText}>{project.dueDate}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Users size={12} color="white" />
                        <Text style={styles.metaText}>{project.members}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${project.progress}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>{project.progress}%</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#24252c',
    fontFamily: 'Inter-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
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
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#24252c',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  projectsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  addProjectCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  addProjectContent: {
    alignItems: 'center',
  },
  addIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f3f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addProjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  addProjectSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectCard: {
    width: (width - 60) / 2,
    marginBottom: 16,
  },
  projectGradient: {
    padding: 16,
    borderRadius: 16,
    height: 220,
    justifyContent: 'space-between',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  projectContent: {
    flex: 1,
    justifyContent: 'center',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  projectDescription: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
  },
  projectFooter: {
    gap: 12,
  },
  taskInfo: {
    gap: 8,
  },
  taskCount: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Inter-Regular',
  },
  projectMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 10,
    color: 'white',
    opacity: 0.8,
    fontFamily: 'Inter-Regular',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});