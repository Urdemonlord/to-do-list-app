import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Link, router, useFocusEffect } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { TaskStorage, Task } from '../../utils/storage';
import { useTheme } from '../../contexts/ThemeContext';

export default function TasksScreen() {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | 'Sedang Berlangsung' | 'Selesai'>('Semua');
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    const storedTasks = await TaskStorage.getTasks();
    setTasks(storedTasks);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  const filters = ['Semua', 'Sedang Berlangsung', 'Selesai'] as const;

  // Generate week days dynamically based on current date
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    return date.getDate();
  });

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
  };

  const handleTaskPress = (taskId: string) => {
    router.push(`/task-detail?id=${taskId}` as any);
  };

  const handleAddTask = () => {
    router.push('/add-task' as any);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[styles.taskCard, { backgroundColor: theme.surface }]}
      onPress={() => handleTaskPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskLeft}>
          <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(item.priority) }]} />
          <View style={styles.taskInfo}>
            <Text style={[styles.taskTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.taskCategory, { color: theme.textSecondary }]}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.taskRight}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.taskFooter}>
        <Text style={[styles.dueDate, { color: theme.textSecondary }]}>{new Date(item.dueDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        <Text style={[styles.priority, { color: theme.textSecondary }]}>Prioritas {item.priority}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Daftar Tugas</Text>
        <Link href="/add-task" asChild>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.primary }]}>
            <Text style={styles.addButtonText}>+ Tambah Tugas</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Calendar Strip */}
      <View style={styles.calendarContainer}>
        <Text style={[styles.calendarTitle, { color: theme.text }]}>{new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {weekDays.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dateItem,
                { backgroundColor: theme.surface },
                selectedDate === day && { backgroundColor: theme.primary },
              ]}
              onPress={() => setSelectedDate(day)}
            >
              <Text
                style={[
                  styles.dateText,
                  { color: theme.textSecondary },
                  selectedDate === day && { color: theme.primaryText },
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
              { backgroundColor: theme.surface },
              selectedFilter === filter && { backgroundColor: theme.primary },
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                { color: theme.textSecondary },
                selectedFilter === filter && { color: theme.primaryText },
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
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Tidak ada tugas ditemukan</Text>
            <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>Tambahkan tugas baru untuk memulai</Text>
          </View>
        )}
      />
      {/* Add Task Floating Button */}
      <TouchableOpacity
        style={[styles.floatingAddButton, { backgroundColor: theme.primary }]}
        onPress={handleAddTask}
        activeOpacity={0.8}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  addButton: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  calendarContainer: {
    marginBottom: 24,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
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
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  tasksList: {
    paddingBottom: 100,
  },
  taskCard: {
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
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  taskCategory: {
    fontSize: 12,
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
    fontFamily: 'Inter-Regular',
  },
  priority: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
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
  floatingAddButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
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
});