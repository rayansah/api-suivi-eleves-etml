import type { HttpContext } from '@adonisjs/core/http'
import ClassGroup from '#models/class_group'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const classGroup = await ClassGroup.query().orderBy('name').exec()
    return response.ok(classGroup)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name } = await request.validateUsing(classGroupValidator)
    // Création d'un nouveau prof avec les données validées
    const classGroup = await ClassGroup.create({ name })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de l'élève créé
    return response.created(classGroup)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)
    if (!classGroup) {
      return response.notFound({ message: 'ClassGroup not found' })
    }
    return response.ok(classGroup)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    // Vérification de l'existence de l'élève
    const classGroup = await ClassGroup.findOrFail(params.id)

    // Récupération et validation des données
    const data = await request.validateUsing(classGroupValidator)

    // Mise à jour des données de l'élève
    classGroup.merge(data)

    // Sauvegarde des modifications
    await classGroup.save()

    // Retourne le JSON de l'élève mis à jour
    return response.ok(classGroup)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.find(params.id)

    if (!classGroup) {
      return response.notFound({ message: 'ClassGroup not found' })
    }

    await classGroup.delete()

    return response.noContent()
  }
}
