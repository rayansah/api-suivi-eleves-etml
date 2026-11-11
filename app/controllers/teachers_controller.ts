import Teacher from '#models/teacher'
import { teacherValidator } from '#validators/teacher'
import type { HttpContext } from '@adonisjs/core/http'

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const teachers = await Teacher.query()
      .orderBy('name')
      .orderBy('firstname')
      .orderBy('email')
      .exec()
    return response.ok(teachers)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name, firstname, email } = await request.validateUsing(teacherValidator)
    // Création d'un nouveau prof avec les données validées
    const teachers = await Teacher.create({ name, firstname, email })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de l'élève créé
    return response.created(teachers)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const teachers = await Teacher.findOrFail(params.id)
    if (!teachers) {
      return response.notFound({ message: 'Teacher not found' })
    }
    return response.ok(teachers)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    // Vérification de l'existence de l'élève
    const teachers = await Teacher.findOrFail(params.id)

    // Récupération et validation des données
    const data = await request.validateUsing(teacherValidator)

    // Mise à jour des données de l'élève
    teachers.merge(data)

    // Sauvegarde des modifications
    await teachers.save()

    // Retourne le JSON de l'élève mis à jour
    return response.ok(teachers)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const teachers = await Teacher.find(params.id)

    if (!teachers) {
      return response.notFound({ message: 'Student not found' })
    }

    await teachers.delete()

    return response.noContent()
  }
}
