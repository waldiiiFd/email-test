import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { user } from "./entities/user.entity";

import { CreateUserDto, UpdateUserDto } from "./dto";


@UsePipes(new ValidationPipe())
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create_user(@Body() user: CreateUserDto) {
    return this.userService.create_user(user);
  }

  @Get()
  get_users(): Promise<user[]> {
    return this.userService.get_users();
  }

  @Get(":id")
  get_user(@Param("id") id: number): Promise<user> {
    return this.userService.get_user(id);
  }

  @Get("email/:email")
  findOneByEmail(@Param("email") email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Patch(":email")
  updateUser(
    @Param("email") email: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update_user(email, updateUserDto);
  }

  @Delete(":email")
  delete_user(@Param("email") email: string): Promise<void> {
    return this.userService.delete_user(email);
  }
}
