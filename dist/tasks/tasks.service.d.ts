import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TasksRepository } from "./tasks.repository";
import { Task } from "./task.entity";
import { User } from "../auth/user.entity";
export declare class TasksService {
  private tasksRepository;
  constructor(tasksRepository: TasksRepository);
  getTaskById(id: string, user: User): Promise<Task>;
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
  deleteTaskById(id: string, user: User): Promise<void>;
  updateTaskStatusById(
    id: string,
    status: TaskStatus,
    user: User
  ): Promise<Task>;
  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
}
