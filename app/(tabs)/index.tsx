import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Folder, Plus, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { ProjectStorage, TaskStorage, Project, Task } from '../../utils/storage';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme, isDark } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [projectsData, tasksData] = await Promise.all([
        ProjectStorage.getProjects(),
        TaskStorage.getTasks(),
      ]);
      setProjects(projectsData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const recentTasks = tasks.slice(0, 3);
  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.createdAt).toDateString();
    return today === taskDate;
  });
  const completedTasks = tasks.filter(task => task.status === 'Selesai');
  const inProgressTasks = tasks.filter(task => task.status === 'Sedang Berlangsung');

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
  const handleProjectPress = (projectId: string) => {
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

  const handleTaskPress = (taskId: string) => {
    router.push(`/task-detail?id=${taskId}` as any);
  };  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.greeting, { color: theme.textSecondary }]}>Selamat Pagi!</Text>
            <Text style={[styles.userName, { color: theme.text }]}>Livia Vaccaro</Text>
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
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>{todayTasks.length}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Tugas Hari Ini</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>{completedTasks.length}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Selesai</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>{inProgressTasks.length}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Sedang Berlangsung</Text>
          </View>
        </View>
        {/* Project Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Proyek</Text>
            <TouchableOpacity 
              onPress={handleAddProject}
              activeOpacity={0.7}
            >
              <Plus size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.projectsScroll}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {projects.map((project) => (
              <TouchableOpacity 
                key={project.id} 
                style={styles.projectCard}
                onPress={() => handleProjectPress(project.id)}                activeOpacity={0.8}
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
            <TouchableOpacity 
              style={[styles.addProjectCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={handleAddProject}
              activeOpacity={0.7}
            >
              <View style={styles.addProjectContent}>
                <View style={[styles.addIcon, { backgroundColor: isDark ? theme.primary + '20' : '#f3f0ff' }]}>
                  <Plus size={24} color={theme.primary} />
                </View>
                <Text style={[styles.addProjectText, { color: theme.text }]}>Proyek Baru</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/* Recent Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Tugas Terbaru</Text>
            <TouchableOpacity 
              onPress={handleViewAllTasks}
              activeOpacity={0.7}
            >
              <Text style={[styles.viewAllText, { color: theme.primary }]}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tasksContainer}>
            {recentTasks.length > 0 ? recentTasks.map((task) => (
              <TouchableOpacity 
                key={task.id} 
                style={[styles.taskItem, { backgroundColor: theme.surface }]}
                onPress={() => handleTaskPress(task.id)}
                activeOpacity={0.7}
              >
                <View style={styles.taskLeft}>
                  <View style={[styles.taskStatus, { backgroundColor: getStatusColor(task.status) }]} />
                  <View style={styles.taskInfo}>
                    <Text style={[styles.taskTitle, { color: theme.text }]}>{task.title}</Text>
                    <Text style={[styles.taskCategory, { color: theme.textSecondary }]}>{task.category}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color={theme.border} />
              </TouchableOpacity>
            )) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Belum ada tugas</Text>
                <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>Tambahkan tugas pertama Anda</Text>
              </View>
            )}
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  profileButton: {
    marginLeft: 'auto',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5f33e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },  statCard: {
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
  section: {
    marginBottom: 24,
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
    color: '#1a1a1a',
    fontFamily: 'Inter-Bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#5f33e1',
    fontFamily: 'Inter-SemiBold',
  },
  projectsScroll: {
    paddingLeft: 24,
  },
  projectCard: {
    width: width * 0.6,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  projectGradient: {
    padding: 20,
    height: 160,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'auto',
  },
  taskCount: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Inter-Regular',
  },
  projectTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  addProjectCard: {
    width: width * 0.6,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    marginRight: 24,
  },
  addProjectContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  addIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addProjectText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontFamily: 'Inter-SemiBold',
  },
  tasksContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
    color: '#1a1a1a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },  taskCategory: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },  headerTextContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});
