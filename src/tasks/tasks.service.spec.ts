import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { User } from "src/auth/user.entity";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser: User = {
  username: "daksh",
  id: "idonetwothree",
  password: "123",
  tasks: [],
};

const mockTask: Task = {
  id: "123",
  title: "NestJS",
  description: "Learn NestJS",
  status: TaskStatus.OPEN,
  user: mockUser,
};

describe("TasksService", () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    //initialize a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe("getTasks", () => {
    it("calls TasksRepository.getTasks and returns the result", async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();

      // @ts-ignore
      tasksRepository.getTasks.mockResolvedValue([]);
      const result = await tasksService.getTasks(null, mockUser);

      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe("getTasksById", () => {
    it("calls TasksRepository.findOne and returns the result", async () => {
      expect(tasksRepository.findOne).not.toHaveBeenCalled();

      // @ts-ignore
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const task = await tasksService.getTaskById("123", mockUser);

      expect(task).toEqual(mockTask);
      expect(tasksRepository.findOne).toHaveBeenCalled();
    });

    it("calls TasksRepository.findOne and handles errors, if any", async () => {
      expect(tasksRepository.findOne).not.toHaveBeenCalled();

      // @ts-ignore
      tasksRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById("123", mockUser)).rejects.toThrow(
        NotFoundException
      );
      expect(tasksRepository.findOne).toHaveBeenCalled();
    });
  });
});
