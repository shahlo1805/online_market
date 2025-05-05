import { Injectable, InternalServerErrorException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { IUser } from './interface';
import { PostgresService } from 'src/database';
import { userTableModel } from './model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
      try {
        await this.pg.query(userTableModel);
        console.log('User table yaratildi');
      } catch (error) {
        console.log('User table yaratishda xatolik');
      }
    }

  async register(user: IUser) { 
    try {
      
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const result = await this.pg.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, email',
      [user.username, user.email, hashedPassword],
    );
    
    return { message: 'User registered', data: result[0] };
    } catch (error) {
      console.error("Registerda xatolik", error);
      throw new InternalServerErrorException('Userni ro‘yxatdan o‘tkazishda xatolik yuz berdi');
      
    }
  }

  async login(email: string, password: string) {
    const result = await this.pg.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { message: 'Login successful', user };
  }

  async getAllUsers() {
    const result = await this.pg.query('SELECT id, username, email FROM users');
    return { count: result?.length, data: result };
  }

  async getOneUser(id: number) {
    const result = await this.pg.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
    return result[0];
  }

  async updateUser(id: number, update: Partial<IUser>) {
    const { username, email, password } = update;
    const hashed = password ? await bcrypt.hash(password, 10) : null;

    const result = await this.pg.query(
      `UPDATE users SET 
        username = COALESCE($1, username),
        email = COALESCE($2, email),
        password = COALESCE($3, password)
      WHERE id = $4 RETURNING id, username, email`,
      [username, email, hashed, id],
    );

    return { message: 'User updated', data: result[0] };
  }

  async deleteUser(id: number) {
    await this.pg.query('DELETE FROM users WHERE id = $1', [id]);
    return { message: 'User deleted' };
  }
}