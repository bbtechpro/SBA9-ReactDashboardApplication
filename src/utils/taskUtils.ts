import type { Task } from '../types/index';

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortField = 'priority' | 'dueDate' | 'name';
export type SortDirection = 'asc' | 'desc';

export interface TaskFilters {
  status?: FilterStatus;
  priority?: Task['priority'] | 'all';
  searchTerm?: string;
}

export interface SortConfig {
  field: SortField;
  direction?: SortDirection;
}

export interface TaskValidationInput {
  name: string;
  description: string;
  dueDate: string;
}

export interface TaskValidationErrors {
  name?: string;
  description?: string;
  dueDate?: string;
}

const PRIORITY_RANK: Record<Task['priority'], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function filterTasks(tasks: Task[], filters: TaskFilters = {}): Task[] {
  const {
    status = 'all',
    priority = 'all',
    searchTerm = '',
  } = filters;

  const normalizedSearch = searchTerm.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus =
      status === 'all'
        ? true
        : status === 'active'
          ? !task.isCompleted
          : task.isCompleted;

    const matchesPriority = priority === 'all' ? true : task.priority === priority;

    const matchesSearch =
      normalizedSearch.length === 0
        ? true
        : task.name.toLowerCase().includes(normalizedSearch) ||
          task.description.toLowerCase().includes(normalizedSearch);

    return matchesStatus && matchesPriority && matchesSearch;
  });
}

export function sortTasks(tasks: Task[], config: SortConfig): Task[] {
  const { field, direction = 'asc' } = config;
  const order = direction === 'asc' ? 1 : -1;

  return [...tasks].sort((a, b) => {
    if (field === 'priority') {
      return (PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]) * order;
    }

    if (field === 'dueDate') {
      const aTime = new Date(a.dueDate).getTime();
      const bTime = new Date(b.dueDate).getTime();
      return (aTime - bTime) * order;
    }

    return a.name.localeCompare(b.name) * order;
  });
}

export function sortTasksByPriority(tasks: Task[], direction: SortDirection = 'asc'): Task[] {
  return sortTasks(tasks, { field: 'priority', direction });
}

export function sortTasksByDueDate(tasks: Task[], direction: SortDirection = 'asc'): Task[] {
  return sortTasks(tasks, { field: 'dueDate', direction });
}

export function validateTaskName(name: string): string | undefined {
  if (!name.trim()) return 'Task name is required.';
  if (name.trim().length < 3) return 'Task name must be at least 3 characters.';
  return undefined;
}

export function validateTaskDescription(description: string): string | undefined {
  if (!description.trim()) return 'Description is required.';
  if (description.trim().length < 10) return 'Description must be at least 10 characters.';
  return undefined;
}

export function validateDueDate(dueDate: string): string | undefined {
  if (!dueDate.trim()) return 'Due date is required.';

  const parsedDate = new Date(dueDate);
  if (Number.isNaN(parsedDate.getTime())) return 'Due date must be a valid date.';

  return undefined;
}

export function validateTaskInput(values: TaskValidationInput): TaskValidationErrors {
  const errors: TaskValidationErrors = {};

  const nameError = validateTaskName(values.name);
  const descriptionError = validateTaskDescription(values.description);
  const dueDateError = validateDueDate(values.dueDate);

  if (nameError) errors.name = nameError;
  if (descriptionError) errors.description = descriptionError;
  if (dueDateError) errors.dueDate = dueDateError;

  return errors;
}

export function formatDate(dateString: string, locale = 'en-US'): string {
  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parsedDate);
}

export function formatDateWithWeekday(dateString: string, locale = 'en-US'): string {
  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parsedDate);
}

export function isOverdue(dateString: string): boolean {
  const dueDate = new Date(dateString);
  if (Number.isNaN(dueDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  dueDate.setHours(0, 0, 0, 0);
  return dueDate.getTime() < today.getTime();
}
