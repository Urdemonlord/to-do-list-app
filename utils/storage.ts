import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Semua' | 'Sedang Berlangsung' | 'Selesai';
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  color: string;
  taskCount: number;
  completedTasks: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  darkMode: boolean;
  notifications: boolean;
  language: string;
}

const KEYS = {
  TASKS: '@tasks',
  PROJECTS: '@projects',
  SETTINGS: '@settings',
} as const;

// Task Management
export const TaskStorage = {
  async getTasks(): Promise<Task[]> {
    try {
      const tasks = await AsyncStorage.getItem(KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  },

  async addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const tasks = await this.getTasks();
    tasks.push(newTask);
    await this.saveTasks(tasks);
    return newTask;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      await this.saveTasks(tasks);
    }
  },

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    await this.saveTasks(filteredTasks);
  },
};

// Project Management
export const ProjectStorage = {
  async getProjects(): Promise<Project[]> {
    try {
      const projects = await AsyncStorage.getItem(KEYS.PROJECTS);
      return projects ? JSON.parse(projects) : [
        {
          id: '1',
          title: 'Proyek Kantor',
          description: 'Tugas-tugas pekerjaan kantor',
          type: 'work',
          color: '#5f33e1',
          taskCount: 5,
          completedTasks: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Proyek Pribadi',
          description: 'Aktivitas personal dan hobi',
          type: 'personal',
          color: '#ff6b6b',
          taskCount: 3,
          completedTasks: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Belajar Harian',
          description: 'Kegiatan pembelajaran dan pengembangan diri',
          type: 'education',
          color: '#4ecdc4',
          taskCount: 2,
          completedTasks: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    } catch (error) {
      console.error('Error getting projects:', error);
      return [];
    }
  },

  async saveProjects(projects: Project[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  },

  async addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const projects = await this.getProjects();
    projects.push(newProject);
    await this.saveProjects(projects);
    return newProject;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<void> {
    const projects = await this.getProjects();
    const projectIndex = projects.findIndex(project => project.id === id);
    
    if (projectIndex !== -1) {
      projects[projectIndex] = {
        ...projects[projectIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      await this.saveProjects(projects);
    }
  },

  async deleteProject(id: string): Promise<void> {
    const projects = await this.getProjects();
    const filteredProjects = projects.filter(project => project.id !== id);
    await this.saveProjects(filteredProjects);
  },
};

// Settings Management
export const SettingsStorage = {
  async getSettings(): Promise<UserSettings> {
    try {
      const settings = await AsyncStorage.getItem(KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        darkMode: false,
        notifications: true,
        language: 'id',
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        darkMode: false,
        notifications: true,
        language: 'id',
      };
    }
  },

  async saveSettings(settings: UserSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  async updateSetting<T extends keyof UserSettings>(
    key: T,
    value: UserSettings[T]
  ): Promise<void> {
    const settings = await this.getSettings();
    settings[key] = value;
    await this.saveSettings(settings);
  },
};
