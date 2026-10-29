import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryItemDto } from '@kid-elearning/types';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('public')
  async getPublicLibrary() {
    return this.libraryService.getPublicLibrary();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-items')
  async getMyLibrary(@CurrentUser('id') userId: string) {
    return this.libraryService.getUserLibrary(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getUserLibrary(@Param('userId') userId: string) {
    return this.libraryService.getUserLibrary(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createItem(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateLibraryItemDto,
  ) {
    return this.libraryService.createItem(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-visibility')
  async toggleVisibility(
    @Param('id') itemId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.libraryService.toggleVisibility(itemId, userId);
  }
}
