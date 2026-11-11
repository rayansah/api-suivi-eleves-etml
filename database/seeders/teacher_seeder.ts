import { TeacherFactory } from '#database/factories/teacher_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Crée 10 professeurs
    await TeacherFactory.createMany(10)
  }
}
