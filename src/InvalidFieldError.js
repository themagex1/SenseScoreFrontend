export default class InvalidFieldError extends Error {
  constructor (desc) {super()
  this.description = desc}
}
