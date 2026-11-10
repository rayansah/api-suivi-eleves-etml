import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'
import { studentValidator } from '#validators/student'

 
export default class StudentsController {
  /**
   * Display a list of resource
   */
 
  async index({response}: HttpContext) {
    const students = Student.query().orderBy('name').orderBy('firstname')
    return response.ok(students)
  }
 
  /**
   * Ajouter un élève
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name, firstname } = await request.validateUsing(studentValidator)
    // Création d'un nouvel élève avec les données validées
    const student = await Student.create({ name, firstname })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de l'élève créé
    return response.created(student)
  }
 
  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    if (!student){
      return response.notFound({message: 'Student not found'})
    }
    return response.ok(student)
  }
 
  /**
   * Mettre à jour un élève
   *
   * Cette méthode est utilisée pour mettre à jour les informations d'un élève que ce soit :
   * - pour une modification complète (PUT)
   * - ou une modification partielle (PATCH)
   */
  async update({ params, request, response}: HttpContext) {
    // Récupération des données
    const data = request.only(['name', 'firstname'])
    // Vérification de l'existence de l'élève
    const student = await Student.findOrFail(params.id)
    if(!student){
      return response.notFound({message: 'Student not found'})
    }
    // Mise à jour des données de l'élève
    student.merge(data)
    // Sauvegarde des modifications
    await student.save()
    // Retour le json de l'élève mis à jour
    return response.ok(student)
  }
 
  /**
   * Supprimer un élève
   */
  async destroy({ params, response }: HttpContext) {
    const student = await Student.find(params.id)

    if (!student) {
      return response.notFound({ message: 'Student not found' })
    }

    await student.delete()

    return response.noContent()
  }
  
}