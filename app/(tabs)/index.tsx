import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Folder, Plus, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const projectCards = [
    { id: 1, title: 'Proyek Kantor', taskCount: 5, color: '#5f33e1' },
    { id: 2, title: 'Proyek Pribadi', taskCount: 3, color: '#ff6b6b' },
    { id: 3, title: 'Belajar Harian', taskCount: 2, color: '#4ecdc4' },
  ];

  const recentTasks = [
    { id: 1, title: 'Analisis Kompetitor', category: 'Sprint Desain', status: 'Sedang Berlangsung' },
    { id: 2, title: 'Wireframe UX', category: 'Aplikasi Grocery', status: 'Selesai' },
    { id: 3, title: 'Riset Pengguna', category: 'Aplikasi Mobile', status: 'Tertunda' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai':
        return '#4ecdc4';
      case 'Sedang Berlangsung':
        return '#ffa726';
      case 'Tertunda':
        return '#ff6b6b';
      default:
        return '#666';
    }
  };

  const handleProjectPress = (projectId: number) => {
    router.push('/(tabs)/projects');
  };

  const handleAddProject = () => {
    router.push('/add-project' as any);
  };

  const handleViewAllProjects = () => {
    router.push('/(tabs)/projects');
  };

  const handleViewAllTasks = () => {
    router.push('/(tabs)/tasks');
  };

  const handleTaskPress = (taskId: number) => {
    router.push(`/task-detail?id=${taskId}` as any);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Selamat Pagi!</Text>
            <Text style={styles.userName}>Livia Vaccaro</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>LV</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Tugas Hari Ini</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Selesai</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Sedang Berlangsung</Text>
          </View>
        </View>        {/* Project Cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Proyek</Text>
          <TouchableOpacity 
            onPress={handleAddProject}
            activeOpacity={0.7}
          >
            <Plus size={24} color="#5f33e1" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.projectsScroll}
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {projectCards.map((project) => (
            <TouchableOpacity 
              key={project.id} 
              style={styles.projectCard}
              onPress={() => handleProjectPress(project.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[project.color, `${project.color}CC`]}
                style={styles.projectGradient}
              >
                <View style={styles.projectHeader}>
                  <Folder size={24} color="white" />
                  <Text style={styles.taskCount}>{project.taskCount} tugas</Text>
                </View>
                <Text style={styles.projectTitle}>{project.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>        {/* Recent Tasks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tugas Terbaru</Text>
          <TouchableOpacity 
            onPress={handleViewAllTasks}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tasksContainer}>
          {recentTasks.map((task) => (
            <TouchableOpacity 
              key={task.id} 
              style={styles.taskItem}
              onPress={() => handleTaskPress(task.id)}
              activeOpacity={0.7}
            >
              <View style={styles.taskLeft}>
                <View style={[styles.taskStatus, { backgroundColor: getStatusColor(task.status) }]} />
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskCategory}>{task.category}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  container: {
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
    backgroundColor: '#f8f9fa',
    zIndex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#24252c',
    fontFamily: 'Inter-Bold',
  },
  profileButton: {
    padding: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5f33e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 80,
  },  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#24252c',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },  statLabel: {
    fontSize: 11,
    color: '#666',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#24252c',
    fontFamily: 'Inter-Bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#5f33e1',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },  projectsScroll: {
    paddingLeft: 24,
    marginBottom: 24,
    maxHeight: 140,
  },  projectCard: {
    width: width * 0.55,
    marginRight: 16,
  },
  projectGradient: {
    padding: 16,
    borderRadius: 16,
    height: 120,
    justifyContent: 'space-between',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskCount: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    fontFamily: 'Inter-Regular',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },  tasksContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  taskCategory: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
});
