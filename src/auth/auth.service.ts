import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as seedrandom from 'seedrandom';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: any): Promise<any> {
    const user = await this.usersService.register(data);
    return user;
  }

  async updatePassword(data: {
    code: string;
    newPassword: string;
    email: string;
  }): Promise<any> {
    return this.usersService.updatePassword(
      data.code,
      data.newPassword,
      data.email,
    );
  }

  async sendCode(email: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User with that email not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const prng = new seedrandom();
    const code = prng().toString().substring(3, 9);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.usersService.updateUserResetCode(user._id, {
      code,
      created_timestamp: Date.now(),
      expire_timestamp: Date.now() + 30 * 60 * 1000,
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Your recovery code',
      text: code,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
