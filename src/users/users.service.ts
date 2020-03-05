import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}
  
  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      }
    })

    if (!user) {
      return null
    }
    return user
    
  }

  public async createUser(email: string, password: string): Promise<User> {
    const encryptedPassword = await hash(password, 10)
    return this.usersRepository.save({
      email,
      password: encryptedPassword,
      roles: 'user'
    })
  }
}
