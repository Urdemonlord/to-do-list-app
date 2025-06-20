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
import { Folder, Plus, MoreHorizontal } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ProjectsScreen() {
  const projects = [
    {
      id: '1',
      title: 'Office Project',
      taskCount: 5,
      completedTasks: 3,
      color: '#5f33e1',
      description: 'Quarterly planning and team coordination',
    },
    {
      id: '2',
      title: 'Personal Project',
      taskCount: 3,
      completedTasks: 1,
      color: '#ff6b6b',
      description: 'Personal development and learning goals',
    },
    {
      id: '3',
      title: 'Daily Study',
      taskCount: 2,
      completedTasks: 2,
      color: '#4ecdc4',
      description: 'Continuous learning and skill improvement',
    },
    {
      id: '4',
      title: 'Health & Fitness',
      taskCount: 4,
      completedTasks: 2,
      color: '#ffa726',
      description: 'Workout routines and health tracking',
    },
  ];

  const getProgressPercentage = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Projects</Text>
        <TouchableOpacity onPress={() => router.push('/add-project')}>
          <Plus size={28} color="#5f33e1" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{projects.length}</Text>
          <Text style={styles.statLabel}>Total Projects</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {projects.reduce((sum, project) => sum + project.completedTasks, 0)}
          </Text>
          <Text style={styles.statLabel}>Completed Tasks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {projects.reduce((sum, project) => sum + project.taskCount, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Tasks</Text>
        </View>
      </View>

      {/* Projects Grid */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.projectsContainer}>
        <View style={styles.projectsGrid}>
          {projects.map((project) => (
            <TouchableOpacity key={project.id} style={styles.projectCard}>
              <LinearGradient
                colors={[project.color, `${project.color}CC`]}
                style={styles.projectGradient}
              >
                <View style={styles.projectHeader}>
                  <Folder size={24} color="white" />
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                </View>

                <View style={styles.projectFooter}>
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskCount}>
                      {project.completedTasks}/{project.taskCount} tasks
                    </Text>
                  </View>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${getProgressPercentage(
                              project.completedTasks,
                              project.taskCount
                            )}%`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {Math.round(getProgressPercentage(project.completedTasks, project.taskCount))}%
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Project Card */}
        <TouchableOpacity
          style={styles.addProjectCard}
          onPress={() => router.push('/add-project')}
        >
          <View style={styles.addProjectContent}>
            <View style={styles.addIcon}>
              <Plus size={32} color="#5f33e1" />
            </View>
            <Text style={styles.addProjectText}>Create New Project</Text>
            <Text style={styles.addProjectSubtext}>
              Start organizing your tasks with a new project
            </Text>
          </View>
        </TouchableOpacity>
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
    height: 180,
    justifyContent: 'space-between',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 4,
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
    gap: 8,
  },
  taskInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskCount: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
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
});