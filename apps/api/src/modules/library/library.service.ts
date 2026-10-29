import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../database/prisma';
import { Prisma } from '@prisma/client';
import { LibraryItem, CreateLibraryItemDto } from '@kid-elearning/types';

@Injectable()
export class LibraryService {
  private formatItem(item: any): LibraryItem {
    const rawContent = item.quizContent || {};
    return {
      id: item.id,
      authorId: item.authorId,
      authorName: item.author?.fullName || 'Người dùng',
      authorRole: item.author?.role || 'STUDENT',
      title: item.title,
      subject: item.subject,
      visibility: item.visibility,
      itemType: (item.itemType as any) || 'EXERCISE',
      questionsCount: Array.isArray(rawContent.questions)
        ? rawContent.questions.length
        : typeof rawContent.questionsCount === 'number'
          ? rawContent.questionsCount
          : 1,
      content: rawContent,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  async getUserLibrary(userId: string): Promise<LibraryItem[]> {
    const items = await prisma.libraryItem.findMany({
      where: { authorId: userId },
      include: {
        author: { select: { fullName: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((i) => this.formatItem(i));
  }

  async getPublicLibrary(): Promise<LibraryItem[]> {
    const items = await prisma.libraryItem.findMany({
      where: { visibility: 'PUBLIC' },
      include: {
        author: { select: { fullName: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((i) => this.formatItem(i));
  }

  async createItem(
    userId: string,
    dto: CreateLibraryItemDto,
  ): Promise<LibraryItem> {
    const created = await prisma.libraryItem.create({
      data: {
        authorId: userId,
        title: dto.title.trim(),
        subject: dto.subject,
        visibility: dto.visibility || 'PRIVATE',
        itemType: dto.itemType || 'EXERCISE',
        quizContent: dto.content as unknown as Prisma.InputJsonValue,
      },
      include: {
        author: { select: { fullName: true, role: true } },
      },
    });

    return this.formatItem(created);
  }

  async toggleVisibility(itemId: string, userId: string): Promise<LibraryItem> {
    const item = await prisma.libraryItem.findUnique({
      where: { id: itemId },
    });

    if (!item || item.authorId !== userId) {
      throw new NotFoundException('Không tìm thấy bài tập hoặc bạn không có quyền sửa!');
    }

    const updated = await prisma.libraryItem.update({
      where: { id: itemId },
      data: {
        visibility: item.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC',
      },
      include: {
        author: { select: { fullName: true, role: true } },
      },
    });

    return this.formatItem(updated);
  }
}
