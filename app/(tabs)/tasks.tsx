import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Search, Plus, Filter } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  category: string;
  status: 'Semua' | 'Sedang Berlangsung' | 'Selesai';
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  dueDate: string;
}

export default function TasksScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | 'Sedang Berlangsung' | 'Selesai'>('Semua');
  const [selectedDate, setSelectedDate] = useState(25);

  const filters = ['Semua', 'Sedang Berlangsung', 'Selesai'] as const;
  const weekDays = [21, 22, 23, 24, 25, 26, 27];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Analisis Kompetitif',
      category: 'Sprint Desain',
      status: 'Sedang Berlangsung',
      priority: 'Tinggi',
      dueDate: 'Hari ini',
    },
    {
      id: '2',
      title: 'Wireframe UX',
      category: 'Aplikasi Belanja',
      status: 'Selesai',
      priority: 'Sedang',
      dueDate: 'Kemarin',
    },
    {
      id: '3',
      title: 'Riset Pengguna',
      category: 'Aplikasi Mobile',
      status: 'Sedang Berlangsung',
      priority: 'Tinggi',
      dueDate: 'Hari ini',
    },
    {
      id: '4',
      title: 'Sistem Desain',
      category: 'Aplikasi Web',
      status: 'Selesai',
      priority: 'Rendah',
      dueDate: '2 hari lalu',
    },
  ];

  const filteredTasks = selectedFilter === 'Semua' 
    ? tasks 
    : tasks.filter(task => task.status === selectedFilter);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai':
        return '#4ecdc4';
      case 'Sedang Berlangsung':
        return '#5f33e1';
      default:
        return '#ccc';
    }
  };  const handleTaskPress = (taskId: string) => {
    // Navigate to task detail with task ID
    router.push(`/task-detail?id=${taskId}` as any);
  };
  const handleAddTask = () => {
    router.push('/add-task' as any);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity 
      style={styles.taskCard}
      onPress={() => handleTaskPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskLeft}>
          <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(item.priority) }]} />
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskCategory}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.taskRight}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.taskFooter}>
        <Text style={styles.dueDate}>{item.dueDate}</Text>
        <Text style={styles.priority}>Prioritas {item.priority}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tugas Hari Ini</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Search size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Filter size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar Strip */}
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>Januari 2024</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {weekDays.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dateItem,
                selectedDate === day && styles.selectedDateItem,
              ]}
              onPress={() => setSelectedDate(day)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === day && styles.selectedDateText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.activeFilterTab,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tasks List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tasksList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Tidak ada tugas ditemukan</Text>
            <Text style={styles.emptySubtext}>Tambahkan tugas baru untuk memulai</Text>
          </View>
        )}
      />

      {/* Add Task Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddTask}
        activeOpacity={0.8}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },  header: {
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
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  calendarContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24252c',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  dateItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'white',
  },
  selectedDateItem: {
    backgroundColor: '#5f33e1',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    fontFamily: 'Inter-SemiBold',
  },
  selectedDateText: {
    color: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  activeFilterTab: {
    backgroundColor: '#5f33e1',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    fontFamily: 'Inter-SemiBold',
  },
  activeFilterText: {
    color: 'white',
  },
  tasksList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
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
  taskRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  priority: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5f33e1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});