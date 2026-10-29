import { Controller, Get, Post, Body } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AIPlannerService } from '../ai-planner/ai-planner.service';
import { prisma } from '../../database/prisma';

@Controller('assessment')
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
    private readonly aiPlannerService: AIPlannerService,
  ) {}

  @Get('questions')
  getQuestions() {
    return this.assessmentService.getDiagnosticQuestions();
  }

  @Post('submit')
  async submitAssessment(
    @Body() body: { studentId: string; answers: Record<string, string> },
  ) {
    const gradeResult = await this.assessmentService.gradeAssessment(body);
    const student = await prisma.user.findUnique({
      where: { id: body.studentId },
      select: { fullName: true, gradeLevel: true, avatarMascot: true },
    });

    const learningPlan = await this.aiPlannerService.generateLearningPlan(
      body.studentId,
      gradeResult.id,
      gradeResult.proficiencyLevel,
      gradeResult.score,
      gradeResult.review,
      student || undefined,
    );

    return {
      gradeResult,
      learningPlan,
    };
  }
}
