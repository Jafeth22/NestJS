import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      id: 1,
      email: 'jon@example.com',
      encodedPassword: '$2a$10$jvexIEqP.mI4TfQo6eZyWe7rghPgWm9SzSrNvc1hZbijjP74qzAtu'
    },
    {
      id: 2,
      email: 'admin@example.com',
      encodedPassword: '$2a$10$oMEaBQpS9NAVjOmiv.w/3uRmyEQdgnm1IRie0XBY3.UV0goypHKJu'
    }
  ];

  async findOne(email: string): Promise<UserDto | undefined> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
