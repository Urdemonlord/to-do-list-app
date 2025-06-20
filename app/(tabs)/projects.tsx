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
  ];
  
  const handleProjectPress = (projectId: number) => {
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

  const handleProjectOptions = (projectId: number) => {
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
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Proyek</Text>
            <Text style={styles.subtitle}>Daftar semua proyek aktif</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/add-project')}
            activeOpacity={0.7}
          >
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Project Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{projects.length}</Text>
            <Text style={styles.statLabel}>Total Proyek</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {projects.filter(p => p.progress === 100).length}
            </Text>
            <Text style={styles.statLabel}>Selesai</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {projects.filter(p => p.progress < 100).length}
            </Text>
            <Text style={styles.statLabel}>Berlangsung</Text>
          </View>
        </View>

        {/* Projects Grid */}
        <View style={styles.projectsGrid}>
          {projects.map((project) => (
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
                    <Text style={styles.statText}>{project.dueDate}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Users size={16} color="white" />
                    <Text style={styles.statText}>{project.members} anggota</Text>
                  </View>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${project.progress}%` }
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {project.completedTasks}/{project.totalTasks} tugas
                  </Text>
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
    backgroundColor: '#f3f0ff',
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
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5f33e1',
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
    backgroundColor: 'white',
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
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
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