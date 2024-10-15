import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({ where: { username } });
    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const { password: pass, ...result } = usuario; 
    return result;
  }

  async login(usuario: Usuario) {
    const payload = { username: usuario.username, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
