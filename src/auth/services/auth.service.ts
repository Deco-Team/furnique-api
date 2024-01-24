import { JwtService } from '@nestjs/jwt'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginReqDto } from '@auth/dto/login.dto'
import { CustomerRepository } from '@customer/repositories/customer.repository'
import { Errors } from '@common/contracts/error'
import { Customer } from '@customer/schemas/customer.schema'
import { UserSide, UserRole } from '@common/contracts/constant'
import * as bcrypt from 'bcrypt'
import { AccessTokenPayload } from '@auth/strategies/jwt-access.strategy'
import { RefreshTokenPayload } from '@auth/strategies/jwt-refresh.strategy'
import { TokenResDto } from '@auth/dto/token.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async login(loginReqDto: LoginReqDto, side: UserSide): Promise<TokenResDto> {
    let user: Customer | null
    let userRole: UserRole

    if (side === UserSide.CUSTOMER) {
      user = await this.customerRepository.findOne({
        conditions: {
          email: loginReqDto.email
        }
      })

      userRole = UserRole.CUSTOMER
    }

    if (!user) throw new BadRequestException(Errors.WRONG_EMAIL_OR_PASSWORD.message)

    const isPasswordMatch = await this.comparePassword(loginReqDto.password, user.password)

    if (!isPasswordMatch) throw new BadRequestException(Errors.WRONG_EMAIL_OR_PASSWORD.message)

    const accessTokenPayload: AccessTokenPayload = { name: user.firstName, sub: user._id, role: userRole }

    const refreshTokenPayload: RefreshTokenPayload = { sub: user._id, role: userRole }

    const tokens = this.generateTokens(accessTokenPayload, refreshTokenPayload)

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }
  }

  public async refreshAccessToken(id: string, side: UserSide): Promise<TokenResDto> {
    let tokens: TokenResDto

    if (side === UserSide.CUSTOMER) {
      const user = await this.customerRepository.findOne({ conditions: { _id: id } })

      if (!user) throw new UnauthorizedException()

      const accessTokenPayload: AccessTokenPayload = { name: user.firstName, sub: user._id, role: UserRole.CUSTOMER }

      const refreshTokenPayload: RefreshTokenPayload = { sub: user._id, role: UserRole.CUSTOMER }

      tokens = this.generateTokens(accessTokenPayload, refreshTokenPayload)
    }

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  private generateTokens(accessTokenPayload: AccessTokenPayload, refreshTokenPayload: RefreshTokenPayload) {
    return {
      accessToken: this.jwtService.sign(accessTokenPayload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION')
      }),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION')
      })
    }
  }
}