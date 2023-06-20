import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TaskReposity } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getAllTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Jafeth',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskReposity, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TaskReposity);
  });

  describe('getAllTasks', () => {
    it('calls TasksRepository.getAllTasks and returns the result', async () => {
      // mockResolvedValue = it is used because it is returning a Promise
      // This line is executing the call to -taskReposity.getAllTasks-
      tasksRepository.getAllTasks.mockResolvedValue('someValue');
      // This line is executing the call to -tasksService.getAllTasks-
      const result = await tasksService.getAllTasks(null, mockUser);
      expect(tasksRepository.getAllTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: TaskStatus.OPEN,
      };

      // This line is executing to simulate the call to repository
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
