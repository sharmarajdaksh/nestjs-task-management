import { User } from "../auth/user.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";
export declare class TasksController {
  private tasksService;
  private logger;
  constructor(tasksService: TasksService);
  getTasks(filterDto: GetTasksFilterDto, user: any): Promise<Task[]>;
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
  getTaskById(id: string, user: User): Promise<Task>;
  deleteTaskById(id: string, user: User): void;
  updateTaskStatusById(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User
  ): Promise<Task>;
}
